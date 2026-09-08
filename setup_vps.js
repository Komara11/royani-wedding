const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();

const envLocalMain = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const envLocalAdmin = fs.readFileSync(path.join(__dirname, '../royani-admin/.env.local'), 'utf8');

const commands = [
  'echo "Starting VPS Setup..."',
  'apt-get update -y',
  'curl -fsSL https://deb.nodesource.com/setup_20.x | bash -',
  'apt-get install -y nodejs git nginx certbot python3-certbot-nginx',
  'npm install -g pm2',
  
  'mkdir -p /var/www',
  'cd /var/www && rm -rf royani-wedding && git clone https://github.com/Komara11/royani-wedding.git',
  'cd /var/www && rm -rf royani-admin && git clone https://github.com/Komara11/admin-royani-wedding.git royani-admin',
  
  // Create .env files
  `cat << 'EOF' > /var/www/royani-wedding/.env.local\n${envLocalMain}\nEOF`,
  `cat << 'EOF' > /var/www/royani-admin/.env.local\n${envLocalAdmin}\nEOF`,

  // Build and Start Main App
  'cd /var/www/royani-wedding && npm install && npm run build',
  'pm2 delete royani-wedding || true',
  'cd /var/www/royani-wedding && pm2 start npm --name "royani-wedding" -- run start -- -p 3000',
  
  // Build and Start Admin App
  'cd /var/www/royani-admin && npm install && npm run build',
  'pm2 delete royani-admin || true',
  'cd /var/www/royani-admin && pm2 start npm --name "royani-admin" -- run start -- -p 3001',
  
  'pm2 save',
  'pm2 startup | tail -n 1 | bash',

  // Configure Nginx for Main Site
  `cat << 'EOF' > /etc/nginx/sites-available/royaniwedding.com
server {
    listen 80;
    server_name royaniwedding.com www.royaniwedding.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
EOF`,

  // Configure Nginx for Admin Site
  `cat << 'EOF' > /etc/nginx/sites-available/admin.royaniwedding.com
server {
    listen 80;
    server_name admin.royaniwedding.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
EOF`,

  'ln -sf /etc/nginx/sites-available/royaniwedding.com /etc/nginx/sites-enabled/',
  'ln -sf /etc/nginx/sites-available/admin.royaniwedding.com /etc/nginx/sites-enabled/',
  'rm -f /etc/nginx/sites-enabled/default',
  'nginx -t && systemctl restart nginx',
  
  'echo "VPS Setup Completed Successfully!"'
];

conn.on('ready', () => {
  console.log('Client :: ready');
  
  // Run commands sequentially
  let i = 0;
  function runNext() {
    if (i >= commands.length) {
      console.log('All commands executed.');
      conn.end();
      return;
    }
    
    const cmd = commands[i];
    console.log(`[Running] ${cmd.substring(0, 100)}...`);
    conn.exec(cmd, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log(`[Completed] Exit code: ${code}`);
        i++;
        runNext();
      }).on('data', (data) => {
        process.stdout.write(data);
      }).stderr.on('data', (data) => {
        process.stderr.write(data);
      });
    });
  }
  
  runNext();
}).connect({
  host: '103.169.206.236',
  port: 22,
  username: 'root',
  password: 'Royaniwedding1#'
});

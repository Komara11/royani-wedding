const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  "echo 'server { listen 80; server_name royaniwedding.com www.royaniwedding.com; location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; } listen 443 ssl; ssl_certificate /etc/letsencrypt/live/royaniwedding.com/fullchain.pem; ssl_certificate_key /etc/letsencrypt/live/royaniwedding.com/privkey.pem; include /etc/letsencrypt/options-ssl-nginx.conf; ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; } server { if ($host = www.royaniwedding.com) { return 301 https://$host$request_uri; } if ($host = royaniwedding.com) { return 301 https://$host$request_uri; } listen 80; server_name royaniwedding.com www.royaniwedding.com; return 404; }' > /etc/nginx/sites-available/royaniwedding.com",
  
  "echo 'server { listen 80; server_name admin.royaniwedding.com; location / { proxy_pass http://127.0.0.1:3001; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; } listen 443 ssl; ssl_certificate /etc/letsencrypt/live/admin.royaniwedding.com/fullchain.pem; ssl_certificate_key /etc/letsencrypt/live/admin.royaniwedding.com/privkey.pem; include /etc/letsencrypt/options-ssl-nginx.conf; ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; } server { if ($host = admin.royaniwedding.com) { return 301 https://$host$request_uri; } listen 80; server_name admin.royaniwedding.com; return 404; }' > /etc/nginx/sites-available/admin.royaniwedding.com",
  "systemctl restart nginx"
];

conn.on('ready', () => {
  let i = 0;
  function runNext() {
    if (i >= commands.length) {
      console.log('Nginx config updated.');
      conn.end();
      return;
    }
    const cmd = commands[i];
    conn.exec(cmd, (err, stream) => {
      if (err) throw err;
      stream.on('close', () => {
        i++;
        runNext();
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

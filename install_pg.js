const { Client } = require('ssh2');

const conn = new Client();

const script = `
cd /var/www/royani-wedding
npm install prisma @prisma/client
npx prisma db push

cd /var/www/royani-admin
npm install prisma @prisma/client
npx prisma db push
`;

conn.on('ready', () => {
  conn.exec(script, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Database pushed successfully.');
      conn.end();
    });
    stream.on('data', (d) => process.stdout.write(d));
    stream.stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({
  host: '103.169.206.236',
  port: 22,
  username: 'root',
  password: 'Royaniwedding1#'
});

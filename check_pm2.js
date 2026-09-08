const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  conn.exec('cat /var/www/royani-wedding/src/app/layout.tsx', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
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

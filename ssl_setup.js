const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  'certbot --nginx -d royaniwedding.com -d www.royaniwedding.com --non-interactive --agree-tos -m rahesakomara12@gmail.com --redirect',
  'certbot --nginx -d admin.royaniwedding.com --non-interactive --agree-tos -m rahesakomara12@gmail.com --redirect'
];

conn.on('ready', () => {
  console.log('Client :: ready');
  
  let i = 0;
  function runNext() {
    if (i >= commands.length) {
      console.log('SSL Setup completed.');
      conn.end();
      return;
    }
    const cmd = commands[i];
    console.log(`[Running] ${cmd}...`);
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

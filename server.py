from http.server import HTTPServer, SimpleHTTPRequestHandler
import os, sys

os.chdir('/root/saham-screener/royani-wedding')

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/root/saham-screener/royani-wedding', **kwargs)

port = 8001
server = HTTPServer(('0.0.0.0', port), Handler)
print(f'🌐 Royani Wedding server: http://100.98.220.55:{port}')
sys.stdout.flush()
server.serve_forever()

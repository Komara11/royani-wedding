import re

with open("../royani-admin/src/app/api/upload/route.ts", "r") as f:
    content = f.read()

old_dir_logic = """    // Choose upload directory (VPS or local fallback)
    const vpsDir = "/var/www/uploads";
    let baseDir = vpsDir;
    
    try {
      await mkdir(vpsDir, { recursive: true });
    } catch (err) {
      baseDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(baseDir, { recursive: true });
    }"""

new_dir_logic = """    // Choose upload directory directly in the public website folder
    const vpsDir = "/var/www/royani-wedding/public/uploads";
    let baseDir = vpsDir;
    
    try {
      await mkdir(vpsDir, { recursive: true });
    } catch (err) {
      baseDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(baseDir, { recursive: true });
    }"""

content = content.replace(old_dir_logic, new_dir_logic)

with open("../royani-admin/src/app/api/upload/route.ts", "w") as f:
    f.write(content)

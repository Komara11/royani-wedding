import re

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "r") as f:
    content = f.read()

# Replace the type select with an input + datalist
old_select = """<div className="form-group">
                  <label>Tipe</label>
                  <select value={editItem.type} onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}>
                    <option value="lengkap">Lengkap</option><option value="akad">Akad</option>
                  </select>
                </div>"""

new_select = """<div className="form-group">
                  <label>Kategori (Tipe)</label>
                  <input 
                    list="kategori-list" 
                    value={editItem.type} 
                    onChange={(e) => setEditItem({ ...editItem, type: e.target.value })} 
                    placeholder="Contoh: akad, lengkap, custom..."
                  />
                  <datalist id="kategori-list">
                    {Array.from(new Set(items.map((i: any) => i.type?.trim() || 'Lainnya'))).map((cat: any) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>"""

content = content.replace(old_select, new_select)

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "w") as f:
    f.write(content)

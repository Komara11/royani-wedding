import re

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "r") as f:
    content = f.read()

# Add a state for new category
if "const [isNewCategory, setIsNewCategory] = useState(false);" not in content:
    content = content.replace("const [deleteId, setDeleteId] = useState<string | null>(null);", 
                              "const [deleteId, setDeleteId] = useState<string | null>(null);\n  const [isNewCategory, setIsNewCategory] = useState(false);")

# Also, reset isNewCategory when opening modal
if "setIsNewCategory(false);" not in content:
    content = content.replace("setEditItem({ ...emptyPkg, type: tab, sortOrder: filtered.length });\n    setModalOpen(true);",
                              "setEditItem({ ...emptyPkg, type: tab, sortOrder: filtered.length });\n    setIsNewCategory(false);\n    setModalOpen(true);")
    content = content.replace("setEditItem(pkg);\n    setModalOpen(true);",
                              "setEditItem(pkg);\n    setIsNewCategory(false);\n    setModalOpen(true);")

# Replace the input list="kategori-list" logic with a select + optional input
old_input_list = """<div className="form-group">
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

new_select_input = """<div className="form-group">
                  <label>Kategori Paket</label>
                  {!isNewCategory ? (
                    <select 
                      value={Array.from(new Set(items.map((i: any) => i.type?.trim() || 'Lainnya'))).includes(editItem.type) ? editItem.type : 'new'} 
                      onChange={(e) => {
                        if (e.target.value === 'new') {
                          setIsNewCategory(true);
                          setEditItem({ ...editItem, type: '' });
                        } else {
                          setEditItem({ ...editItem, type: e.target.value });
                        }
                      }}
                    >
                      {Array.from(new Set(items.map((i: any) => i.type?.trim() || 'Lainnya'))).map((cat: any) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="new">+ Tambah Kategori Baru...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={editItem.type} 
                        onChange={(e) => setEditItem({ ...editItem, type: e.target.value })} 
                        placeholder="Ketik kategori baru (contoh: lamaran)"
                        autoFocus
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        onClick={() => {
                          setIsNewCategory(false);
                          const existingCats = Array.from(new Set(items.map((i: any) => i.type?.trim() || 'Lainnya'))) as string[];
                          setEditItem({ ...editItem, type: existingCats.length > 0 ? existingCats[0] : 'lengkap' });
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>"""

content = content.replace(old_input_list, new_select_input)

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "w") as f:
    f.write(content)

import re

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "r") as f:
    content = f.read()

# Replace tabs logic
old_tabs = """<div className="tabs">
          <button className={`tab ${tab === "lengkap" ? "active" : ""}`} onClick={() => setTab("lengkap")}>Paket Lengkap</button>
          <button className={`tab ${tab === "akad" ? "active" : ""}`} onClick={() => setTab("akad")}>Paket Akad</button>
        </div>"""

new_tabs = """<div className="tabs" style={{ flexWrap: 'wrap' }}>
          {Array.from(new Set(items.map((i: any) => i.type?.trim() || 'Lainnya'))).map((cat: any) => (
            <button key={cat} className={`tab ${tab === cat ? "active" : ""}`} onClick={() => setTab(cat)} style={{ textTransform: 'capitalize' }}>
              Paket {cat}
            </button>
          ))}
          {/* Ensure there is at least one tab if items is empty */}
          {items.length === 0 && (
            <button className="tab active">Kategori Baru</button>
          )}
        </div>"""

content = content.replace(old_tabs, new_tabs)

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "w") as f:
    f.write(content)

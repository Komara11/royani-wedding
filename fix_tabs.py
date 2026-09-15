import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Add back the state
handle_pilih = """  const [formData, setFormData] = useState({ name: "", date: "", paket: "", message: "" });
  const [activePricingTab, setActivePricingTab] = useState<'akad'|'lengkap'>('akad');

  const handlePilihPaket = (pkgName: string) => {"""
content = content.replace('  const [formData, setFormData] = useState({ name: "", date: "", paket: "", message: "" });\n\n  const handlePilihPaket = (pkgName: string) => {', handle_pilih)

# 2. Fix the buttons
old_buttons = """              <button 
                onClick={() => { document.getElementById('paket-akad')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline active-tab"
                style={{ 
                  backgroundColor: 'var(--gold)',
                  color: '#000',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Akad
              </button>
              <button 
                onClick={() => { document.getElementById('paket-lengkap')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Lengkap
              </button>"""

new_buttons = """              <button 
                onClick={() => setActivePricingTab('akad')}
                className={`btn-outline ${activePricingTab === 'akad' ? 'active-tab' : ''}`}
                style={{ 
                  backgroundColor: activePricingTab === 'akad' ? 'var(--gold)' : 'transparent',
                  color: activePricingTab === 'akad' ? '#000' : 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Akad
              </button>
              <button 
                onClick={() => setActivePricingTab('lengkap')}
                className={`btn-outline ${activePricingTab === 'lengkap' ? 'active-tab' : ''}`}
                style={{ 
                  backgroundColor: activePricingTab === 'lengkap' ? 'var(--gold)' : 'transparent',
                  color: activePricingTab === 'lengkap' ? '#000' : 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Lengkap
              </button>"""

content = content.replace(old_buttons, new_buttons)

# 3. Add conditional rendering to the grids based on viewport/mobile hide or just completely.
# "ditampilan hp harusnya kalau saya ganti dari paket akad ke paket lengkap paket akad nya ke hide"
# Let's wrap the sections with a CSS class that hides them on mobile if not active, but shows them on desktop? 
# Or just use the React state directly to unmount them. I will use a CSS approach so it's only on mobile! Or just unmount them everywhere.
# The safest way is to use a CSS class `mobile-tab-content` that respects the state on mobile. Actually, standard tabs hide it everywhere. Let's hide it everywhere to avoid layout jumps on desktop too.

old_akad = '{activePkgs.filter((p: any) => p.type?.toLowerCase() === \'akad\').length > 0 && ('
new_akad = '{activePricingTab === \'akad\' && activePkgs.filter((p: any) => p.type?.toLowerCase() === \'akad\').length > 0 && ('

old_lengkap = '{activePkgs.filter((p: any) => p.type?.toLowerCase() === \'lengkap\').length > 0 && ('
new_lengkap = '{activePricingTab === \'lengkap\' && activePkgs.filter((p: any) => p.type?.toLowerCase() === \'lengkap\').length > 0 && ('

content = content.replace(old_akad, new_akad).replace(old_lengkap, new_lengkap)

with open("src/app/page.tsx", "w") as f:
    f.write(content)

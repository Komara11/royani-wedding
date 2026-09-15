import re

with open("src/components/SharedUI.tsx", "r") as f:
    content = f.read()

# Replace the state and useEffect in Navbar
old_navbar_start = r'export function Navbar\(\) \{\n  const \[navScrolled, setNavScrolled\] = useState\(false\);\n  const \[hamburgerActive, setHamburgerActive\] = useState\(false\);\n  const pathname = usePathname\(\);'
new_navbar_start = """export function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();"""

content = re.sub(old_navbar_start, new_navbar_start, content)

old_use_effect = r'  useEffect\(\(\) => \{\n    const handleScroll = \(\) => setNavScrolled\(window.scrollY > 60\);\n    window.addEventListener\("scroll", handleScroll\);\n    return \(\) => window.removeEventListener\("scroll", handleScroll\);\n  \}, \[\]\);'
new_use_effect = """  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
      
      if (pathname === "/") {
        const sections = ["kontak", "testimoni", "portfolio", "layanan", "tentang", "home"];
        let current = "";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              current = section;
              break;
            }
          }
        }
        setActiveSection(current);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);"""

content = re.sub(old_use_effect, new_use_effect, content)

old_get_active_class = r'  const getActiveClass = \(path: string\) => \{\n    if \(path === "/" && pathname === "/"\) return "active";\n    if \(path !== "/" && pathname\?.startsWith\(path\)\) return "active";\n    return "";\n  \};'
new_get_active_class = """  const getActiveClass = (path: string) => {
    if (pathname === "/") {
      if (path === "/" && (!activeSection || activeSection === "home")) return "active";
      if (path.startsWith("/#") && activeSection && path.includes(activeSection)) return "active";
      return "";
    }
    
    // Non-homepage matching
    if (path === "/" && pathname === "/") return "active";
    if (path !== "/" && !path.startsWith("/#") && pathname?.startsWith(path)) return "active";
    return "";
  };"""

content = re.sub(old_get_active_class, new_get_active_class, content)

with open("src/components/SharedUI.tsx", "w") as f:
    f.write(content)

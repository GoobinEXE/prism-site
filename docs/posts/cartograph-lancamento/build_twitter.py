import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parents[2]
BRAND = REPO / "public/assets/brand"
LOGO_LIGHT_SVG = pathlib.Path("/Users/marcelopessoa/CODES/SUPER PESQUISADOR 2000/public/logo-light.svg").read_text()
LOGO_DARK_SVG = (
    pathlib.Path("/Users/marcelopessoa/CODES/SUPER PESQUISADOR 2000/public/logo-dark.svg")
    .read_text()
    .replace("#F3F4F6", "#F2ECE1")
)
MONO_P_SRC = (BRAND / "prism-monogram-p.svg").read_text().split("?>", 1)[-1]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT_HTML = ROOT / "_html"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=block" rel="stylesheet">'
)
TAPE = '<span class="c1"></span><span class="c2"></span><span class="c3"></span><span class="c4"></span><span class="c5"></span>'


def mono_p(dark=False):
    svg = MONO_P_SRC
    if dark:
        svg = svg.replace("fill: #0D0F13", "fill: #F2ECE1")
    return svg


def lockup(dark=False):
    bar = "rgba(242,236,225,.4)" if dark else "rgba(74,81,94,.6)"
    word_col = "#F2ECE1" if dark else "#0D0F13"
    return (
        f'<div class="lockup"><div class="p">{mono_p(dark)}</div>'
        f'<div class="bar" style="background:{bar}"></div>'
        f'<div class="word" style="color:{word_col}">PRISM</div></div>'
    )


CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:900px;overflow:hidden}
body{font-family:'Geist',sans-serif;-webkit-font-smoothing:antialiased;position:relative;line-height:1.35}
.mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.12em;font-weight:600}
.tape{position:absolute;left:0;right:0;height:14px;display:flex;z-index:5}
.tape span{flex:1}
.tape.top{top:0}.tape.bottom{bottom:0}
.c1{background:#01ABE8}.c2{background:#AEB932}.c3{background:#F4E412}.c4{background:#E97635}.c5{background:#DA0082}
.rule{display:flex;width:200px;height:8px;margin-top:22px}
.rule span{flex:1}
.page{position:absolute;inset:0;padding:74px 88px 68px;display:flex;flex-direction:column;justify-content:space-between}
.main{display:grid;grid-template-columns:1.15fr 0.85fr;gap:64px;align-items:center;flex:1}
.kicker{font-size:20px}
.title{font-weight:800;text-transform:uppercase;line-height:1.02;letter-spacing:.04em;font-size:74px;margin-top:14px}
.body{font-size:30px;margin-top:24px;max-width:50ch;line-height:1.4}
.footer{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:16px}
.lockup{display:flex;align-items:center;gap:20px}
.lockup .p{height:44px;display:flex}
.lockup .p svg{height:44px;width:auto}
.lockup .bar{width:1px;height:44px}
.lockup .word{font-weight:700;font-size:30px;letter-spacing:.06em}
.url{font-size:20px}

.light{background:#F2ECE1;color:#0D0F13}
.light .kicker{color:#005F85}
.light .body{color:#1F232B}
.light .muted{color:#4A515E}
.light .card{background:#EAE3D6;border-radius:4px}
.light .card.elev{background:#F6F2EB}

.dark{background:#090A0C;color:#F2ECE1}
.dark .kicker{color:#6EC2E1}
.dark .body{color:#DADADA}
.dark .muted{color:#8F9397}
.dark .card{background:#141820;border-radius:4px}
.dark .card.elev{background:#1A1C1F}

.right-panel{display:flex;flex-direction:column;gap:22px}
.brand-row{display:flex;align-items:center;gap:24px;padding:24px 28px;position:relative;overflow:hidden}
.brand-row::before{content:"";position:absolute;inset:0 0 auto;height:6px;background:linear-gradient(90deg,#01ABE8 0 20%,#AEB932 20% 40%,#F4E412 40% 60%,#E97635 60% 80%,#DA0082 80% 100%)}
.app-ico{width:108px;height:108px;flex-shrink:0;display:flex}
.app-ico svg{width:108px;height:108px;display:block}
.brand-meta h2{font-size:36px;font-weight:800;letter-spacing:.03em;text-transform:uppercase}
.brand-meta p{font-size:21px;margin-top:4px}
.specs{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.spec{padding:20px 22px}
.spec .k{font-size:15px;display:block;margin-bottom:6px}
.light .spec .k{color:#005F85}
.dark .spec .k{color:#6EC2E1}
.spec .v{font-size:24px;font-weight:700;line-height:1.2}
.spec .s{font-size:17px;display:block;margin-top:4px;font-weight:400}

.sources-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:28px}
.src-card{padding:18px 20px;position:relative;overflow:hidden}
.src-card strong{display:block;font-size:23px;font-weight:700}
.src-card small{display:block;font-size:14px;margin-top:6px}

.link-stage{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.link-head{display:flex;align-items:center;gap:28px;margin-bottom:18px}
.link-logo{width:96px;height:96px;flex-shrink:0;display:flex}
.link-logo svg{width:96px;height:96px;display:block}
.url-box{margin-top:38px;display:flex;align-items:stretch;border-radius:4px;overflow:hidden;max-width:100%}
.light .url-box{background:#EAE3D6}
.dark .url-box{background:#141820}
.url-text{padding:26px 36px;font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:700;letter-spacing:.03em;display:flex;align-items:center}
.url-cta{background:#01ABE8;color:#0D0F13;padding:26px 36px;font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;display:flex;align-items:center;gap:12px}
.chips{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px}
.chip{padding:12px 20px;font-size:17px;border-radius:2px}
.light .chip{background:#EAE3D6;color:#1F232B}
.dark .chip{background:#1A1C1F;color:#DADADA}
"""


def card_doc(theme, inner):
    return (
        f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}'
        f"<style>{CSS}</style></head>"
        f'<body class="{theme}"><div class="tape top">{TAPE}</div><div class="tape bottom">{TAPE}</div>'
        f'<div class="page">{inner}</div></body></html>'
    )


def hero_card(dark=False):
    theme = "dark" if dark else "light"
    logo_svg = LOGO_DARK_SVG if dark else LOGO_LIGHT_SVG
    return card_doc(
        theme,
        f"""
<div class="main">
  <div>
    <div class="mono kicker">Cartograph · Lançamento Prism</div>
    <h1 class="title">15 bases científicas numa busca só</h1>
    <div class="rule">{TAPE}</div>
    <p class="body">Pesquisa simultânea em 15 APIs científicas abertas, catálogo com 111 plataformas, citações prontas e triagem PRISMA 2020.</p>
  </div>
  <div class="right-panel">
    <div class="card elev brand-row">
      <div class="app-ico">{logo_svg}</div>
      <div class="brand-meta">
        <h2>Cartograph</h2>
        <p class="muted mono" style="font-size:16px">Web · Gratuito · Sem cadastro</p>
      </div>
    </div>
    <div class="specs">
      <div class="card spec"><span class="mono k">Metabusca</span><div class="v">15 APIs abertas<span class="s muted">+ 111 fontes no catálogo</span></div></div>
      <div class="card spec"><span class="mono k">Exportação</span><div class="v">ABNT · APA · BibTeX<span class="s muted">+ Matriz CSV para Excel</span></div></div>
      <div class="card spec"><span class="mono k">Revisão</span><div class="v">PRISMA 2020<span class="s muted">Triagem + diagrama SVG</span></div></div>
      <div class="card spec"><span class="mono k">Acesso</span><div class="v">100% Web<span class="s muted">Direto no navegador</span></div></div>
    </div>
  </div>
</div>
<div class="footer">
  {lockup(dark)}
  <div class="mono url muted">cartographsearch.com</div>
</div>
""",
    )


def sources_card(dark=False):
    theme = "dark" if dark else "light"
    bases = [
        ("OpenAlex", "250M+ obras"),
        ("Semantic Scholar", "Grafos e citações"),
        ("PubMed", "MEDLINE / NIH"),
        ("Europe PMC", "Ciências da vida"),
        ("arXiv", "Preprints"),
        ("Crossref", "DOIs oficiais"),
        ("DOAJ", "Periódicos abertos"),
        ("Zenodo", "CERN · Datasets"),
        ("HAL", "CNRS França"),
        ("DataCite", "DOIs de dados"),
        ("INSPIRE-HEP", "Física · CERN"),
        ("Figshare", "Replicação"),
        ("GBIF", "Biodiversidade"),
        ("OSTI.GOV", "Energia · EUA"),
        ("NASA NTRS", "Aeroespacial"),
    ]
    cards = "".join(
        f'<div class="card src-card"><strong>{name}</strong><small class="mono muted">{sub}</small></div>'
        for name, sub in bases
    )
    return card_doc(
        theme,
        f"""
<div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:32px">
    <div>
      <div class="mono kicker">Cartograph · Cobertura Federada</div>
      <h1 class="title" style="font-size:58px">15 APIs abertas em paralelo</h1>
    </div>
    <div class="mono muted" style="font-size:17px;text-align:right;white-space:nowrap;flex-shrink:0;line-height:1.6">Deduplicação por DOI e título<br>Expansão bilíngue PT ↔ EN</div>
  </div>
  <div class="rule">{TAPE}</div>
  <div class="sources-grid">{cards}</div>
</div>
<div class="footer">
  {lockup(dark)}
  <div class="mono url muted">cartographsearch.com</div>
</div>
""",
    )


def link_card(dark=False):
    theme = "dark" if dark else "light"
    logo_svg = LOGO_DARK_SVG if dark else LOGO_LIGHT_SVG
    return card_doc(
        theme,
        f"""
<div class="link-stage">
  <div class="link-head">
    <div class="link-logo">{logo_svg}</div>
    <div>
      <div class="mono kicker">Cartograph · Acesso Direto</div>
      <h1 class="title" style="font-size:66px;margin-top:10px">Teste direto no navegador</h1>
    </div>
  </div>
  <div class="rule">{TAPE}</div>
  <div class="url-box">
    <div class="url-text">cartographsearch.com</div>
    <div class="url-cta">Abrir agora →</div>
  </div>
  <div class="chips">
    <span class="chip mono">Gratuito</span>
    <span class="chip mono">Sem cadastro</span>
    <span class="chip mono">15 bases científicas</span>
    <span class="chip mono">100% Web</span>
  </div>
</div>
<div class="footer">
  {lockup(dark)}
  <div class="mono url muted">cartographsearch.com</div>
</div>
""",
    )


def shoot(html, dst, w=1600, h=900):
    OUT_HTML.mkdir(parents=True, exist_ok=True)
    src = OUT_HTML / (dst.stem + ".html")
    src.write_text(html)
    subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--hide-scrollbars",
            "--disable-gpu",
            "--allow-file-access-from-files",
            f"--window-size={w},{h}",
            "--force-device-scale-factor=1",
            "--virtual-time-budget=8000",
            f"--screenshot={dst}",
            src.as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    print(dst.relative_to(ROOT))


if __name__ == "__main__":
    shoot(hero_card(dark=False), ROOT / "twitter-card-1-lancamento-light.png")
    shoot(hero_card(dark=True), ROOT / "twitter-card-1-lancamento-dark.png")
    shoot(sources_card(dark=False), ROOT / "twitter-card-2-fontes-light.png")
    shoot(sources_card(dark=True), ROOT / "twitter-card-2-fontes-dark.png")
    shoot(link_card(dark=False), ROOT / "twitter-card-3-link-light.png")
    shoot(link_card(dark=True), ROOT / "twitter-card-3-link-dark.png")

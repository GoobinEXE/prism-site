import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parents[3]
BRAND = REPO / "public/assets/brand"
ASSETS = REPO / "docs/posts/semana-2026-11-16/assets"
OUT_HTML = ROOT / "_html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

MONO_P_SRC = (BRAND / "prism-monogram-p.svg").read_text().split("?>", 1)[-1]
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=block" rel="stylesheet">'

CY, OL, YE, OR, MG = "#01ABE8", "#AEB932", "#F4E412", "#E97635", "#DA0082"
NIGHT, IVORY, INK = "#090A0C", "#F2ECE1", "#0D0F13"
BANDS = [CY, OL, YE, OR, MG]


def mono_p(dark=False):
    return MONO_P_SRC.replace("fill: #0D0F13", "fill: #F2ECE1") if dark else MONO_P_SRC


def lockup(dark=False, h=56):
    word = IVORY if dark else INK
    bar = "rgba(143,147,151,.7)" if dark else "rgba(74,81,94,.6)"
    return (
        f'<div class="lockup" style="--lh:{h}px"><div class="p">{mono_p(dark)}</div>'
        f'<div class="bar" style="background:{bar}"></div><div class="word" style="color:{word}">PRISM</div></div>'
    )


def tape(h=18):
    return '<div style="display:flex;height:%dpx">%s</div>' % (h, "".join(f'<span style="background:{c};flex:1"></span>' for c in BANDS))


CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{font-family:'Geist',sans-serif;-webkit-font-smoothing:antialiased;position:relative;line-height:1.2}
.mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.h{font-weight:800;text-transform:uppercase;letter-spacing:.04em;line-height:1}
.abs{position:absolute}
.lockup{display:flex;align-items:center;gap:20px;height:var(--lh)}
.lockup .p{height:var(--lh);display:flex}
.lockup .p svg{height:var(--lh);width:auto}
.lockup .bar{width:1px;height:var(--lh)}
.lockup .word{font-weight:700;font-size:calc(var(--lh)*.65);letter-spacing:.06em}
.night{background:#090A0C;color:#F0F0F2}
.ivory{background:#F2ECE1;color:#0D0F13}
.chip{display:inline-block;padding:12px 20px;border-radius:2px;white-space:nowrap}
"""


def page(cls, inner):
    return f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}<style>{CSS}</style></head><body class="{cls}">{inner}</body></html>'


def card(bg, fg, kicker, title, sub="", kcolor=None, size=128):
    kcolor = kcolor or fg
    subhtml = f'<div style="font-size:46px;font-weight:600;line-height:1.25;margin-top:40px;color:{fg}">{sub}</div>' if sub else ""
    return f"""<body style="background:{bg}">
<div class="abs" style="left:0;right:0;top:0">{tape(18)}</div>
<div class="abs" style="left:96px;right:96px;top:560px">
  <div class="mono" style="font-size:34px;color:{kcolor}">{kicker}</div>
  <div class="h" style="font-size:{size}px;line-height:1.02;margin-top:28px;color:{fg}">{title}</div>
  {subhtml}
</div>
<div class="abs mono" style="left:96px;bottom:430px;font-size:30px;color:{fg}">cartographsearch.com</div>
</body>"""


def raw_card(bg, inner):
    return f'<body style="background:{bg}">{inner}</body>'


def wrap(body_html, cls=""):
    return page(cls, "").replace(f'<body class="{cls}"></body>', body_html)


def capa1():
    tabs = ["OpenAlex", "PubMed", "arXiv", "Crossref", "DOAJ", "Zenodo", "HAL", "Semantic Scholar", "CORE", "ERIC", "PLOS", "OSF", "Figshare", "Europe PMC", "DataCite"]
    rots = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 2, -1, 1.5, -2, 1, -1.5, 2.5, -1]
    chips = "".join(f'<span class="chip mono" style="background:#1A1C1F;color:#DADADA;font-size:30px;transform:rotate({r}deg);margin:8px 6px">{t}</span>' for t, r in zip(tabs, rots))
    return raw_card(NIGHT, f"""
<div class="abs" style="left:0;right:0;top:0">{tape(18)}</div>
<div class="abs" style="left:90px;top:120px">{lockup(True, 52)}</div>
<div class="abs" style="left:70px;right:70px;top:300px;display:flex;flex-wrap:wrap;justify-content:center">{chips}</div>
<div class="abs" style="left:0;right:0;top:640px;height:640px;background:{MG}"></div>
<div class="abs h" style="left:90px;right:90px;top:690px;font-size:150px;line-height:.98;color:{INK}">Pare de<br>abrir 15<br>abas</div>
<div class="abs" style="left:0;right:0;top:1280px;height:200px;background:{YE}"></div>
<div class="abs h" style="left:90px;right:90px;top:1320px;font-size:64px;color:{INK};line-height:1.1">27 bases em<br>uma busca.</div>
<div class="abs mono" style="left:90px;right:90px;bottom:180px;font-size:30px;color:{IVORY};display:flex;justify-content:space-between"><span>Cartograph</span><span>cartographsearch.com</span></div>
""")


def capa2():
    return raw_card(IVORY, f"""
<div class="abs" style="left:0;right:0;top:0">{tape(18)}</div>
<div class="abs" style="left:90px;top:120px">{lockup(False, 52)}</div>
<div class="abs" style="left:0;right:0;top:600px;height:700px;background:{CY}"></div>
<div class="abs mono" style="left:90px;top:650px;font-size:34px;color:{INK}">Passo a passo · Cartograph</div>
<div class="abs h" style="left:90px;right:90px;top:720px;font-size:132px;line-height:1;color:{INK}">A busca<br>inteira<br>no celular</div>
<div class="abs" style="left:90px;right:90px;top:1150px;font-size:48px;font-weight:600;color:{INK}">Direto da fila do bandejão.</div>
<div class="abs" style="right:90px;top:240px;width:250px;height:330px;background:{NIGHT};border-radius:4px;padding:22px">
  <div style="background:#1A1C1F;height:46px;border-radius:2px"></div>
  <div style="background:#141820;height:150px;margin-top:16px"></div>
  <div style="position:absolute;left:22px;right:22px;bottom:22px;display:flex;gap:8px">{''.join(f'<span style="flex:1;height:30px;background:{c}"></span>' for c in BANDS)}</div>
</div>
<div class="abs mono" style="left:90px;right:90px;bottom:180px;font-size:30px;color:{INK};display:flex;justify-content:space-between"><span>Salve para usar depois</span><span>cartographsearch.com</span></div>
""")


ARTS = {
    "reel-1-capa": capa1,
    "reel-1-card-01": lambda: card(MG, INK, "Revisão de literatura", "Pare de abrir 15 abas", size=150),
    "reel-1-card-02": lambda: card(NIGHT, "#F0F0F2", "Cartograph", "27 bases abertas em<br>uma única busca.", "Inclui OpenAlex, PubMed, arXiv, Oasisbr, CORE e mais 22.", kcolor="#6EC2E1", size=106),
    "reel-1-card-03": lambda: card(YE, INK, "Sem planilha para conferir", "Os repetidos saem sozinhos", "Artigos com o mesmo DOI ou título aparecem uma única vez.", size=114),
    "reel-1-card-04": lambda: card(CY, INK, "Gratuito e sem cadastro", "Mande para quem está no TCC", "Principalmente para quem ainda abre 15 abas.", size=114),
    "reel-2-capa": capa2,
    "reel-2-card-01": lambda: card(CY, INK, "Passo 1", "Monte a sua busca", "Use AND, OR e NOT. Ao digitar em português, ele já sugere o termo em inglês.", size=126),
    "reel-2-card-02": lambda: card(YE, INK, "Passo 2", "Filtros que sobem da base", "Ajuste o ano, as bases e o acesso aberto sem perder a lista.", size=114),
    "reel-2-card-03": lambda: card(OR, INK, "Passo 3", "Acesse o PDF gratuito", "Quando existe uma versão aberta, o link já aparece pelo Unpaywall.", size=126),
    "reel-2-card-04": lambda: card(OL, INK, "Passo 4", "Guarde na biblioteca", "Ela agora tem uma aba própria, e você exporta tudo em ABNT ou APA depois.", size=120),
    "reel-2-card-05": lambda: card(NIGHT, "#F0F0F2", "Salve este Reel", "Continue no PC do mesmo ponto", "Funciona em PT, EN, ES ou FR, e o link com ?lang= abre direto no idioma certo.", kcolor="#DA6DAE", size=104),
}

if __name__ == "__main__":
    OUT_HTML.mkdir(exist_ok=True)
    for name, fn in ARTS.items():
        html = OUT_HTML / f"{name}.html"
        html.write_text(wrap(fn()))
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--virtual-time-budget=4000", "--window-size=1080,1920", f"--screenshot={ROOT / (name + '.png')}", html.as_uri()], check=True, capture_output=True)
        print(name)

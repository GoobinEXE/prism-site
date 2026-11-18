import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parents[3]
ASSETS = REPO / "docs/posts/semana-2026-11-16/assets"
OUT_HTML = ROOT / "_html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL = "cartographsearch.com"
N = 9

MONO_P = (REPO / "public/assets/brand/prism-monogram-p.svg").read_text().split("?>", 1)[-1].replace("fill: #0D0F13", "fill: #F2ECE1")
LOGO = (ASSETS / "cartograph-logo-dark.svg").as_uri()

SPEC = ["#01ABE8", "#AEB932", "#F4E412", "#E97635", "#DA0082"]
INK = ["#6EC2E1", "#C4CA86", "#E7DF76", "#E2A888", "#DA6DAE"]
TAPE = "".join(f'<span style="background:{c}"></span>' for c in SPEC)
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=block" rel="stylesheet">'

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Geist',sans-serif;-webkit-font-smoothing:antialiased;position:relative;line-height:1.3;background:#090A0C;color:#F0F0F2}
.mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.tape{position:absolute;left:0;right:0;height:16px;display:flex;z-index:5}.tape span{flex:1}.tape.top{top:0}.tape.bottom{bottom:0}
.count{position:absolute;top:52px;right:88px;font-size:22px;color:#8F9397}
.tag{position:absolute;top:52px;left:88px;font-size:22px}
.page{position:absolute;inset:0;padding:110px 88px 180px;display:flex;flex-direction:column}
.num{font-weight:800;line-height:.74;letter-spacing:-.04em;font-size:560px;margin-top:20px}
.title{font-weight:800;text-transform:uppercase;line-height:1;letter-spacing:.04em;font-size:84px;margin-top:40px}
.body{font-size:36px;margin-top:24px;line-height:1.38;color:#DADADA}
.panel{background:#141820;border-radius:2px;padding:28px 32px;margin-top:auto}
.row{display:flex;gap:12px;flex-wrap:wrap}
.chip{background:#1A1C1F;color:#F0F0F2;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:26px;padding:14px 20px;border-radius:2px;letter-spacing:.04em}
.code{font-family:'JetBrains Mono',monospace;font-size:28px;line-height:1.7;color:#F2ECE1}
.footer{position:absolute;left:88px;right:88px;bottom:58px;display:flex;align-items:center;justify-content:space-between}
.lockup{display:flex;align-items:center;gap:22px}
.lockup .p{height:52px;display:flex}.lockup .p svg{height:52px;width:auto}
.lockup .bar{width:1px;height:52px;background:rgba(143,147,151,.6)}
.lockup .word{font-weight:700;font-size:34px;letter-spacing:.06em}
.swipe{font-size:24px;color:#8F9397}
"""


def doc(i, inner, w=1080, h=1350, count=True, last=False, right=None):
    right = right if right is not None else ("Salve para depois" if last else "Arraste →")
    c = f'<div class="mono count">{i:02d}/{N:02d}</div>' if count else ""
    css = CSS.replace("width:1080px;height:1350px", f"width:{w}px;height:{h}px")
    return (f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}<style>{css}</style></head><body>'
            f'<div class="tape top">{TAPE}</div><div class="tape bottom">{TAPE}</div>{c}<div class="page">{inner}</div>'
            f'<div class="footer"><div class="lockup"><div class="p">{MONO_P}</div><div class="bar"></div><div class="word">PRISM</div></div>'
            f'<div class="mono swipe">{right}</div></div></body></html>')


def step(n, title, body, panel):
    k = (n - 1) % 5
    return (f'<div class="mono tag" style="color:{INK[k]}">Passo {n} de 7</div>'
            f'<div class="num" style="color:{SPEC[k]}">{n}</div>'
            f'<h1 class="title">{title}</h1><p class="body">{body}</p><div class="panel">{panel}</div>')


def label(t, k):
    return f'<div class="mono" style="font-size:20px;color:{INK[k]};margin-bottom:16px">{t}</div>'


def chips(items):
    return '<div class="row">' + "".join(f'<span class="chip">{x}</span>' for x in items) + "</div>"


COVER = f"""
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:0"><div class="mono" style="font-size:24px;color:#6EC2E1">Tutorial · salve este post</div><img src="{LOGO}" style="width:140px;height:140px;display:block"></div>
<div style="display:flex;align-items:flex-end;gap:36px;margin-top:40px">
 <div class="num" style="color:#F4E412;font-size:500px">7</div>
 <div style="font-weight:800;text-transform:uppercase;font-size:96px;line-height:.95;letter-spacing:.04em;padding-bottom:8px">Passos</div>
</div>
<h1 class="title" style="font-size:76px;margin-top:44px">Revisão sistemática do zero ao PRISMA</h1>
<p class="body" style="font-size:38px">Todo o roteiro em um único lugar: o Cartograph.</p>
"""

slides = [
    COVER,
    step(1, "Monte a busca", "Combine os termos usando AND, OR e NOT. Se escrever em português, o Cartograph já sugere o equivalente em inglês.",
         label("Exemplo", 0) + '<div class="code">("saúde mental" <b style="color:#6EC2E1">OR</b> "mental health")<br><b style="color:#6EC2E1">AND</b> adolescentes <b style="color:#6EC2E1">NOT</b> editorial</div>'
         + '<div style="margin-top:20px">' + chips(["PT↔EN", "Sugestão MeSH"]) + "</div>"),
    step(2, "Busque em 27 bases", "Uma única consulta vai para todas ao mesmo tempo. Com chave da Scopus ou da IEEE, você ainda liga mais 7 fontes.",
         label("Algumas das 27", 1) + chips(["PubMed", "OpenAlex", "Scopus*", "Europe PMC", "Oasisbr", "ERIC", "+21"])
         + '<p style="font-size:26px;color:#8F9397;margin-top:18px">* com chave própria. Também dá para entrar usando o proxy da sua universidade.</p>'),
    step(3, "Tire os duplicados", "O mesmo artigo costuma aparecer em várias bases. O sistema cruza o DOI e o título e mantém só uma cópia.",
         label("Conferência por", 2) + chips(["DOI", "Título"])),
    step(4, "Triagem cega em dupla", "Dois revisores decidem quais estudos entram sem ver a escolha do outro. No final, sai a concordância.",
         label("Resultado", 3) + '<div style="display:flex;align-items:center;gap:28px"><div style="font-family:\'JetBrains Mono\',monospace;font-weight:700;font-size:60px;color:#E97635;letter-spacing:.04em">KAPPA</div><div style="font-size:30px;color:#DADADA">de Cohen calculado<br>na hora</div></div>'),
    step(5, "Avalie e puxe citações", "Aplique o checklist de qualidade em cada estudo e rode o citation chaser para achar o que não veio na busca.",
         label("Ferramentas", 4) + chips(["Cochrane RoB 2", "JBI", "Citation chaser"])),
    step(6, "Gere o PRISMA 2020", "O fluxograma já sai pronto com os números de cada etapa da revisão. É só baixar o SVG e colar no trabalho.",
         label("Formato", 0) + chips(["Fluxograma PRISMA 2020", "SVG"])),
    step(7, "Exporte e faça backup", "Leve as referências no formato que a banca pede, salve o projeto em JSON e restaure sempre que precisar.",
         label("Exportação", 1) + chips(["ABNT NBR 6023", "APA 7", "BibTeX", "Matriz CSV", "Backup JSON"])),
    f"""
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:30px"><div class="mono" style="font-size:24px;color:#DA6DAE">Os 7 passos num só site</div><img src="{LOGO}" style="width:140px;height:140px;display:block"></div>
<h1 class="title" style="font-size:108px;line-height:.96;margin-top:60px">Salve para quando chegar nessa fase</h1>
<div style="background:#01ABE8;color:#0D0F13;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:50px;padding:30px 34px;border-radius:2px;margin-top:56px;letter-spacing:.02em">{URL}</div>
<p class="body" style="font-size:38px;margin-top:36px">Gratuito, sem cadastro e direto no navegador.</p>
<p class="body" style="margin-top:auto;color:#8F9397">Quer receber o passo a passo no direct? Comente <b style="color:#DA6DAE">REVISAO</b>.</p>
""",
]

STORY = f"""
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:120px"><div class="mono" style="font-size:28px;color:#6EC2E1">Novo post · tutorial</div><img src="{LOGO}" style="width:160px;height:160px;display:block"></div>
<div style="display:flex;align-items:flex-end;gap:40px;margin-top:80px">
 <div class="num" style="color:#F4E412;font-size:760px">7</div>
 <div style="font-weight:800;text-transform:uppercase;font-size:110px;line-height:.95;letter-spacing:.04em;padding-bottom:10px">Passos</div>
</div>
<h1 class="title" style="font-size:92px;margin-top:80px">Revisão sistemática do zero ao PRISMA</h1>
<p class="body" style="font-size:44px">Com o Cartograph, de graça e sem cadastro.</p>
<div style="align-self:flex-start;background:#DA0082;color:#FFFFFF;font-family:'JetBrains Mono',monospace;font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:40px;padding:24px 34px;border-radius:2px;margin-top:auto;margin-bottom:80px">Veja no feed</div>
"""


def render(name, html, w, h):
    f = OUT_HTML / f"{name}.html"
    f.write_text(html)
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", f"--window-size={w},{h}", "--virtual-time-budget=6000",
                    f"--screenshot={ROOT / f'{name}.png'}", f.as_uri()], check=True, capture_output=True)


OUT_HTML.mkdir(parents=True, exist_ok=True)
for i, inner in enumerate(slides, 1):
    render(f"{i:02d}", doc(i, inner, last=i == N), 1080, 1350)
render("story-chamada", doc(1, STORY, 1080, 1920, count=False, right="cartographsearch.com"), 1080, 1920)
print("ok")

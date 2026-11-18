import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parents[3]
ASSETS = REPO / "docs/posts/semana-2026-11-16/assets"
OUT_HTML = ROOT / "_html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

MONO_P_SRC = (REPO / "public/assets/brand/prism-monogram-p.svg").read_text().split("?>", 1)[-1]
CARTO_DARK = (ASSETS / "cartograph-logo-dark.svg").read_text()

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=block" rel="stylesheet">'
SPEC = ["#01ABE8", "#AEB932", "#F4E412", "#E97635", "#DA0082"]

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Geist',sans-serif;-webkit-font-smoothing:antialiased;position:relative;line-height:1.3}
.mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.spine{position:absolute;top:0;bottom:0;left:0;width:60px;display:flex;flex-direction:column}
.spine span{flex:1}
.lines{position:absolute;left:60px;right:0;top:0;bottom:0}
.lines i{position:absolute;left:0;right:0;height:2px}
.margin{position:absolute;top:0;bottom:0;left:150px;width:3px}
.page{position:absolute;left:190px;right:80px;top:150px;bottom:190px;display:flex;flex-direction:column;justify-content:center}
.head{position:absolute;left:190px;right:80px;top:58px;display:flex;justify-content:space-between;font-size:22px}
.kicker{font-size:24px}
.title{font-weight:800;text-transform:uppercase;line-height:1.0;letter-spacing:.04em;font-size:84px;margin-top:26px}
.title.xl{font-size:104px}
.body{font-size:38px;margin-top:34px;line-height:1.4}
.foot{position:absolute;left:190px;right:80px;bottom:62px;display:flex;align-items:center;justify-content:space-between}
.lockup{display:flex;align-items:center;gap:20px}
.lockup .p svg{height:48px;width:auto;display:block}
.lockup .bar{width:1px;height:48px}
.lockup .word{font-weight:700;font-size:32px;letter-spacing:.06em}
.foot .mono{font-size:22px}
.term{background:#0D0F13;color:#DADADA;font-family:'JetBrains Mono',monospace;font-size:28px;line-height:1.7;padding:34px 38px;border-radius:4px;margin-top:40px}
.term .bar3{display:flex;gap:10px;margin-bottom:18px}.term .bar3 span{width:16px;height:16px}
.term .g{color:#C4CA86}.term .y{color:#E7DF76}.term .m{color:#DA6DAE}.term .c{color:#6EC2E1}.term .d{color:#8F9397}
.ref{background:#F6F2EB;padding:30px 34px;font-size:30px;line-height:1.5;margin-top:40px;border-radius:4px;color:#1F232B}
.ref b{background:#F4E412;color:#0D0F13;font-weight:600;padding:0 4px}
.ref s{color:#963D0A}
.chips{display:flex;flex-wrap:wrap;gap:14px;margin-top:40px}
.chip{background:#0D0F13;color:#F2ECE1;padding:14px 20px;font-size:22px;border-radius:2px}
.ivory{background:#F2ECE1;color:#0D0F13}
.ivory .lines i{background:rgba(74,81,94,.16)}
.ivory .margin{background:#DA0082}
.ivory .kicker{color:#A3005F}.ivory .body{color:#1F232B}.ivory .head,.ivory .foot .mono{color:#4A515E}.ivory .bar{background:rgba(74,81,94,.6)}
.dark{background:#090A0C;color:#F0F0F2}
.dark .lines i{background:rgba(143,147,151,.14)}
.dark .margin{background:#DA0082}
.dark .kicker{color:#DA6DAE}.dark .body{color:#DADADA}.dark .head,.dark .foot .mono{color:#8F9397}.dark .bar{background:rgba(143,147,151,.6)}
.field{color:#0D0F13}
.field .kicker,.field .body,.field .head,.field .foot .mono{color:#0D0F13}
.field .lines i{background:rgba(13,15,19,.12)}
.field .margin{background:#0D0F13}
.field .bar{background:rgba(13,15,19,.5)}
.f-yellow{background:#F4E412}.f-cyan{background:#01ABE8}
.logo svg{width:150px;height:150px;display:block}
"""


def mono_p(ink):
    return MONO_P_SRC.replace("fill: #0D0F13", f"fill: {ink}")


def doc(i, theme, inner, ink="#0D0F13", foot_right=None):
    cls = {"ivory": "ivory", "dark": "dark"}.get(theme, f"field {theme}")
    spine = "".join(f'<span style="background:{c}"></span>' for c in SPEC)
    lines = "".join(f'<i style="top:{y}px"></i>' for y in range(140, 1300, 64))
    right = foot_right or "Arraste →"
    return (
        f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}<style>{CSS}</style></head>'
        f'<body class="{cls}"><div class="lines">{lines}</div><div class="margin"></div><div class="spine">{spine}</div>'
        f'<div class="head mono"><span>Caderno de bastidores</span><span>pág. {i:02d}/{N:02d}</span></div>'
        f'<div class="page">{inner}</div>'
        f'<div class="foot"><div class="lockup"><div class="p">{mono_p(ink)}</div><div class="bar"></div><div class="word">PRISM</div></div>'
        f'<div class="mono">{right}</div></div></body></html>'
    )


SLIDES = [
    ("ivory", '<div class="mono kicker">Revisão de literatura na prática</div>'
     '<div class="title xl">Você digita a mesma busca em cada base, uma por uma.</div>'
     '<div class="body">No final deste caderno, a gente mostra como cortar esse caminho.</div>', "#0D0F13", None),
    ("dark", '<div class="mono kicker">O ritual de sempre</div>'
     '<div class="title">A mesma busca, aba por aba.</div>'
     '<div style="display:flex;gap:8px;margin-top:36px;flex-wrap:nowrap;overflow:hidden"><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#01ABE8;display:inline-block"></i>OpenAlex</span><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#AEB932;display:inline-block"></i>PubMed</span><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#F4E412;display:inline-block"></i>arXiv</span><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#E97635;display:inline-block"></i>SciELO</span><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#DA0082;display:inline-block"></i>CAPES</span><span style="display:flex;align-items:center;gap:10px;background:#1A1C1F;color:#DADADA;padding:12px 13px;font:600 22px Geist,sans-serif;white-space:nowrap"><i style="width:12px;height:12px;background:#8F9397;display:inline-block"></i>+22</span></div>'
     '<div style="margin-top:44px"><div style="margin-left:0px;margin-top:-14px;width:640px;background:#F2ECE1;color:#0D0F13"><div style="background:#01ABE8;padding:10px 18px;font:700 22px JetBrains Mono,monospace;letter-spacing:.12em;text-transform:uppercase">Base 1</div><div style="padding:18px;font:600 30px Geist,sans-serif">⌕ saúde mental AND adolescentes</div></div><div style="margin-left:60px;margin-top:-14px;width:640px;background:#F2ECE1;color:#0D0F13"><div style="background:#F4E412;padding:10px 18px;font:700 22px JetBrains Mono,monospace;letter-spacing:.12em;text-transform:uppercase">Base 2</div><div style="padding:18px;font:600 30px Geist,sans-serif">⌕ saúde mental AND adolescentes</div></div><div style="margin-left:120px;margin-top:-14px;width:640px;background:#F2ECE1;color:#0D0F13"><div style="background:#DA0082;padding:10px 18px;font:700 22px JetBrains Mono,monospace;letter-spacing:.12em;text-transform:uppercase">Base 3</div><div style="padding:18px;font:600 30px Geist,sans-serif">⌕ saúde mental AND adolescentes</div></div></div>'
     '<div style="display:flex;align-items:center;gap:14px;margin-top:44px"><span style="background:#01ABE8;color:#0D0F13;padding:14px 22px;font:800 30px Geist,sans-serif;text-transform:uppercase">Abre</span><span style="font:800 36px Geist;color:#F2ECE1">→</span><span style="background:#F4E412;color:#0D0F13;padding:14px 22px;font:800 30px Geist,sans-serif;text-transform:uppercase">Cola</span><span style="font:800 36px Geist;color:#F2ECE1">→</span><span style="background:#E97635;color:#0D0F13;padding:14px 22px;font:800 30px Geist,sans-serif;text-transform:uppercase">Exporta</span><span style="font:800 40px Geist;color:#DA6DAE;margin-left:10px">↻ ×27</span></div>', "#F2ECE1", None),
    ("ivory", '<div class="mono kicker">A segunda parte</div>'
     '<div class="title">Depois, a referência formatada à mão.</div>'
     '<div class="ref">SOBRENOME, Nome<b>.</b> Título do artigo<b>.</b> <i>Nome da revista</i><b>,</b> v. 12<b>,</b> n. 3<b>,</b> p. 45-67<b>,</b> <s>2019</s> 2020<b>.</b></div>'
     '<div class="body">São horas conferindo cada ponto, cada vírgula e cada itálico, referência por referência.</div>', "#0D0F13", None),
    ("f-yellow", '<div class="mono kicker">Onde o Prism entrou</div>'
     '<div class="title xl">Essa parte dava para automatizar.</div>'
     '<div class="body">Foi por isso que o Prism construiu o Cartograph: para tirar o trabalho braçal da sua rotina.</div>', "#0D0F13", None),
    ("dark", '<div class="mono kicker">O que ele resolve</div>'
     '<div class="title">Uma busca em 27 bases ao mesmo tempo.</div>'
     '<div class="body">Os artigos repetidos saem pelo DOI e pelo título, e a sua lista já fica pronta em ABNT, APA ou BibTeX.</div>'
     '<div class="chips"><span class="chip mono">OpenAlex</span><span class="chip mono">PubMed</span><span class="chip mono">Oasisbr</span><span class="chip mono">arXiv</span><span class="chip mono">+23</span></div>', "#F2ECE1", None),
    ("ivory", '<div class="mono kicker">Para quem revisa de verdade</div>'
     '<div class="title">Feito para a rotina de revisão.</div>'
     '<div class="body">Você faz a triagem cega em dupla com o kappa de Cohen calculado, gera o fluxograma PRISMA 2020, puxa citações e ainda acessa o PDF aberto pelo Unpaywall.</div>', "#0D0F13", None),
    ("dark", '<div class="logo">' + CARTO_DARK + '</div>'
     '<div class="title">Gratuito, sem cadastro e no navegador.</div>'
     '<div class="body"><b style="color:#6EC2E1">cartographsearch.com</b><br>Siga o Prism para acompanhar o que a gente constrói em seguida.</div>', "#F2ECE1", "Siga o Prism"),
]


N = len(SLIDES)


def main():
    OUT_HTML.mkdir(exist_ok=True)
    for i, (theme, inner, ink, right) in enumerate(SLIDES, 1):
        html = OUT_HTML / f"{i:02d}.html"
        html.write_text(doc(i, theme, inner, ink, right))
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--window-size=1080,1350",
                        "--virtual-time-budget=4000", f"--screenshot={ROOT / f'{i:02d}.png'}", html.as_uri()],
                       check=True, capture_output=True)


if __name__ == "__main__":
    main()

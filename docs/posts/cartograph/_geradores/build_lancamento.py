import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parents[3]
ASSETS = REPO / "docs/posts/semana-2026-11-16/assets"
OUT_HTML = ROOT / "_html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CELULAR = (REPO / "docs/posts/cartograph-v3/feed-celular/_ref/celular-390.png").as_uri()

MONO_P_SRC = (REPO / "public/assets/brand/prism-monogram-p.svg").read_text().split("?>", 1)[-1]
CARTO_DARK = (ASSETS / "cartograph-logo-dark.svg").read_text()
CARTO_LIGHT = (ASSETS / "cartograph-logo-light.svg").read_text()

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Martian+Mono:wdth,wght@75..112.5,400..800&display=block" rel="stylesheet">'
CYAN, OLIVE, YELLOW, ORANGE, MAGENTA = "#01ABE8", "#AEB932", "#F4E412", "#E97635", "#DA0082"
SPEC = [CYAN, OLIVE, YELLOW, ORANGE, MAGENTA]

LINES = [
    ("Saúde", MAGENTA, ["PubMed", "Europe PMC", "PLOS", "DOAJ"]),
    ("Exatas e tecnologia", YELLOW, ["arXiv", "INSPIRE-HEP", "OSTI.GOV", "NASA NTRS", "HAL", "CORE"]),
    ("Dados", OLIVE, ["Zenodo", "DataCite", "Figshare", "GBIF", "Harvard Dataverse"]),
    ("Economia e políticas", ORANGE, ["World Bank Reports", "World Bank OKR", "IPEA", "UN Digital Library", "SocArXiv"]),
    ("Geral", CYAN, ["OpenAIRE", "OSF Preprints", "ERIC", "Oasisbr"]),
]
HUB = ["OpenAlex", "Semantic Scholar", "Crossref"]

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Archivo',sans-serif;font-stretch:100%;-webkit-font-smoothing:antialiased;position:relative;line-height:1.25}
.mono{font-family:'Martian Mono',monospace;font-stretch:87.5%;text-transform:uppercase;letter-spacing:.1em;font-weight:600}
.ivory{background:#F2ECE1;color:#0D0F13}
.dark{background:#090A0C;color:#F0F0F2}
.f-cyan{background:#01ABE8;color:#0D0F13}.f-yellow{background:#F4E412;color:#0D0F13}.f-magenta{background:#DA0082;color:#0D0F13}
.tape{position:absolute;left:0;right:0;top:0;height:14px;display:flex}.tape span{flex:1}
.head{position:absolute;left:90px;right:90px;top:62px;display:flex;justify-content:space-between;font-size:17px}
.ivory .head,.ivory .foot .mono{color:#4A515E}.dark .head,.dark .foot .mono{color:#8F9397}
.page{position:absolute;left:90px;right:90px;top:140px;bottom:170px}
.kicker{font-size:19px}
.ivory .kicker{color:#005F85}.dark .kicker{color:#6EC2E1}
.title{font-weight:900;font-stretch:125%;text-transform:uppercase;line-height:.95;letter-spacing:0;font-size:68px;margin-top:22px}
.title.xl{font-size:84px}
.body{font-size:36px;margin-top:28px;line-height:1.4}
.ivory .body{color:#1F232B}.dark .body{color:#DADADA}
.foot{position:absolute;left:90px;right:90px;bottom:60px;display:flex;align-items:center;justify-content:space-between}
.lockup{display:flex;align-items:center;gap:20px}
.lockup .p svg{height:48px;width:auto;display:block}
.lockup .bar{width:1px;height:48px;background:currentColor;opacity:.5}
.lockup .word{font-weight:800;font-stretch:125%;font-size:30px;letter-spacing:.04em}
.foot .mono{font-size:17px}
.sbar{display:flex;align-items:center;justify-content:space-between;padding:20px 26px;font-size:30px;font-weight:600}
.sbar .tag{font-family:'Martian Mono',monospace;font-size:20px;letter-spacing:.12em;text-transform:uppercase;padding:8px 12px}
.card{background:#F6F2EB;color:#0D0F13;padding:26px 30px}
.dark .card{background:#141820;color:#F0F0F2}
"""


def mono_p(ink):
    return MONO_P_SRC.replace("fill: #0D0F13", f"fill: {ink}")


def tape():
    return '<div class="tape">' + "".join(f'<span style="background:{c}"></span>' for c in SPEC) + "</div>"


def doc(i, n, theme, inner, ink, right="Arraste →"):
    return (
        f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}<style>{CSS}</style></head>'
        f'<body class="{theme}">{tape()}'
        f'<div class="head mono"><span></span><span>{i:02d}/{n:02d}</span></div>'
        f'<div class="page">{inner}</div>'
        f'<div class="foot"><div class="lockup"><div class="p">{mono_p(ink)}</div><div class="bar"></div><div class="word">PRISM</div></div>'
        f'<div class="mono">{right}</div></div></body></html>'
    )


def metro(w=900, h=700, dark=True, labels=True):
    bg_station = "#090A0C" if dark else "#F2ECE1"
    txt = "#F0F0F2" if dark else "#0D0F13"
    muted = "#8F9397" if dark else "#4A515E"
    top, gap = 70, 128
    hub_x = 70
    x0, step = 220, 124
    parts = []
    ys = [top + k * gap for k in range(len(LINES))]
    for (name, color, stations), y in zip(LINES, ys):
        end = x0 + step * (len(stations) - 1)
        parts.append(f'<line x1="{hub_x}" y1="{y}" x2="{end}" y2="{y}" stroke="{color}" stroke-width="14"/>')
        if labels:
            parts.append(f'<text x="{hub_x + 46}" y="{y - 22}" fill="{color}" font-family="Martian Mono" font-weight="700" font-size="17" letter-spacing="2">{name.upper()}</text>')
        for k, st in enumerate(stations):
            x = x0 + step * k
            parts.append(f'<circle cx="{x}" cy="{y}" r="13" fill="{bg_station}" stroke="{color}" stroke-width="7"/>')
            if labels:
                words = st.split(" ")
                lines = [" ".join(words[:-1]), words[-1]] if len(words) > 1 and len(st) > 11 else [st]
                for li, t in enumerate(lines):
                    if t:
                        parts.append(f'<text x="{x}" y="{y + 42 + li * 22}" fill="{txt}" font-family="Archivo" font-weight="600" font-size="19" text-anchor="middle">{t}</text>')
    parts.insert(0, f'<rect x="{hub_x - 26}" y="{ys[0] - 34}" width="52" height="{ys[-1] - ys[0] + 68}" fill="{txt}"/>')
    for y in ys:
        parts.append(f'<circle cx="{hub_x}" cy="{y}" r="11" fill="{bg_station}"/>')
    return f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'


def slides():
    prints = [
        ("arxiv", 150, 140, 1126, 86),
        ("crossref", 365, 130, 560, 68),
        ("oasisbr", 315, 196, 810, 125),
        ("zenodo", 290, 10, 330, 52),
    ]
    disp = 900
    shots = ""
    for k, (name, x, y, w, h) in enumerate(prints):
        sc = disp / w
        src = (ROOT / "_prints" / f"{name}@3x.png").as_uri()
        shots += (
            f'<div style="position:relative;width:{disp}px;margin-top:0;background:#fff;padding:0">'
            f'<div style="width:{disp}px;height:{int(h * sc)}px;overflow:hidden"><img src="{src}" style="width:{int(1440 * sc)}px;margin-left:{-int(x * sc)}px;margin-top:{-int(y * sc)}px;display:block"></div>'
            '</div>'
        )
    s1 = (
        '<div class="mono kicker">Novo no Prism</div>'
        '<div class="title" style="font-size:62px">Você ainda pesquisa site por site?</div>'
        f'<div style="margin-top:60px;display:flex;flex-direction:column;gap:44px">{shots}</div>'
        '<div class="mono" style="margin-top:22px;font-size:16px;color:#963D0A">A mesma busca em quatro sites diferentes, e ainda faltam 23.</div>'
    )
    s2 = (
        '<div class="mono kicker">Conheça o Cartograph</div>'
        '<div class="title">Uma única busca,<br>27 bases.</div>'
        f'<div style="margin-top:40px;margin-left:-20px">{metro()}</div>'
        f'<div class="body" style="font-size:26px;margin-top:0">Funciona como um mapa de metrô: cada linha representa uma área e cada estação é uma base. A barra branca é a sua busca, que percorre todas ao mesmo tempo.</div>'
    )
    keys = ["Scopus", "ScienceDirect", "IEEE Xplore", "Springer Nature", "The Lens", "Fed in Print", "GovInfo"]
    chips = "".join(f'<span style="background:#141820;color:#F0F0F2;padding:14px 18px;font-size:26px;font-weight:600">{k}</span>' for k in keys)
    s3 = (
        '<div class="mono kicker">Já tem acesso pago?</div>'
        '<div class="title">Use a sua chave da Scopus ou da IEEE.</div><div class="body">Ela entra junto na mesma busca, sem você precisar abrir outro site.</div>'
        f'<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:40px">{chips}</div>'
        '<div style="display:flex;gap:24px;margin-top:56px;align-items:flex-end">'
        '<div style="font-weight:900;font-stretch:125%;font-size:170px;line-height:.8;color:#E97635">128</div>'
        '<div class="body" style="margin:0 0 10px">sites acadêmicos reunidos no catálogo, para quando você precisar ir além.</div></div>'
    )
    dup = "".join(
        f'<div style="background:#F2ECE1;padding:20px 24px;margin-top:{0 if k == 0 else -8}px;margin-left:{k * 30}px;width:700px;font-size:26px;font-weight:600"><span class="mono" style="font-size:18px;display:block;margin-bottom:6px">{b}</span>Exercício físico e ansiedade em adolescentes</div>'
        for k, b in enumerate(["OpenAlex", "PubMed", "Crossref"])
    )
    s4 = (
        '<div class="title" style="font-size:94px;line-height:.92;margin-top:0">Sem artigos repetidos.</div>'
        '<div class="body" style="color:#0D0F13;font-size:36px;font-weight:600;margin-top:24px">Encontrou o mesmo artigo em três bases diferentes? Aqui ele aparece uma única vez.</div>'
        f'<div style="margin-top:44px">{dup}</div>'
        '<div style="font-weight:800;font-size:60px;margin:26px 0 0 10px">↓</div>'
        '<div style="background:#0D0F13;color:#F2ECE1;padding:22px 26px;margin-top:10px;width:760px;font-size:28px;font-weight:600"><span class="mono" style="font-size:18px;display:block;margin-bottom:6px;color:#6EC2E1">resultado unificado</span>Exercício físico e ansiedade em adolescentes</div>'
    )
    tabs = "".join(
        f'<span class="mono" style="padding:14px 22px;font-size:22px;background:{bg};color:{fg}">{t}</span>'
        for t, bg, fg in [("ABNT", "#0D0F13", "#F2ECE1"), ("APA 7", "#E3DCCF", "#0D0F13"), ("BibTeX", "#E3DCCF", "#0D0F13"), ("CSV", "#E3DCCF", "#0D0F13")]
    )
    s5 = (
        '<div class="mono kicker" style="color:#0D0F13">Na hora de citar</div>'
        '<div class="title xl">A referência já vem pronta.</div>'
        f'<div style="display:flex;gap:6px;margin-top:50px">{tabs}</div>'
        '<div style="background:#F2ECE1;padding:34px 36px;font-size:32px;line-height:1.5">SOBRENOME, N. Título do artigo. <i>Nome da Revista</i>, v. 12, n. 3, p. 45-67, 2024.</div>'
        '<div class="body" style="color:#0D0F13">É só escolher o formato que você precisa e copiar. Se já tiver uma lista começada, também dá para importar.</div>'
    )
    flow = [("Tudo o que foi encontrado", CYAN), ("Sem os artigos repetidos", OLIVE), ("Triagem em dupla, às cegas", YELLOW), ("Estudos incluídos", MAGENTA)]
    fl = "".join(
        f'<div style="background:{c};color:#0D0F13;padding:24px 28px;font-size:28px;font-weight:900;font-stretch:115%;text-transform:uppercase">{t}</div>'
        + ('<div style="width:8px;height:34px;background:#F0F0F2;margin-left:40px"></div>' if k < len(flow) - 1 else "")
        for k, (t, c) in enumerate(flow)
    )
    s6 = (
        '<div class="mono kicker">Vai fazer revisão sistemática?</div>'
        '<div class="title">O fluxograma PRISMA sai junto.</div>'
        f'<div style="margin-top:44px">{fl}</div>'
        '<div class="body" style="font-size:30px">Você também conta com um checklist para avaliar a qualidade de cada estudo.</div>'
    )
    s7 = (
        '<div style="display:flex;gap:56px;align-items:center;height:100%">'
        '<div style="flex:1"><div class="mono kicker">Agora no celular</div>'
        '<div class="title" style="font-size:58px">A busca cabe no seu bolso.</div>'
        '<div class="body">Também dá para fazer a pesquisa direto pelo celular, com a interface em português, inglês, espanhol ou francês.</div></div>'
        f'<div style="position:relative;width:372px;height:830px;flex-shrink:0;background:#2A2D34;border-radius:62px;padding:12px">'
        '<span style="position:absolute;left:-5px;top:170px;width:5px;height:70px;background:#2A2D34;border-radius:3px 0 0 3px"></span>'
        '<span style="position:absolute;left:-5px;top:260px;width:5px;height:70px;background:#2A2D34;border-radius:3px 0 0 3px"></span>'
        '<span style="position:absolute;right:-5px;top:220px;width:5px;height:110px;background:#2A2D34;border-radius:0 3px 3px 0"></span>'
        f'<div style="position:relative;width:100%;height:100%;border-radius:50px;overflow:hidden;background:#fff">'
        '<span style="position:absolute;left:50%;top:12px;transform:translateX(-50%);width:110px;height:32px;background:#0D0F13;border-radius:16px"></span>'
        f'<img src="{CELULAR}" style="width:100%;display:block;margin-top:44px"></div></div>'
        '</div>'
    )
    checklist = "".join(
        f'<div style="display:flex;align-items:center;gap:18px;font-size:28px;font-weight:600;padding:12px 0"><span style="width:22px;height:22px;background:{c};flex-shrink:0"></span>{t}</div>'
        for t, c in [("27 bases consultadas em uma única busca", CYAN), ("Sua chave da Scopus ou da IEEE entra junto", OLIVE), ("Remoção automática dos artigos repetidos", YELLOW), ("Referências prontas em ABNT, APA ou BibTeX", ORANGE), ("Fluxograma PRISMA pronto para a revisão", MAGENTA), ("Versão completa direto no celular", CYAN)]
    )
    s8 = (
        f'<div style="display:flex;align-items:center;gap:26px;margin-top:70px"><div style="width:110px;height:110px">{CARTO_DARK}</div>'
        '<div><div style="font-weight:900;font-stretch:125%;font-size:52px">CARTOGRAPH</div><div class="mono" style="font-size:22px;color:#8F9397;margin-top:6px">Gratuito · sem cadastro</div></div></div>'
        f'<div class="card" style="margin-top:44px">{checklist}</div>'
        '<div style="background:#01ABE8;color:#0D0F13;padding:26px 30px;margin-top:30px;font-weight:900;font-stretch:112%;font-size:44px">cartographsearch.com</div>'
        '<div class="body" style="font-size:38px;font-weight:700;color:#F0F0F2">Salve este post e mande no grupo da pós.</div>'
    )
    return [
        ("ivory", s1, "#0D0F13", "Arraste →"),
        ("dark", s2, "#F2ECE1", "Arraste →"),
        ("dark", s3, "#F2ECE1", "Arraste →"),
        ("f-cyan", s4, "#0D0F13", "Arraste →"),
        ("f-yellow", s5, "#0D0F13", "Arraste →"),
        ("dark", s6, "#F2ECE1", "Arraste →"),
        ("ivory", s7, "#0D0F13", "Arraste →"),
        ("dark", s8, "#F2ECE1", "Siga o Prism"),
    ]


def main():
    OUT_HTML.mkdir(exist_ok=True)
    only = set(sys.argv[1:])
    items = slides()
    for i, (theme, inner, ink, right) in enumerate(items, 1):
        if only and f"{i:02d}" not in only:
            continue
        html = OUT_HTML / f"{i:02d}.html"
        html.write_text(doc(i, len(items), theme, inner, ink, right))
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--window-size=1080,1350",
                        "--virtual-time-budget=4000", f"--screenshot={ROOT / f'{i:02d}.png'}", html.as_uri()],
                       check=True, capture_output=True)


if __name__ == "__main__":
    main()

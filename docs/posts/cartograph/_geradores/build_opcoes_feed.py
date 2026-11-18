import pathlib
import subprocess
import sys

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
    svg = MONO_P_SRC
    if dark:
        svg = svg.replace("fill: #0D0F13", "fill: #F2ECE1")
    return svg


def logo(name):
    return (ASSETS / name).as_uri()


def lockup(dark=False, h=48):
    word = IVORY if dark else INK
    bar = "rgba(143,147,151,.7)" if dark else "rgba(74,81,94,.6)"
    return (
        f'<div class="lockup" style="--h:{h}px"><div class="p">{mono_p(dark)}</div>'
        f'<div class="bar" style="background:{bar}"></div><div class="word" style="color:{word}">PRISM</div></div>'
    )


def tape(h=14, w="100%"):
    return f'<div style="display:flex;height:{h}px;width:{w}">' + "".join(f'<span style="background:{c};flex:1"></span>' for c in BANDS) + "</div>"


CSS = """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Geist',sans-serif;-webkit-font-smoothing:antialiased;position:relative;line-height:1.2}
.mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.h{font-weight:800;text-transform:uppercase;letter-spacing:.04em;line-height:1}
.abs{position:absolute}
.lockup{display:flex;align-items:center;gap:18px;height:var(--h)}
.lockup .p{height:var(--h);display:flex}
.lockup .p svg{height:var(--h);width:auto}
.lockup .bar{width:1px;height:var(--h)}
.lockup .word{font-weight:700;font-size:calc(var(--h)*.65);letter-spacing:.06em}
.night{background:#090A0C;color:#F0F0F2}
.ivory{background:#F2ECE1;color:#0D0F13}
"""


def feed(cls, inner):
    return (
        f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">{FONTS}'
        f'<style>{CSS}</style></head><body class="{cls}">{inner}</body></html>'
    )


def footer(dark=False, right="cartographsearch.com"):
    col = IVORY if dark else INK
    return f'<div class="abs" style="left:88px;bottom:64px">{lockup(dark, 44)}</div><div class="abs mono" style="right:88px;bottom:74px;font-size:26px;color:{col}">{right}</div>'


def op1():
    def bubble(txt, mine=False, time="22:47"):
        bg = CY if mine else "#1A1C1F"
        fg = INK if mine else "#F0F0F2"
        side = "margin-left:auto" if mine else ""
        return f'<div style="max-width:780px;{side};background:{bg};color:{fg};padding:30px 36px;border-radius:4px;font-size:42px;line-height:1.28;margin-top:26px">{txt}<div class="mono" style="font-size:20px;margin-top:14px;opacity:.75;text-align:right">{time}</div></div>'
    return feed("night", f"""
<div class="abs" style="left:0;right:0;top:0;height:150px;background:#141820;display:flex;align-items:center;padding:0 88px;gap:28px">
  <div style="width:84px;height:84px;border-radius:2px;background:{OR};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:40px;color:{INK}">OR</div>
  <div><div style="font-size:38px;font-weight:700;color:#F0F0F2">Orientador</div><div class="mono" style="font-size:20px;color:#8F9397;margin-top:6px">visto por último hoje</div></div>
</div>
<div class="abs" style="left:88px;right:88px;top:200px">
  {bubble("Oi. Lendo seu projeto, acho que o capítulo 2 pede uma revisão sistemática.")}
  {bubble("Com fluxograma PRISMA e dois revisores, ok?", time="22:48")}
  {bubble("cartographsearch.com", mine=True, time="22:51")}
</div>
<div class="abs" style="left:88px;right:88px;top:920px">
  <div class="h" style="font-size:62px;color:{IVORY};line-height:1.02">Ele pediu.<br>Você já sabe onde fazer.</div>
  <div style="font-size:29px;color:#DADADA;margin-top:16px;line-height:1.3">No Cartograph, você pesquisa em 27 bases ao mesmo tempo e já gera o PRISMA 2020 de graça.</div>
</div>
{footer(True, "Link na bio")}
""")


def op2():
    def col(name, c, marks):
        rows = "".join(
            f'<div style="display:flex;justify-content:space-between;align-items:center;background:#F6F2EB;padding:18px 22px;margin-top:12px;font-size:30px"><span class="mono" style="font-size:22px;color:#4A515E">ART {i:02d}</span><span style="font-weight:800;font-size:28px;background:{ "#0D0F13" if m=="SIM" else "#EAE3D6"};color:{ IVORY if m=="SIM" else INK};padding:6px 14px">{m}</span></div>'
            for i, m in enumerate(marks, 1)
        )
        return f'<div style="flex:1"><div style="background:{c};padding:18px 22px;display:flex;justify-content:space-between;align-items:center"><span class="h" style="font-size:36px;color:{INK}">{name}</span><span class="mono" style="font-size:20px;color:{INK}">às cegas</span></div>{rows}</div>'
    a = ["SIM", "NÃO", "SIM", "SIM"]
    b = ["SIM", "NÃO", "NÃO", "SIM"]
    return feed("ivory", f"""
<div class="abs mono" style="left:88px;top:78px;font-size:26px;color:#A3005F">Cartograph · triagem</div>
<div class="abs h" style="left:88px;right:88px;top:126px;font-size:70px;line-height:1.02">Dois revisores.<br>Nenhum vê o voto do outro.</div>
<div class="abs" style="left:88px;right:88px;top:380px;display:flex;gap:28px">{col("Revisor A", CY, a)}{col("Revisor B", OL, b)}</div>
<div class="abs" style="left:88px;right:88px;top:880px;background:{MG};padding:30px 40px;display:flex;align-items:center;justify-content:space-between">
  <div><div class="mono" style="font-size:24px;color:{INK}">concordância</div><div class="h" style="font-size:64px;color:{INK};margin-top:8px">kappa de Cohen</div></div>
  <div class="h" style="font-size:120px;color:{INK};letter-spacing:0">κ</div>
</div>
<div class="abs" style="left:88px;right:88px;top:1070px;font-size:34px;color:#1F232B;line-height:1.3">O Cartograph calcula sozinho. Você só resolve os empates.</div>
{footer(False)}
""")


def op3():
    def node(label, c, x, y, w=250):
        return f'<div class="abs mono" style="left:{x}px;top:{y}px;width:{w}px;background:{c};color:{INK};padding:18px 0;text-align:center;font-size:22px">{label}</div>'
    lines = ""
    for y in (520, 610, 700):
        lines += f'<div class="abs" style="left:350px;top:{y+28}px;width:190px;height:4px;background:#4A515E"></div>'
    for y in (520, 610, 700):
        lines += f'<div class="abs" style="left:540px;top:{y+28}px;width:190px;height:4px;background:#4A515E"></div>'
    nodes = "".join(node(f"cita · {i}", CY, 100, y) for i, y in zip("ABC", (520, 610, 700)))
    nodes += "".join(node(f"citado por · {i}", OR, 730, y) for i, y in zip("DEF", (520, 610, 700)))
    center = f'<div class="abs" style="left:420px;top:490px;width:240px;height:300px;background:{INK};color:{IVORY};display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center"><div class="mono" style="font-size:20px;color:#E7DF76">o artigo bom</div><div class="h" style="font-size:44px;margin-top:14px;line-height:1.05">seu<br>ponto<br>de partida</div></div>'
    return feed("ivory", f"""
<div class="abs" style="left:0;right:0;top:0">{tape(18)}</div>
<div class="abs mono" style="left:88px;top:84px;font-size:26px;color:#005F85">Cartograph · busca de citações</div>
<div class="abs h" style="left:88px;right:88px;top:134px;font-size:72px;line-height:1.02">Achou um artigo bom?<br>Puxe o fio.</div>
<div class="abs mono" style="left:100px;top:465px;font-size:22px;color:#005F85">← o que ele cita</div>
<div class="abs mono" style="right:100px;top:465px;font-size:22px;color:#963D0A;text-align:right">quem cita ele →</div>
{lines}{nodes}{center}
<div class="abs" style="left:88px;right:88px;top:880px;font-size:44px;line-height:1.3;font-weight:600">Para trás, as referências que ele usou. Para frente, os trabalhos que vieram depois.</div>
<div class="abs" style="left:88px;right:88px;top:1060px;font-size:34px;color:#4A515E;line-height:1.3">Tudo entra na mesma lista, sem duplicado.</div>
{footer(False)}
""")


def op4():
    keys = ["Scopus", "ScienceDirect", "IEEE Xplore", "Springer Nature", "The Lens", "Fed in Print", "Congress.gov"]
    rows = "".join(
        f'<div style="display:flex;align-items:center;justify-content:space-between;background:#141820;padding:20px 30px;margin-top:12px"><span style="font-size:36px;font-weight:700;color:#F0F0F2">{k}</span><span class="mono" style="font-size:20px;color:{IVORY};background:{BANDS[i % 5] if False else "#1A1C1F"};padding:8px 14px">sua chave</span></div>'
        for i, k in enumerate(keys)
    )
    return feed("night", f"""
<div class="abs" style="left:0;top:0;bottom:0;width:440px;background:{YE}"></div>
<div class="abs mono" style="left:60px;top:84px;font-size:24px;color:{INK}">Acesso</div>
<div class="abs h" style="left:60px;top:130px;width:340px;font-size:72px;color:{INK};line-height:1.02">Entra pela sua univer&shy;sidade</div>
<div class="abs" style="left:60px;top:520px;width:330px;background:{INK};color:{IVORY};padding:26px">
  <div class="mono" style="font-size:20px;color:#E7DF76">proxy institucional</div>
  <div style="font-size:30px;margin-top:12px;line-height:1.3">O login que a biblioteca já te deu abre o texto completo.</div>
</div>
<div class="abs" style="left:60px;top:980px;width:330px;font-size:30px;color:{INK};line-height:1.3;font-weight:600">Além das 27 bases abertas.</div>
<div class="abs" style="left:500px;right:70px;top:84px">
  <div class="mono" style="font-size:24px;color:#E7DF76">+ 7 fontes com chave</div>
  <div class="h" style="font-size:66px;color:{IVORY};margin-top:14px;line-height:1">Cole a chave.<br>Pronto.</div>
  <div style="margin-top:30px">{rows}</div>
</div>
<div class="abs" style="left:60px;bottom:64px">{lockup(False, 44)}</div>
<div class="abs mono" style="right:70px;bottom:74px;font-size:24px;color:{IVORY}">cartographsearch.com</div>
""")


def op5():
    langs = [(CY, "PT", "Buscar artigos"), (OL, "EN", "Search papers"), (YE, "ES", "Buscar artículos"), (OR, "FR", "Chercher des articles")]
    blocks = "".join(
        f'<div style="flex:1;background:{c};display:flex;align-items:center;padding:0 88px;justify-content:space-between"><span class="h" style="font-size:170px;color:{INK};letter-spacing:0">{code}</span><span style="font-size:44px;font-weight:700;color:{INK};text-align:right">{t}</span></div>'
        for c, code, t in langs
    )
    return feed("ivory", f"""
<div class="abs" style="left:88px;right:88px;top:70px;display:flex;justify-content:space-between;align-items:center">{lockup(False, 44)}<span class="mono" style="font-size:24px;color:#A3005F">Cartograph</span></div>
<div class="abs h" style="left:88px;right:88px;top:160px;font-size:76px;line-height:1.02">Fala a língua<br>da sua pesquisa</div>
<div class="abs" style="left:0;right:0;top:370px;height:820px;display:flex;flex-direction:column">{blocks}</div>
<div class="abs" style="left:88px;right:88px;bottom:66px;font-size:32px;font-weight:600;display:flex;justify-content:space-between"><span>E expande termos entre PT e EN.</span><span class="mono" style="font-size:24px">grátis</span></div>
""")


def op6():
    items = [
        ("Abrir 15 abas de base em base", True),
        ("Copiar resultado para a planilha", True),
        ("Caçar artigo repetido", True),
        ("Desenhar o PRISMA à mão", True),
        ("Formatar referência em ABNT", True),
        ("Escrever o TCC", False),
    ]
    rows = ""
    for t, done in items:
        box = f'<div style="width:62px;height:62px;flex:none;background:{OL if done else "#EAE3D6"};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:44px;color:{INK}">{"✓" if done else ""}</div>'
        style = "text-decoration:line-through;text-decoration-thickness:5px;text-decoration-color:#DA0082;color:#4A515E" if done else "color:#0D0F13;font-weight:800"
        rows += f'<div style="display:flex;align-items:center;gap:30px;padding:24px 0;border-bottom:2px solid rgba(74,81,94,.22)">{box}<span style="font-size:40px;font-weight:600;{style}">{t}</span></div>'
    return feed("ivory", f"""
<div class="abs" style="left:70px;right:70px;top:70px;bottom:190px;background:#F6F2EB;padding:56px 60px">
  <div class="mono" style="font-size:24px;color:#545C10">tcc_pendências.txt</div>
  <div class="h" style="font-size:86px;margin-top:18px">Lista do TCC</div>
  <div style="margin-top:36px">{rows}</div>
  <div style="margin-top:40px;font-size:34px;line-height:1.3;color:#1F232B">O Cartograph risca cinco. O último é com você.</div>
</div>
{footer(False)}
""")


def op7():
    return feed("", f"""
<div class="abs" style="inset:0;background:{OR}"></div>
<div class="abs mono" style="left:88px;top:84px;font-size:26px;color:{INK}">Salve este post</div>
<div class="abs h" style="left:80px;right:60px;top:170px;font-size:150px;color:{INK};line-height:.92;letter-spacing:0">Referência<br>em ABNT<br>sem copiar<br>e colar</div>
<div class="abs" style="left:88px;right:88px;top:960px;background:{INK};color:{IVORY};padding:30px 36px">
  <div class="mono" style="font-size:22px;color:#E2A888">NBR 6023 · APA 7 · BibTeX</div>
  <div style="font-size:36px;margin-top:12px;line-height:1.3">Marque os artigos no Cartograph e exporte a lista formatada.</div>
</div>
{footer(False)}
""")


def op8():
    bases = [
        ("OpenAlex", 3), ("PubMed", 3), ("arXiv", 3), ("Semantic Scholar", 2), ("Crossref", 2), ("Europe PMC", 2),
        ("DOAJ", 2), ("Zenodo", 1), ("HAL", 2), ("DataCite", 1), ("INSPIRE-HEP", 1), ("Figshare", 1),
        ("GBIF", 2), ("OSTI.GOV", 1), ("NASA NTRS", 1), ("OpenAIRE", 1), ("OSF Preprints", 1), ("ERIC", 2),
        ("PLOS", 2), ("Oasisbr", 2), ("Harvard Dataverse", 0), ("CORE", 2), ("World Bank Reports", 0), ("World Bank OKR", 0),
        ("SocArXiv", 1), ("IPEA", 2), ("UN Digital Library", 0),
    ]
    sizes = {3: 84, 2: 54, 1: 38, 0: 30}
    tints = ["#6EC2E1", "#C4CA86", "#E7DF76", "#E2A888", "#DA6DAE"]
    words = "".join(
        f'<span style="font-size:{sizes[s]}px;font-weight:{800 if s >= 2 else 600};color:{tints[i % 5] if s == 3 else ("#F0F0F2" if s == 2 else "#DADADA")};text-transform:uppercase;letter-spacing:.01em;margin:0 22px 10px 0;line-height:1.05">{n}</span>'
        for i, (n, s) in enumerate(bases)
    )
    assert len(bases) == 27
    return feed("night", f"""
<div class="abs" style="left:88px;right:88px;top:76px;display:flex;justify-content:space-between;align-items:center">{lockup(True, 44)}<span class="mono" style="font-size:24px;color:#DADADA">Cartograph</span></div>
<div class="abs" style="left:88px;right:88px;top:170px">{tape(12)}</div>
<div class="abs" style="left:88px;right:70px;top:220px;display:flex;flex-wrap:wrap;align-items:baseline">{words}</div>
<div class="abs" style="left:88px;right:88px;top:960px;display:flex;align-items:flex-end;gap:30px">
  <span class="h" style="font-size:200px;color:{IVORY};letter-spacing:-.02em;line-height:.8">27</span>
  <span class="h" style="font-size:50px;color:{IVORY};line-height:1.05;padding-bottom:4px">bases abertas<br>numa busca só</span>
</div>
<div class="abs mono" style="left:88px;right:88px;bottom:64px;font-size:24px;color:#8F9397;display:flex;justify-content:space-between"><span>Grátis · sem cadastro</span><span style="color:{IVORY}">cartographsearch.com</span></div>
""")


PIECES = {
    "opcao-01-orientador": op1,
    "opcao-02-triagem-cega": op2,
    "opcao-03-busca-citacoes": op3,
    "opcao-04-proxy-chaves": op4,
    "opcao-05-quatro-linguas": op5,
    "opcao-06-checklist-tcc": op6,
    "opcao-07-abnt-tipografico": op7,
    "opcao-08-poster-27-bases": op8,
}


def shoot(name, fn):
    OUT_HTML.mkdir(exist_ok=True)
    src = OUT_HTML / f"{name}.html"
    src.write_text(fn())
    dst = ROOT / f"{name}.png"
    subprocess.run([
        CHROME, "--headless=new", "--hide-scrollbars", "--disable-gpu",
        "--allow-file-access-from-files", "--window-size=1080,1350",
        "--force-device-scale-factor=1", "--virtual-time-budget=8000",
        f"--screenshot={dst}", src.as_uri(),
    ], check=True, capture_output=True)
    print(dst.name)


if __name__ == "__main__":
    only = sys.argv[1:]
    for name, fn in PIECES.items():
        if not only or any(o in name for o in only):
            shoot(name, fn)

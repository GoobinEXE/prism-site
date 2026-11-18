import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
V3 = ROOT.parent
sys.path.insert(0, str(V3 / "feed-celular"))
import build_celular as bc

base = bc.base
CY, OL, YE, OR, MG = base.BANDS
IVORY, INK = base.IVORY, base.INK

THEMES = {
    "night": ("night", IVORY, "#DADADA", "#6EC2E1"),
    "ivory": ("ivory", INK, "#1F232B", "#005F85"),
}


def bg(color):
    if color in THEMES:
        return THEMES[color]
    return ("", INK, INK, INK)


def shell(color, inner):
    cls, *_ = bg(color)
    fill = "" if color in THEMES else f'<div class="abs" style="inset:0;background:{color}"></div>'
    return base.story(cls, fill + inner)


def head(color):
    dark = color == "night"
    return f'<div class="abs" style="left:88px;top:270px">{base.lockup(dark, 48)}</div>'


def link_bar(top=1440):
    return (
        f'<div class="abs" style="left:88px;right:88px;top:{top}px;background:{INK};color:{IVORY};'
        f'padding:26px 32px;font-size:36px;font-weight:600;display:flex;justify-content:space-between;align-items:center">'
        f'<span>cartographsearch.com</span><span class="mono" style="font-size:20px;color:#6EC2E1">Adesivo de link</span></div>'
    )


def bastidor(color, kicker, title, body, img=None, pill=None, link=False, title_size=102, body_top=980):
    _, t, b, k = bg(color)
    pic = ""
    if img == "celular":
        pic = f'<div class="abs" style="right:88px;top:980px">{bc.phone(240, "#1A1C1F" if color == "night" else INK)}</div>'
    foot = ""
    if link:
        foot = link_bar(1440)
    elif pill:
        pill_bg = "#141820" if color == "night" else INK
        foot = f'<div class="abs mono" style="left:88px;right:88px;top:1440px;background:{pill_bg};color:{IVORY};padding:26px 30px;font-size:24px;text-align:center">{pill}</div>'
    return shell(color, f"""
{head(color)}
<div class="abs mono" style="left:88px;top:400px;font-size:30px;color:{k}">{kicker}</div>
<div class="abs h" style="left:88px;right:88px;top:450px;font-size:{title_size}px;line-height:1.02;color:{t}">{title}</div>
<div class="abs" style="left:88px;right:{'410px' if img else '88px'};top:{body_top}px;font-size:42px;line-height:1.34;color:{b}">{body}</div>
{pic}
{foot}
""")


def sticker(color, kicker, question, kind, options=None, sub="", link=False, title_size=94):
    _, t, b, k = bg(color)
    slot_bg = "#1A1C1F" if color == "night" else ("#EAE3D6" if color == "ivory" else IVORY)
    slot_fg = "#DADADA" if color == "night" else "#4A515E"
    hint = {"enquete": "Adesivo de enquete aqui", "pergunta": "Caixa de pergunta aqui"}[kind]
    opts = ""
    if options:
        opts = f'<div class="mono" style="font-size:24px;color:{slot_fg};margin-top:16px">Opções: {" · ".join(options)}</div>'
    sub_html = f'<div class="abs" style="left:88px;right:88px;top:930px;font-size:38px;line-height:1.32;color:{b}">{sub}</div>' if sub else ""
    slot_top = 1090 if sub else 1010
    slot_h = 310 if link else 380
    tail = link_bar(1450) if link else ""
    return shell(color, f"""
{head(color)}
<div class="abs mono" style="left:88px;top:400px;font-size:30px;color:{k}">{kicker}</div>
<div class="abs h" style="left:88px;right:88px;top:450px;font-size:{title_size}px;line-height:1.02;color:{t}">{question}</div>
{sub_html}
<div class="abs" style="left:88px;right:88px;top:{slot_top}px;height:{slot_h}px;background:{slot_bg};display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:2px">
  <div class="mono" style="font-size:28px;color:{slot_fg}">{hint}</div>{opts}
</div>
{tail}
""")


def cards_story(color, kicker, title, items, body="", link=True, title_size=88):
    _, t, b, k = bg(color)
    card_bg = "#141820" if color == "night" else INK
    chips = "".join(
        f'<div style="background:{card_bg};color:{IVORY};padding:22px 26px;font-size:34px;font-weight:600;display:flex;align-items:center;gap:18px">'
        f'<span style="width:18px;height:18px;background:{c};flex-shrink:0"></span><span>{label}</span></div>'
        for label, c in items
    )
    body_html = f'<div class="abs" style="left:88px;right:88px;top:1270px;font-size:36px;line-height:1.32;color:{b}">{body}</div>' if body else ""
    return shell(color, f"""
{head(color)}
<div class="abs mono" style="left:88px;top:400px;font-size:30px;color:{k}">{kicker}</div>
<div class="abs h" style="left:88px;right:88px;top:450px;font-size:{title_size}px;line-height:1.02;color:{t}">{title}</div>
<div class="abs" style="left:88px;right:88px;top:830px;display:flex;flex-direction:column;gap:14px">{chips}</div>
{body_html}
{link_bar(1450) if link else ""}
""")


def code_story(color, kicker, title, code, body, title_size=90):
    _, t, b, k = bg(color)
    return shell(color, f"""
{head(color)}
<div class="abs mono" style="left:88px;top:400px;font-size:30px;color:{k}">{kicker}</div>
<div class="abs h" style="left:88px;right:88px;top:450px;font-size:{title_size}px;line-height:1.02;color:{t}">{title}</div>
<div class="abs" style="left:88px;right:88px;top:860px;background:#141820;padding:34px 36px;font-family:'JetBrains Mono',monospace;font-size:32px;line-height:1.6;color:{IVORY}">{code}</div>
<div class="abs" style="left:88px;right:88px;top:1190px;font-size:40px;line-height:1.34;color:{b}">{body}</div>
""")


def chips_story(color, kicker, title, items, body="", link=True, title_size=88):
    _, t, b, k = bg(color)
    chip_bg = "#141820" if color == "night" else INK
    grid = "".join(
        f'<span style="background:{chip_bg};color:{IVORY};padding:18px 24px;font-size:32px;font-weight:600">{x}</span>'
        for x in items
    )
    body_html = f'<div class="abs" style="left:88px;right:88px;top:1210px;font-size:38px;line-height:1.34;color:{b}">{body}</div>' if body else ""
    return shell(color, f"""
{head(color)}
<div class="abs mono" style="left:88px;top:400px;font-size:30px;color:{k}">{kicker}</div>
<div class="abs h" style="left:88px;right:88px;top:450px;font-size:{title_size}px;line-height:1.02;color:{t}">{title}</div>
<div class="abs" style="left:88px;right:88px;top:830px;display:flex;flex-wrap:wrap;gap:14px">{grid}</div>
{body_html}
{link_bar(1450) if link else ""}
""")


FRAMES = {
    "lancamento": [
        lambda: sticker("ivory", "Novo no Prism", "Você ainda pesquisa artigo site por site?", "enquete", ["Sim, infelizmente", "Quero parar"], sub="Colocamos o Cartograph no ar para você parar de repetir a mesma busca em várias abas.", title_size=88),
        lambda: bastidor("night", "Como funciona", "Uma busca em 27 bases ao mesmo tempo", "Você digita o tema uma vez só e o Cartograph consulta OpenAlex, PubMed, arXiv, Oasisbr e outras 23 fontes, já removendo os repetidos.", pill="Gratuito · sem cadastro · no navegador", title_size=90),
        lambda: sticker(YE, "Para TCC, mestrado e pós", "Referências em ABNT, APA e PRISMA 2020", "pergunta", sub="Qual base científica você mais usa hoje?", title_size=86),
        lambda: cards_story(CY, "Já está no ar", "Teste o Cartograph direto no navegador", [("27 bases abertas em paralelo", YE), ("Remoção automática de duplicados", MG), ("Exportação em ABNT, APA e BibTeX", IVORY)], body="Gratuito e sem precisar criar conta."),
    ],
    "seg": [
        lambda: bastidor("night", "Rotina de pesquisa", "Quantas abas você abre para achar um artigo?", "Entre OpenAlex, PubMed, arXiv e SciELO, muita gente repete os mesmos termos dezenas de vezes até montar a primeira lista.", title_size=88),
        lambda: sticker(YE, "Enquete rápida", "Quantas abas você costuma abrir numa busca?", "enquete", ["Até 5 abas", "Mais de 10"]),
        lambda: bastidor(CY, "Atalho no navegador", "Uma barra de busca para todas as bases", "No Cartograph, você escreve a pesquisa uma única vez e as 27 bases respondem juntas, sem repetir o mesmo artigo.", link=True, title_size=90),
    ],
    "ter": [
        lambda: bastidor("ivory", "Além das 27 abertas", "Você tem acesso pago pela universidade?", "Além das 27 bases gratuitas, dá para entrar usando o proxy da sua instituição ou conectar a sua chave da Scopus e da IEEE Xplore.", title_size=90),
        lambda: sticker(OL, "Pergunta", "Qual base científica não pode faltar na sua pesquisa?", "pergunta", title_size=88),
        lambda: chips_story("night", "Fontes com chave", "Tudo entra na mesma busca", ["Scopus", "ScienceDirect", "IEEE Xplore", "Springer Nature", "The Lens", "Fed in Print", "GovInfo"], body="E você ainda consulta um catálogo com 128 portais acadêmicos."),
    ],
    "qua": [
        lambda: bastidor("night", "Vida na pós", "\"O capítulo 2 pede uma revisão sistemática.\"", "Quando o orientador pede fluxograma PRISMA e dois revisores, o trabalho trava se você tentar controlar tudo em planilhas soltas.", title_size=84),
        lambda: sticker(MG, "Enquete", "Seu orientador já pediu uma revisão sistemática?", "enquete", ["Já pediu", "Ainda não"], title_size=90),
        lambda: bastidor("ivory", "Triagem em dupla", "Cada revisor vota sem ver a escolha do outro", "No final da triagem, o Cartograph calcula o kappa de Cohen sozinho e separa apenas os empates para vocês decidirem juntos.", pill="PRISMA 2020 pronto em SVG · cartographsearch.com", title_size=86),
    ],
    "qui": [
        lambda: bastidor("ivory", "Dica de pesquisa", "Não perca artigos por causa do idioma", "Pesquisar só em português deixa a maior parte da literatura de fora. Você pode combinar os dois idiomas na mesma consulta.", title_size=90),
        lambda: code_story("night", "Exemplo prático", "Monte a lógica sem decorar sintaxe", '("saúde mental" <b style="color:#6EC2E1">OR</b> "mental health")<br><b style="color:#6EC2E1">AND</b> adolescentes <b style="color:#6EC2E1">NOT</b> editorial', "No Cartograph, você escreve em português e o sistema já sugere o equivalente em inglês e os descritores MeSH."),
        lambda: sticker(OR, "Pergunta", "Em qual etapa da revisão você costuma travar?", "pergunta", title_size=92),
    ],
    "sex": [
        lambda: bastidor("night", "Pesquisa em movimento", "A busca também cabe no celular", "Com as abas Bases, Artigos e Biblioteca embaixo, dá para adiantar a leitura de onde você estiver.", img="celular", title_size=94),
        lambda: sticker(CY, "Enquete", "Onde você costuma pesquisar mais artigos?", "enquete", ["No celular", "No computador"], title_size=92),
        lambda: bastidor(YE, "Acesso aberto", "O link do PDF aberto vem junto na lista", "Quando existe uma versão gratuita disponível, o Cartograph puxa o link pelo Unpaywall para você ler direto.", link=True, title_size=88),
    ],
    "sab": [
        lambda: bastidor("night", "Bastidores do Prism", "Por que fizemos o Cartograph gratuito", "Construímos a ferramenta que a gente gostaria de ter usado para pesquisar em dezenas de bases e fechar as referências sem pagar assinatura.", title_size=90),
        lambda: sticker(YE, "Construindo junto", "O que você gostaria de ver no Cartograph?", "pergunta", title_size=90),
        lambda: bastidor(OL, "Aberto para teste", "Sem cadastro e em quatro idiomas", "Você pode usar em português, inglês, espanhol ou francês, e ainda salvar um backup completo da sua pesquisa em JSON.", link=True, title_size=92),
    ],
    "dom": [
        lambda: bastidor("ivory", "Hora de citar", "Chega de formatar ABNT de madrugada", "Depois de selecionar os artigos na sua biblioteca, você escolhe o padrão da banca e exporta a lista já formatada.", title_size=90),
        lambda: chips_story("night", "Formatos de exportação", "Leve para onde você escreve", ["ABNT NBR 6023", "APA 7", "BibTeX", "Matriz CSV (Excel)", "Backup JSON"], body="Também importa arquivos BibTeX e RIS de pesquisas que você já começou.", link=False),
        lambda: sticker(CY, "Feche suas referências", "Qual norma você usa no seu trabalho?", "enquete", ["ABNT", "APA / BibTeX"], link=True, title_size=88),
    ],
}

if __name__ == "__main__":
    only = sys.argv[1:]
    for group, frames in FRAMES.items():
        prefix = "lancamento" if group == "lancamento" else f"dia-{group}"
        for i, fn in enumerate(frames, 1):
            name = f"{prefix}-{i:02d}"
            if only and name not in only and group not in only:
                continue
            bc.shoot(ROOT / f"{name}.png", fn(), 1080, 1920)

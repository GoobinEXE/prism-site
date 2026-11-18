import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent
POSTS = ROOT.parents[1]
sys.path.insert(0, str(POSTS / "cartograph-v2/feed-stories"))
import build_feed_stories as base

CHROME = base.CHROME
CY, OL, YE, OR, MG = base.BANDS
NIGHT, IVORY, INK = base.NIGHT, base.IVORY, base.INK
REF = ROOT / "_ref"
DESK = (REF / "desktop-1440.png").as_uri()
CEL = (REF / "celular-390.png").as_uri()


def phone(w, frame=INK):
    h = round(w * 844 / 390)
    return (
        f'<div style="background:{frame};padding:16px;border-radius:52px;width:{w + 32}px">'
        f'<div style="width:{w}px;height:{h}px;border-radius:38px;overflow:hidden;background:#fff">'
        f'<img src="{CEL}" style="width:100%;height:100%;display:block"></div></div>'
    )


def desktop(w, frame=INK):
    h = round(w * 900 / 1440)
    return (
        f'<div style="background:{frame};padding:14px 14px 30px;border-radius:4px;width:{w + 28}px">'
        f'<img src="{DESK}" style="width:{w}px;height:{h}px;display:block"></div>'
    )


def chip(color, text, size=24):
    return f'<div class="mono" style="background:{color};color:{INK};font-size:{size}px;padding:14px 20px;margin-top:12px;border-radius:2px;line-height:1.25">{text}</div>'


def post_a():
    return base.feed("ivory", f"""
<div class="abs" style="left:88px;top:72px">{base.lockup(False, 48)}</div>
<div class="abs mono" style="right:88px;top:84px;font-size:24px;color:#005F85">Cartograph · novidade</div>
<div class="abs h" style="left:88px;right:88px;top:160px;font-size:84px;line-height:1;white-space:nowrap">A busca agora<br>cabe no celular</div>
<div class="abs mono" style="left:88px;top:420px;font-size:26px;color:#963D0A">Antes · no computador</div>
<div class="abs" style="left:88px;top:466px">{desktop(560)}</div>
<div class="abs mono" style="left:676px;top:420px;font-size:26px;color:#005F85">Depois · no celular</div>
<div class="abs" style="left:676px;top:466px">{phone(284)}</div>
<div class="abs" style="left:88px;width:560px;top:850px">
  {chip(CY, "Abas na barra inferior:<br>Bases, Artigos e Biblioteca", size=24)}
  {chip(YE, "Filtros que sobem em painel", size=24)}
  {chip(OL, "Idiomas: PT, EN, ES e FR", size=24)}
</div>
<div class="abs mono" style="left:88px;right:88px;bottom:62px;font-size:24px;color:#1F232B;display:flex;justify-content:space-between"><span>Gratuito e sem cadastro.</span><span>cartographsearch.com</span></div>
""")


def post_b():
    return base.feed("night", f"""
<div class="abs" style="left:0;right:0;top:0">{base.tape_row(16)}</div>
<div class="abs" style="left:88px;top:80px">{base.lockup(True, 48)}</div>
<div class="abs h" style="left:88px;width:470px;top:200px;font-size:70px;color:{IVORY};line-height:1.02">Agora também no celular</div>
<div class="abs" style="left:88px;width:470px;top:480px">
  <div class="mono" style="font-size:24px;color:#8F9397">Antes</div>
  <div style="font-size:34px;color:#DADADA;margin-top:12px;line-height:1.3">Os filtros ficavam na lateral de uma tela larga, pensada só para o computador.</div>
  <div class="mono" style="font-size:24px;color:#6EC2E1;margin-top:44px">Depois</div>
  <div style="font-size:34px;color:#F0F0F2;margin-top:12px;line-height:1.3">Bases, Artigos e Biblioteca ficam em abas embaixo, enquanto os filtros sobem em um painel.</div>
</div>
<div class="abs" style="left:88px;width:470px;top:1010px">{desktop(300, '#1A1C1F')}</div>
<div class="abs" style="right:88px;top:200px">{phone(380, '#1A1C1F')}</div>
<div class="abs mono" style="left:88px;right:88px;bottom:62px;font-size:28px;color:{IVORY};display:flex;justify-content:space-between"><span>cartographsearch.com</span><span style="color:#8F9397">Link na bio</span></div>
""")


def shoot(out, html, w, h):
    hdir = out.parent / "_html"
    hdir.mkdir(exist_ok=True)
    hp = hdir / (out.stem + ".html")
    hp.write_text(html)
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", f"--window-size={w},{h}",
                    "--virtual-time-budget=4000", f"--screenshot={out}", hp.as_uri()],
                   check=True, capture_output=True)


if __name__ == "__main__":
    shoot(ROOT / "post-celular-a.png", post_a(), 1080, 1350)
    shoot(ROOT / "post-celular-b.png", post_b(), 1080, 1350)

import random, struct, sys, zlib

SIZE = 250
PROFILE = {-3: 7968, -2: 8348, -1: 11686, 0: 10435, 1: 9402, 2: 7010, 3: 3619, 4: 2430, 5: 1032, 6: 386, 7: 148, 8: 36}
SURFACES = {
    "prism-bg": "F2ECE1",
    "prism-glass": "EAE3D6",
    "prism-elevated": "F6F2EB",
    "dark-room-bg": "090A0C",
    "dark-room-glass": "141820",
    "dark-room-elevated": "1A1C1F",
}


def chunk(kind, data):
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))


def tile(path, hexc, seed):
    random.seed(seed)
    bg = [int(hexc[i:i + 2], 16) for i in (0, 2, 4)]
    deltas = [d for d, n in PROFILE.items() for _ in range(n)]
    drift = sum(deltas)
    zeros = [i for i, d in enumerate(deltas) if d == 0]
    for i in zeros[:abs(drift)]:
        deltas[i] = -1 if drift > 0 else 1
    deltas = [max(-min(bg), min(255 - max(bg), d)) for d in deltas]
    random.shuffle(deltas)
    px = [bytes(c + d for c in bg) for d in deltas]
    rows = b"".join(b"\x00" + b"".join(px[y * SIZE:(y + 1) * SIZE]) for y in range(SIZE))
    header = struct.pack(">IIBBBBB", SIZE, SIZE, 8, 2, 0, 0, 0)
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"sRGB", b"\x00")
                + chunk(b"IDAT", zlib.compress(rows, 9)) + chunk(b"IEND", b""))
    means = [round(sum(p[k] for p in px) / len(px), 3) for k in range(3)]
    print(path, hexc, "mean", means)


out = sys.argv[1] if len(sys.argv) > 1 else "public/assets/brand/overlays"
for i, (name, hexc) in enumerate(SURFACES.items()):
    tile(f"{out}/grain-{name}.png", hexc, 7 + i)

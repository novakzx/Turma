#!/usr/bin/env python3
"""Gera favicon.ico + ícones PNG da marca Turma+ sem dependências externas.
Desenho: squircle violeta em gradiente + "+" branco + ponto laranja."""
import os
import struct
import zlib

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")

TOP = (139, 123, 251)   # #8B7BFB
BOT = (76, 54, 199)     # #4C36C7
WHITE = (255, 255, 255)
ORANGE = (253, 186, 44)  # #FDBA2C


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def render(size: int) -> bytes:
    """RGBA PNG rasterizado do logo."""
    s = size
    radius = 0.31 * s
    cx = cy = s / 2
    half_len = 0.20 * s
    half_th = 0.058 * s
    dot_c = (0.74 * s, 0.26 * s)
    dot_r = 0.09 * s

    rows = []
    for y in range(s):
        row = bytearray()
        for x in range(s):
            px, py = x + 0.5, y + 0.5
            # máscara do squircle (retângulo arredondado)
            dx = max(abs(px - cx) - (s / 2 - radius), 0)
            dy = max(abs(py - cy) - (s / 2 - radius), 0)
            inside = (dx * dx + dy * dy) <= radius * radius if (dx or dy) else True
            if not inside:
                row += bytes((0, 0, 0, 0))
                continue
            color = lerp(TOP, BOT, (px + py) / (2 * s))
            # ponto laranja
            if (px - dot_c[0]) ** 2 + (py - dot_c[1]) ** 2 <= dot_r * dot_r:
                color = ORANGE
            else:
                # "+" branco (distância a segmentos vert./horiz. com caps)
                dv = min(
                    max(abs(px - cx) - half_th, 0) ** 2
                    + max(abs(py - cy) - half_len, 0) ** 2,
                    max(abs(py - cy) - half_th, 0) ** 2
                    + max(abs(px - cx) - half_len, 0) ** 2,
                )
                if dv <= half_th * half_th:
                    color = WHITE
            row += bytes((color[0], color[1], color[2], 255))
        rows.append(bytes(row))

    raw = b"".join(b"\x00" + r for r in rows)

    def chunk(typ, data):
        c = struct.pack(">I", len(data)) + typ + data
        return c + struct.pack(">I", zlib.crc32(typ + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", s, s, 8, 6, 0, 0, 0)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def ico(png: bytes, size: int) -> bytes:
    w = 0 if size >= 256 else size
    entry = struct.pack("<BBBBHHII", w, w, 0, 0, 1, 32, len(png), 22)
    return struct.pack("<HHH", 0, 1, 1) + entry + png


os.makedirs(ROOT, exist_ok=True)
with open(os.path.join(ROOT, "favicon.ico"), "wb") as f:
    f.write(ico(render(32), 32))
with open(os.path.join(ROOT, "icon-180.png"), "wb") as f:
    f.write(render(180))
with open(os.path.join(ROOT, "icon-512.png"), "wb") as f:
    f.write(render(512))
print("ícones gerados: favicon.ico, icon-180.png, icon-512.png")

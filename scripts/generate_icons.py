import zlib
import struct
import math
import os

def write_png(filename, width, height, pixels):
    """
    pixels: list of rows, each row is a list of (r, g, b, a) tuples
    """
    raw_data = bytearray()
    for row in pixels:
        raw_data.append(0) # filter byte: None
        for r, g, b, a in row:
            raw_data.extend((r, g, b, a))

    def make_chunk(chunk_type, data):
        length = struct.pack('>I', len(data))
        crc = struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)
        return length + chunk_type + data + crc

    png_header = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0) # 8-bit RGBA
    ihdr_chunk = make_chunk(b'IHDR', ihdr_data)
    idat_chunk = make_chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend_chunk = make_chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png_header + ihdr_chunk + idat_chunk + iend_chunk)

def render_apex_icon(size, is_maskable=False):
    pixels = []
    center = size / 2.0
    scale = size / 512.0
    corner_radius = 110 * scale if not is_maskable else 0

    for y in range(size):
        row = []
        for x in range(size):
            # Check rounded corner if not maskable
            if not is_maskable:
                # distance to closest corner
                dx = max(0, abs(x - center) - (center - corner_radius))
                dy = max(0, abs(y - center) - (center - corner_radius))
                if dx * dx + dy * dy > corner_radius * corner_radius:
                    row.append((0, 0, 0, 0)) # transparent
                    continue

            # Background gradient: dark slate 950 to 900
            t_bg = (x + y) / (2.0 * size)
            bg_r = int(2 + t_bg * (15 - 2))
            bg_g = int(6 + t_bg * (23 - 6))
            bg_b = int(23 + t_bg * (42 - 23))

            # Normalize to 512x512 space
            nx = (x / scale)
            ny = (y / scale)

            # If maskable, scale inner content by 0.75
            if is_maskable:
                nx = 256 + (nx - 256) / 0.75
                ny = 256 + (ny - 256) / 0.75

            # Apex chevron triangle
            # Peak at (256, 120), bottom left (150, 270), bottom right (362, 270)
            in_chevron = False
            if 120 <= ny <= 270:
                half_w = (ny - 120) * 0.75
                if abs(nx - 256) <= half_w and abs(nx - 256) >= (half_w - 30):
                    in_chevron = True

            # Dumbbell bar in 45 deg angle
            # Center (256, 260). Rotate (nx, ny) by 45 deg:
            rx = (nx - 256) * math.cos(math.pi/4) - (ny - 260) * math.sin(math.pi/4)
            ry = (nx - 256) * math.sin(math.pi/4) + (ny - 260) * math.cos(math.pi/4)

            # Bar is along rx axis, ry between -16 and +16, rx between -100 and +100
            in_bar = False
            if abs(ry) <= 14 and abs(rx) <= 90:
                in_bar = True

            # Left plates (rx < -90): rx in [-140, -90], |ry| <= 55
            # Right plates (rx > 90): rx in [90, 140], |ry| <= 55
            in_plate_outer = False
            in_plate_inner = False
            if abs(rx) >= 95 and abs(rx) <= 112 and abs(ry) <= 55:
                in_plate_inner = True
            elif abs(rx) > 115 and abs(rx) <= 130 and abs(ry) <= 45:
                in_plate_outer = True

            # Composite pixel color
            if in_plate_inner or in_plate_outer:
                # Emerald green gradient
                row.append((16, 185, 129, 255))
            elif in_bar:
                # Silver/white barbell
                row.append((226, 232, 240, 255))
            elif in_chevron:
                # Subtle glowing emerald chevron
                cr = int(bg_r * 0.5 + 16 * 0.5)
                cg = int(bg_g * 0.5 + 185 * 0.5)
                cb = int(bg_b * 0.5 + 129 * 0.5)
                row.append((cr, cg, cb, 255))
            else:
                row.append((bg_r, bg_g, bg_b, 255))
        pixels.append(row)
    return pixels

os.makedirs('public', exist_ok=True)
print("Rendering 192x192...")
write_png('public/pwa-192x192.png', 192, 192, render_apex_icon(192, False))
print("Rendering 512x512...")
write_png('public/pwa-512x512.png', 512, 512, render_apex_icon(512, False))
print("Rendering 512x512 maskable...")
write_png('public/pwa-maskable-512x512.png', 512, 512, render_apex_icon(512, True))
print("Rendering apple-touch-icon 180x180...")
write_png('public/apple-touch-icon.png', 180, 180, render_apex_icon(180, False))
print("Rendering favicon 32x32...")
write_png('public/favicon.ico', 32, 32, render_apex_icon(32, False))
print("Icons successfully generated!")

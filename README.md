# Đảo Vai Văn Phòng

Cấu trúc phẳng (không thư mục con):
- index.html, style.css
- main.js: điều khiển màn hình
- data.js: nhiệm vụ, lời thoại, tuỳ chọn ngoại hình
- avatar.js: vẽ nhân vật
- state.js: trạng thái + lưu localStorage

Chạy thử: `python3 -m http.server` rồi mở localhost:8000 (module cần chạy qua server, không mở file trực tiếp).

## Phong cách đồ họa
Hoạt hình phẳng, viền xanh đen #1b2a41 dày 2.4, bóng đổ cứng 5px. Bảng màu: nền #cfdadd, xanh vách #3f6f73, giấy nhớ #ffe45e, đỏ #d6322f, mực #1b2a41. Font: Be Vietnam Pro.

## Cấu trúc
- scene.js: cảnh văn phòng (giờ trong game quyết định cửa sổ ngày/đêm, đồng hồ, chồng giấy)
- avatar.js: nhân vật nhiều lớp, có hoạt ảnh (thở, chớp mắt, cúi chào, gục, khóc) qua CSS

## Ngày làm việc (v0.8)
Mỗi việc tốn 1–2 giờ trong ngày 8h–17h. Hết ngày sang hôm sau; 5 ngày là 1 tuần. Mỗi thứ có hiệu ứng riêng (DAYS) và sự kiện theo giờ (SCHEDULE) trong data.js.

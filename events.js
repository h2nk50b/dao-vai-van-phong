// Kho sự kiện ngẫu nhiên. Thêm sự kiện mới chỉ cần thêm một khối vào mảng này.
// when: điều kiện xuất hiện. wd = danh sách thứ (0=Hai ... 4=Sáu); các khoá còn lại là khoảng [min,max]:
//   h (giờ), day, loy (trung thành), con (lương tâm), bud (ngân sách), pow, rej, en, mad.
// once: chỉ xuất hiện một lần. ch: các lựa chọn [nhãn, hiệu ứng, kết quả]. {boss} = tên sếp cũ.
// Hiệu ứng: en, mad, loy, con (cộng/trừ, giữ trong 0–100), pow, bud (đồng).
export const EVENTS=[
{id:'photo',t:'Máy photo kẹt giấy',x:'{boss} nhìn máy photo đang bốc khói rồi nhìn bạn: "Em có nên gọi thợ không ạ?"',ch:[
 ['Bắt tự sửa bằng tay',{mad:8,en:-8,pow:8,con:-2},'{boss} chui nửa người vào máy photo. Máy chạy lại, anh ấy thì chưa.'],
 ['Gọi thợ (800.000đ)',{bud:-800000,con:2,loy:3},'Thợ sửa trong 5 phút. {boss} nhìn bạn bằng ánh mắt lạ: biết ơn.']]},
{id:'lunch',t:'Giờ ăn trưa',x:'{boss} ngồi ăn cơm hộp một mình ở cuối phòng.',when:{h:[11,13]},ch:[
 ['Gọi lên bóp vai cho bạn',{mad:8,pow:10,con:-3},'{boss} bóp vai bạn bằng tay còn dính nước mắm.'],
 ['Để anh ấy ăn thong thả',{en:15,loy:5,con:3},'{boss} ăn hết hạt cơm cuối cùng và suýt khóc vì xúc động.'],
 ['Mượn suất cơm của anh ấy',{en:-6,mad:6,pow:6,con:-4},'Bạn "nếm thử" hết cả phần thịt. {boss} ăn cơm trắng với nước mắt.']]},
{id:'late',t:'Đi làm trễ 3 phút',x:'{boss} đến trễ 3 phút vì xe hỏng giữa đường.',when:{wd:[0,1,2]},ch:[
 ['Phạt 200.000đ',{bud:200000,loy:-6,mad:6,con:-2},'Quỹ phòng có thêm tiền. {boss} có thêm lý do để nhìn bạn.'],
 ['Bỏ qua lần này',{loy:5,con:3},'{boss} cúi đầu cảm ơn đến 3 lần.']]},
{id:'badmouth',t:'Nói xấu sau lưng',x:'Có người nghe thấy {boss} nói xấu bạn trong nhà vệ sinh.',when:{loy:[0,35]},ch:[
 ['Gọi vào phòng nói chuyện riêng',{mad:10,loy:-5,pow:12},'{boss} bước vào, mồ hôi nhỏ giọt. Bạn chỉ nói: "Nghe nói anh hay hát trong nhà vệ sinh?"'],
 ['Giả vờ không biết',{loy:2,con:2},'Bạn mỉm cười thật tươi. {boss} sợ hơn cả bị mắng.'],
 ['Phát loa đọc to cho cả công ty nghe',{pow:20,mad:15,loy:-12,con:-6},'Cả tầng im lặng 10 giây. Rồi có người vỗ tay (không rõ cho ai).']]},
{id:'raise',t:'Xin tăng lương',x:'{boss} ngập ngừng gõ cửa: "Em xin phép... tăng lương 5% ạ."',once:true,when:{pow:[120,99999]},ch:[
 ['Từ chối: "kinh tế khó khăn"',{mad:8,loy:-6,pow:10},'{boss} gật đầu rất chậm. Có tiếng thở dài vọng ra từ cả phòng.'],
 ['Tăng 5% (chi 500.000đ)',{bud:-500000,loy:12,con:5,mad:-10},'{boss} suýt ôm bạn. Bạn lùi lại đúng lúc.'],
 ['Hứa tăng "sau Tết"',{loy:2,mad:-5,con:-4},'{boss} ghi vào sổ: "Sau Tết năm nào?".']]},
{id:'sick',t:'Sốt nhẹ nhưng vẫn đi làm',x:'{boss} ho khan, mặt đỏ bừng nhưng vẫn ngồi thẳng lưng.',when:{en:[0,35]},ch:[
 ['Cho về nghỉ',{en:25,loy:8,con:6,pow:-10},'{boss} nghỉ nửa ngày. Hôm sau mang cho bạn hộp bánh.'],
 ['Bắt làm tiếp',{en:-12,mad:10,pow:12,con:-6},'{boss} gật đầu, ho thêm hai tiếng cho có không khí.'],
 ['Đưa thuốc hạ sốt rồi bắt làm tiếp',{en:-4,mad:4,pow:6,con:-2},'Quan tâm: có. Cho nghỉ: không.']]},
{id:'client',t:'Khách gọi hỏi {boss}',x:'Đối tác gọi điện, hỏi "anh Hùng... ơ... {boss} còn làm ở đó không?"',ch:[
 ['Nói anh ấy đi vắng dài hạn',{con:-3,pow:8},'Đầu dây bên kia im lặng rất lâu. {boss} nghe thấy hết.'],
 ['Chuyển máy cho anh ấy',{loy:5,con:2,mad:-5},'{boss} nói chuyện 3 phút với giọng tự hào đã lâu không có.']]},
{id:'lowbudget',t:'Quỹ phòng gần cạn',x:'Kế toán đặt tờ bảng kê lên bàn bạn mà không nói gì.',when:{bud:[-99999999,1500000]},ch:[
 ['Cắt tiền trà nước',{bud:500000,mad:8,loy:-5},'Cả phòng uống nước lọc và nhìn bạn rất lâu.'],
 ['Bán bớt bàn ghế cũ',{bud:1200000,mad:10,loy:-6,con:-3},'Ghế của {boss} nằm trong danh sách bán. Anh ấy ngồi xổm làm việc.'],
 ['Ứng tiền túi bù vào',{bud:1000000,pow:-15,con:6},'Bạn thở dài. Kế toán chớp mắt: có vẻ chưa ai làm vậy bao giờ.']]},
{id:'vending',t:'Máy bán nước nuốt tiền',x:'Máy bán nước ngoài hành lang nuốt 10.000đ của bạn mà không nhả nước.',when:{h:[13,16]},ch:[
 ['Cử {boss} đi đòi máy',{en:-6,mad:6,pow:6},'{boss} nói chuyện với cái máy 10 phút. Máy nhả ra một lon nước chanh.'],
 ['Tự đá máy',{pow:-5,mad:-3},'Máy nhả nước. Bạn tự hào. Cả phòng đã thấy tất cả.']]},
{id:'plant',t:'Chậu cây héo',x:'Cả phòng đồn chậu cây héo là do {boss} quên tưới.',ch:[
 ['Phạt anh ấy trồng lại cả vườn',{mad:8,pow:10,con:-2},'{boss} cầm xẻng trong bộ vest, trông rất... có chuyên môn.'],
 ['Cùng tưới cây',{loy:6,con:4,mad:-8},'Hai người đứng cạnh chậu cây héo. Có cảm giác như một cuộc hòa giải lặng lẽ.']]},
{id:'report10',t:'Báo cáo gấp',x:'Bạn vừa nhớ ra mình chưa đòi {boss} nộp báo cáo nào hôm nay.',when:{wd:[3]},ch:[
 ['Giao viết báo cáo 10 trang',{en:-10,mad:8,pow:12,con:-3},'{boss} gõ đến 3 giờ chiều. Báo cáo chưa ai đọc.'],
 ['Nói đùa là "test phản xạ"',{mad:-4,loy:2,con:1},'{boss} cười gượng: nụ cười của người nhẹ nhõm và hơi muốn đánh bạn.']]},
{id:'intern',t:'Thực tập sinh mới',x:'Thực tập sinh vào làm, cứ gọi {boss} là "anh nổi tiếng một thời".',once:true,ch:[
 ['Cho thực tập sinh ra lệnh cho {boss}',{mad:12,pow:15,con:-5,loy:-4},'Thực tập sinh sai {boss} đi mua cà phê. Anh ấy đi mua. Cả phòng nín thở.'],
 ['Phân thực tập sinh đi pha cà phê',{mad:-5,loy:4,con:2},'{boss} nhìn thực tập sinh bằng ánh mắt của người nhìn lại chính mình.']]},
{id:'blackout',t:'Mất điện',x:'Cả tầng tối om. Mọi người quay sang nhìn bạn.',ch:[
 ['Bắt {boss} cầm đèn pin đứng cả buổi',{en:-8,mad:8,pow:10},'{boss} soi sáng cả phòng. Cuộc đời anh ấy vừa có ý nghĩa mới.'],
 ['Cho cả phòng nghỉ sớm 1 tiếng',{loy:8,con:5,pow:-8},'Tiếng reo vang cả tầng. Bạn bỗng được nhớ tên.']]},
{id:'family',t:'Điện thoại từ gia đình',x:'Con gái {boss} gọi đến hỏi: "Khi nào bố về ạ?"',ch:[
 ['Cho anh ấy nghe máy 1 phút',{mad:-12,loy:6,con:5},'{boss} nói "bố sắp về" bằng giọng nghẹn. Cả phòng quay mặt đi.'],
 ['Nói "bố đang bận làm việc vui lắm"',{mad:10,con:-4,pow:5},'Đầu dây bên kia im lặng. Bạn cảm thấy một tia lạnh sống lưng.']]},
{id:'parking',t:'Chỗ đỗ xe',x:'Xe máy của {boss} đỗ nhầm vào chỗ để xe giám đốc.',when:{h:[8,10]},ch:[
 ['Phạt bắt rửa xe cho bạn',{en:-8,mad:8,pow:10,con:-2},'{boss} rửa xe bạn bóng loáng hơn cả xe của anh ấy.'],
 ['Cho hẳn chỗ đỗ ngày mai',{loy:5,con:3},'{boss} đứng nhìn chỗ đỗ như nhìn một món quà từ trời.']]},
{id:'rumor',t:'Tiếng đồn "bạo chúa"',x:'Cả công ty đồn bạn là "bạo chúa văn phòng".',when:{con:[0,40]},ch:[
 ['Tổ chức team building xin lỗi (1.000.000đ)',{bud:-1000000,con:10,loy:8},'Cả phòng ăn bún đậu mắm tôm. Mọi người tạm quên mọi thứ.'],
 ['Đe dọa người tung tin',{pow:15,con:-6,loy:-5},'Bạn dọa xong thì cả phòng im như tờ. Tiếng đồn chỉ nhỏ hơn.'],
 ['Mặc kệ',{pow:3},'Tiếng đồn lớn dần. Bạn nghe thấy có người gọi mình là "ngài".']]},
{id:'selfie',t:'Ảnh chụp lén',x:'Có người chụp ảnh {boss} ngủ gục trên bàn lúc 2 giờ chiều.',ch:[
 ['Dùng ảnh làm hình nền phòng họp',{mad:12,pow:15,con:-5},'Họp xong cả phòng nhớ hình nền hơn nội dung họp.'],
 ['Xóa ảnh và nhắc người chụp',{loy:6,con:4},'{boss} không bao giờ biết có tấm ảnh đó. Anh ấy ngủ ngon hơn.']]},
{id:'coffeemachine',t:'Mua máy pha cà phê?',x:'Phòng muốn mua một máy pha cà phê tự động.',once:true,ch:[
 ['Mua (2.000.000đ)',{bud:-2000000,en:10,loy:6,con:3},'{boss} thở phào: lần đầu tiên anh ấy không phải pha cà phê cho cả phòng.'],
 ['Không mua, {boss} pha thủ công',{mad:6,pow:8,con:-2},'{boss} pha cà phê bằng ca nhôm như năm 1998.']]},
{id:'karaoke',t:'Rủ đi hát karaoke',x:'Cả phòng rủ nhau đi hát sau giờ làm thứ Sáu.',when:{wd:[4],h:[15,17]},ch:[
 ['Cho {boss} đi nhưng bắt hát solo',{mad:6,pow:10,loy:4},'{boss} hát bài "Nỗi đau xót xa" hay đến nỗi cả phòng im.'],
 ['Mời anh ấy đi, bạn bao (600.000đ)',{bud:-600000,loy:12,con:6,mad:-10},'Cả phòng đồng thanh hát. {boss} khóc, bạn nói do khói thuốc.'],
 ['Bắt {boss} ở lại trực điện thoại',{mad:12,pow:15,loy:-6,con:-6},'Tiếng hát vọng đến tận chiều. {boss} ngồi nghe điện thoại không ai gọi.']]},
{id:'letter',t:'Lá thư bỏ quên',x:'{boss} để quên một lá thư viết dở trên bàn.',when:{mad:[60,100]},ch:[
 ['Đọc lén',{pow:6,con:-4},'Thư viết: "Gửi bản thân năm xưa: đừng làm sếp." Có vết nước mắt.'],
 ['Gấp lại để nguyên',{con:4,loy:3},'Bạn đặt thư lại đúng chỗ. {boss} không bao giờ biết có người đã thấy.']]},
{id:'dream',t:'Giấc mơ của {boss}',x:'Sáng nay {boss} kể đêm qua mơ thấy mình lại làm sếp.',when:{h:[8,10]},ch:[
 ['Bảo anh ấy: "Tỉnh dậy đi"',{mad:6,pow:8,con:-1},'{boss} gật đầu, nhìn ra cửa sổ như nhìn một giấc mơ đã mất.'],
 ['Nghe tiếp',{mad:-6,loy:3,con:2},'Trong mơ {boss} cho cả phòng nghỉ phép 3 ngày. Cả phòng nhìn bạn đầy ẩn ý.']]},
{id:'badreview',t:'Bài đánh giá ẩn danh',x:'Trang đánh giá công ty xuất hiện bài mới: "Sếp mới không hề dễ thương."',when:{pow:[150,99999]},ch:[
 ['Truy tìm người viết',{pow:12,con:-5,loy:-6},'Bạn kiểm tra giờ đăng bài. Có 4 người nghi ngờ. Cả 4 đều đang cười.'],
 ['Đăng bình luận cảm ơn',{con:5,loy:4},'Bạn viết: "Cảm ơn góp ý." Cả phòng ngỡ ngàng: bạn biết cười?']]},
{id:'bonus',t:'Quỹ phòng dư tiền',x:'Quỹ phòng đang dư. Cả phòng nhìn bạn, nhìn quỹ rồi nhìn lại bạn.',when:{bud:[6000000,99999999]},ch:[
 ['Thưởng nóng 1.000.000đ cho {boss}',{bud:-1000000,loy:15,con:8,mad:-12},'{boss} cầm phong bì như cầm trứng. Mắt đỏ hoe.'],
 ['Thưởng cho bản thân',{bud:-1000000,pow:15,con:-8,loy:-6},'Bạn mua ghế massage mới. {boss} phải khiêng nó lên tầng 4.'],
 ['Giữ quỹ lại, tăng KPI',{pow:10,mad:6,con:-3},'KPI tăng 20%. Ngân sách không đổi. Mọi người vẫn đi làm (không hiểu sao).']]},
{id:'rain',t:'Mưa to',x:'Trời đổ mưa tầm tã. {boss} không có áo mưa.',ch:[
 ['Bắt đi giao tài liệu ngoài trời',{en:-12,mad:10,pow:12,con:-5},'{boss} đi giao tài liệu. Tài liệu ướt. {boss} ướt. Bạn khô.'],
 ['Cho mượn ô của bạn',{loy:6,con:4,pow:-4},'{boss} cầm ô cẩn thận như cầm bó hoa.']]},
{id:'birthday',t:'Sinh nhật {boss}',x:'Hôm nay là sinh nhật {boss}. Anh ấy không nói gì cả.',once:true,ch:[
 ['Giả vờ không biết',{pow:5,mad:8,con:-3},'{boss} ăn trưa một mình. Có một cây nến nhỏ trong túi áo.'],
 ['Tặng ổ bánh mì thịt (100.000đ)',{bud:-100000,loy:10,con:6,mad:-10},'{boss} ăn từng miếng và nhìn bạn như nhìn người thân mất tích lâu ngày.'],
 ['Bắt anh ấy tự mua bánh rồi hát chúc mừng bạn',{pow:15,mad:12,con:-6,loy:-6},'{boss} hát "Chúc mừng sinh nhật" nhầm tên. Bạn bắt hát lại.']]},
{id:'hr',t:'Thư từ phòng nhân sự',x:'Nhân sự gửi thư: đã nhận "nhiều đơn xin nghỉ việc không rõ lý do" từ phòng bạn.',when:{rej:[2,99999]},ch:[
 ['Nói đó là lỗi hệ thống',{con:-4,pow:5},'Nhân sự gõ máy rất lâu: "Hệ thống của chúng ta chưa bao giờ lỗi."'],
 ['Hẹn gặp nhân sự giải thích',{con:4,pow:-8,loy:2},'Bạn ngồi 40 phút trong phòng nhân sự. Họ không hỏi gì, chỉ ghi chép.']]},
{id:'dogcall',t:'Chó gọi video',x:'Con chó của bạn (đang ở Vũng Tàu) gọi video. Nó đang nhìn bạn đầy mong chờ.',once:true,ch:[
 ['Bắt {boss} chào chó',{mad:6,pow:8},'{boss} chào chó bằng giọng rất trịnh trọng. Chó sủa lại.'],
 ['Gập máy tính',{pow:2},'Bạn tắt máy. Chó vẫn ở Vũng Tàu. Cuộc đời tiếp tục.']]},
{id:'overtime',t:'Xin về đúng giờ',x:'Hôm nay deadline. {boss} xin về lúc 17h để đón con.',when:{wd:[3],h:[14,16]},ch:[
 ['Duyệt cho về sớm',{loy:10,con:8,pow:-12},'{boss} chạy ra cửa như chưa từng chạy. Cả phòng nhìn theo.'],
 ['Bắt ở lại tăng ca',{en:-10,mad:12,pow:15,loy:-8,con:-6},'{boss} gọi điện cho vợ: "Hôm nay anh về muộn." Giọng rất nhỏ.']]},
{id:'envelope',t:'Phong bì không tên',x:'Trên bàn bạn có một phong bì không tên, bên trong ghi đúng hai chữ: "Nghỉ việc."',once:true,when:{day:[4,99999]},ch:[
 ['Tìm ra chủ nhân',{pow:8,mad:4,con:-2},'Bạn so chữ viết cả buổi. Mười người nghi ngờ, không ai thừa nhận.'],
 ['Cất đi, coi như không thấy',{con:2},'Bạn cất vào ngăn kéo. Ngăn kéo đã có 3 cái như vậy.']]},
{id:'karma',t:'Giấc mơ lạ',x:'Đêm qua bạn mơ bị giao đi mua trà sữa lúc 3 giờ sáng.',when:{con:[0,25]},ch:[
 ['Xin lỗi {boss} vì mọi chuyện',{con:10,loy:6,mad:-10,pow:-10},'{boss} nhìn bạn kỹ: "Sếp có sao không ạ?" Cả hai cùng cười gượng.'],
 ['Chỉ là mơ thôi',{pow:5,con:-2},'Bạn tiếp tục như chưa có gì xảy ra. Tối đó lại mơ tiếp.']]},
{id:'tea',t:'Cốc trà ấm',x:'{boss} lặng lẽ đặt cốc trà ấm lên bàn bạn rồi quay đi.',when:{con:[70,100],loy:[60,100]},ch:[
 ['Uống và cảm ơn',{loy:6,mad:-8,en:6,con:3},'Trà thơm. Hai người cùng im lặng, và đó là điều tốt.'],
 ['Hỏi: "Anh bỏ gì vào đó?"',{loy:-4,pow:3},'{boss} nhìn bạn như nhìn một người xa lạ. Bạn thấy hơi tiếc.']]}
];

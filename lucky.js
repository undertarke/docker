
$(document).ready(function () {
    var value = 0;
    var countClicked = 0;
    var clicked = false;
    function getPosition(position) {
        // if (position <= 30) {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT NHÀ LẦU 4 TẦNG');
        // }
        // else if (position <= 90) {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHUYẾN DU LỊCH VŨNG TÀU');
        // }
        // else if (position <= 150) {
        //     $('.congratulation__note').text('CHÚC BẠN MAY MẮN LẦN SAU');
        // } else if (position <= 210) {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT THẺ CÀO 200K');
        // } else if (position <= 270) {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT THẺ CÀO 100K');
        // }
        // else if (position <= 330) {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHUYẾN DU LỊCH MIỀN TÂY');
        // }
        // else {
        //     $('.congratulation__note').text('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CĂN NHÀ LẦU 4 TẦNG');
        // }
        $('.congratulation__note').text('Hộp tô tượng và nụ hôn !');
        $('.popup').removeClass('active');
        $('.congratulation').fadeIn();
        clicked = false;
        countClicked = 0;
    }
    $('.wheel__button').click(function () {
        if (clicked == true) {
            countClicked++;
            if (countClicked <= 2) {
                $('.popup__note').text("NGỪNG PHÁ ĐI MEN!");
            }
            else if (countClicked <= 4)
                $('.popup__note').text("LÌ QUÁ NGHEN!");
            else
                $('.popup__note').text("BÓ TAY, RÁNG PHÁ BANH NÚT NHA!");
            if (!$('.popup').hasClass('active'))
                $('.popup').addClass('active');
        }
        else {
            let random = Math.floor((Math.random() * 360) + 720);
            value += random;
            console.log(random % 360);
            console.log(value % 360);
            $(".wheel__inner").css("transform", `rotate(${value}deg)`);
            setTimeout(() => {
              
                getPosition(value % 360);
            }, 5000);
        }
        clicked = true;
    })
    $('.congratulation__close').click(function () {
        $('.congratulation').fadeOut();
    })
    $('.congratulation').click(function (event) {
        if (event.target != this)
            return;
        $(this).fadeOut();
    })
})
$(function () {
    if(window.location.hash === '#register') {
        $('#login-tab').removeClass('active')
        $('#register-tab').addClass('active')
        $('#login').removeClass('show active')
        $('#register').addClass('show active')
    }
})

$(function () {
    if (!location.pathname.indexOf('/auth/login')) {
        $('body').css('background', 'none');
    }
});

let clicks = 0
$(".mobile-result-box").on("click", function () {
    clicks++
    if (clicks % 2 !== 0) {
        $(this).find(".mobile-box-before").addClass('animation').css("zIndex", '50')
        $(this).find(".mobile-box-after").removeClass('animation').css("zIndex", '40')
    } else {
        $(this).find(".mobile-box-before").removeClass('animation').css("zIndex", '40')
        $(this).find(".mobile-box-after").addClass('animation').css("zIndex", '50')
    }
})
// $(".mobile-result-box").on("click", function (){
//     $(".mobile-box-before").animate({
//         "z-index" : "5"
//     }, 1000);
//     $(".mobile-box-after").animate({
//         "z-index" : "4"
//     }, 1000);
// })

// const boxAnimate = document.querySelector('mobile-result-box');
// const boxBefore = document.querySelector('mobile-box-before')
// const boxAfter = document.querySelector('mobile-box-after')
//
// boxAnimate.addEventListener('click', event => {
//     boxBefore.style.transform = 'translateX(50%)',
//     boxBefore.style.zIndex = `30`;
// });

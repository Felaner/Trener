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
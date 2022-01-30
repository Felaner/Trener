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

$(".mobile-result-box").on("click", function () {
    const before = $(this).find(".mobile-result-img-1"),
        after = $(this).find(".mobile-result-img-2");
    if (!after.hasClass('animation-down')) {
        after.removeClass('animation-top').addClass('animation-down')
        setTimeout(function () {
            after.css('z-index', '2').css({'background': 'url("../images/trainer.png") no-repeat', 'background-size': 'contain'})
        }, 1000)
        before.removeClass('animation-down').addClass('animation-top')
        setTimeout(function () {
            before.css('z-index', '1').css('background', '#0653B6')
        }, 1000)
    } else {
        before.removeClass('animation-top').addClass('animation-down')
        setTimeout(function () {
            before.css('z-index', '2').css({'background': 'url("../images/trainer.png") no-repeat', 'background-size': 'contain'})
        }, 1000)
        after.removeClass('animation-down').addClass('animation-top')
        setTimeout(function () {
            after.css('z-index', '1').css('background', '#009900')
        }, 1000)
    }
})

$(".edit-profile").on("click", function (el) {
    const values = el.target.parentNode.parentNode.querySelectorAll('.value')
    const inputs = el.target.parentNode.parentNode.querySelectorAll('input')
    const saveBtn = el.target.parentNode.querySelector('.save-profile')
    $(el.target).addClass('d-none')
    values.forEach(el => {
        $(el).addClass('d-none')
    })
    inputs.forEach(el => {
        $(el).removeClass('d-none')
    })
    $(saveBtn).removeClass('d-none')
})

function saveProfile() {
    const el = $('.save-profile')
    const values = el.target.parentNode.parentNode.querySelectorAll('.value')
    const inputs = el.target.parentNode.parentNode.querySelectorAll('input')
    const saveBtn = el.target.parentNode.querySelector('.save-profile')
    $(el.target).addClass('d-block')
    values.forEach(el => {
        $(el).addClass('d-block')
    })
    inputs.forEach(el => {
        $(el).removeClass('d-block')
    })
    $(saveBtn).removeClass('d-block')
}

$(".save-profile").on("click", el => {
    const values = el.target.parentNode.parentNode.querySelectorAll('input')
    const characters = {}
    values.forEach((el, i) => {
        if (i !== 5) {
            characters[i] = el.value
        }
    })
    console.log(characters)
    $.ajax({
        type: 'POST',
        url: '/profile',
        data: characters,
        error: function(jqXHR, textStatus, err) {
            console.log('error: ' + err)
        },
        beforeSend: function() {
            console.log('loading')
        },
        success: function(data) {
            console.log('OK')
            saveProfile()
        }
    })
    return false;
})
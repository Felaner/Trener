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
            before.css('z-index', '1').css('background', '#009900')
        }, 1000)
    } else {
        before.removeClass('animation-top').addClass('animation-down')
        setTimeout(function () {
            before.css('z-index', '2').css({'background': 'url("../images/trainer.png") no-repeat', 'background-size': 'contain'})
        }, 1000)
        after.removeClass('animation-down').addClass('animation-top')
        setTimeout(function () {
            after.css('z-index', '1').css('background', '#0653B6')
        }, 1000)
    }
})

function editProfile(el) {
    const values = el.parentNode.parentNode.querySelectorAll('.value')
    const inputs = el.parentNode.parentNode.querySelectorAll('input')
    const saveBtn = el.parentNode.querySelector('.save-profile')
    $(el).removeClass('d-block').addClass('d-none')
    values.forEach(el => {
        $(el).removeClass('d-block').addClass('d-none')
    })
    inputs.forEach(el => {
        $(el).removeClass('d-none').addClass('d-block')
    })
    $(saveBtn).removeClass('d-none').addClass('d-block')
    return true
}

function saveProfile(el, data) {
    const values = el.parentNode.parentNode.querySelectorAll('.value')
    const inputs = el.parentNode.parentNode.querySelectorAll('input')
    const editBtn = el.parentNode.querySelector('.edit-profile')
    $(el).removeClass('d-block').addClass('d-none')
    let i = 0
    values.forEach(el => {
        $(el).removeClass('d-none').addClass('d-block')
        el.querySelector('span').innerHTML = data[i]
        i++
    })
    inputs.forEach(el => {
        $(el).removeClass('d-block').addClass('d-none')
    })
    $(editBtn).removeClass('d-none').addClass('d-block')
    return true
}

$(".edit-profile").on("click", function (el) {
    const btn = el.target
    editProfile(btn)
});

$('.edit-profile-img').on('click', function (el) {
    const imageFormBox = $('.imageFormBox')
    if (!imageFormBox.hasClass('animate__fadeInLeft')) {
        imageFormBox.removeClass('animate__fadeOutRight').css({'display': 'block'}).addClass('animate__fadeInLeft')
        console.log('ok')
    } else {
        imageFormBox.removeClass('animate__fadeInLeft').addClass('animate__fadeOutRight')
        setTimeout(function () {
            imageFormBox.css({'display': 'none'})
        }, 550)
    }
})

$('.imageFormBox-close').on('click', function (el) {
    const imageFormBox = $('.imageFormBox')
    if (!imageFormBox.hasClass('animate__fadeInLeft')) {
        imageFormBox.removeClass('animate__fadeOutRight').css({'display': 'block'}).addClass('animate__fadeInLeft')
    } else {
        imageFormBox.removeClass('animate__fadeInLeft').addClass('animate__fadeOutRight')
        setTimeout(function () {
            imageFormBox.css({'display': 'none'})
        }, 550)
    }
})

$('.mobile-button-parameters').on('click', function(el) {
    const characterMobile = el.target.parentNode.parentNode.querySelector('.mobile-characters')
    if ($(characterMobile).hasClass('open')) {
        $(characterMobile).removeClass('open')
    } else {
        $(characterMobile).addClass('open')
    }
});

$(".save-profile").on("click", el => {
    const values = el.target.parentNode.parentNode.querySelectorAll('input')
    const characters = {}
    let result = true
    values.forEach((el, i) => {
        if (i !== 5) {
            if (/^(0|-?[1-9]\d{1,2})$/.test(el.value)) {
                characters[i] = el.value
            } else {
                result = false
            }
        }
    })
    if (result === false) {
        alert('Недопустимые значения')
    } else {
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
                saveProfile(el.target, characters)
            }
        })
        return false;
    }
})
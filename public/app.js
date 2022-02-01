'use strict'

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
    const profileNameInput = el.parentNode.parentNode.parentNode.querySelector('#profileName')
    const saveBtn = el.parentNode.querySelector('.save-profile')
    const imgBtn = el.parentNode.querySelector('.edit-profile-img')
    const profileName = el.parentNode.parentNode.parentNode.querySelector('.profile-name')
    $(el).removeClass('d-block').addClass('d-none')
    $(profileName).removeClass('d-block').addClass('d-none')
    $(imgBtn).removeClass('d-block').addClass('d-none')
    values.forEach(el => {
        $(el).removeClass('d-block').addClass('d-none')
    })
    inputs.forEach(el => {
        $(el).removeClass('d-none').addClass('d-block')
    })
    $(profileNameInput).removeClass('d-none').addClass('d-block')
    $(saveBtn).removeClass('d-none').addClass('d-block')
    return true
}

function saveProfile(el, data) {
    const values = el.parentNode.parentNode.querySelectorAll('.value')
    const inputs = el.parentNode.parentNode.querySelectorAll('input')
    const profileNameInput = el.parentNode.parentNode.parentNode.querySelector('#profileName')
    const editBtn = el.parentNode.querySelector('.edit-profile')
    const imgBtn = el.parentNode.querySelector('.edit-profile-img')
    const profileName = el.parentNode.parentNode.parentNode.querySelector('.profile-name')
    $(el).removeClass('d-block').addClass('d-none')
    let i = 0
    values.forEach(el => {
        $(el).removeClass('d-none').addClass('d-block')
        el.querySelector('span').innerHTML = data[i]
        i++
    })
    profileName.innerHTML = data['profileName']
    inputs.forEach(el => {
        $(el).removeClass('d-block').addClass('d-none')
    })
    $(profileNameInput).removeClass('d-block').addClass('d-none')
    $(profileName).removeClass('d-none').addClass('d-block')
    $(imgBtn).removeClass('d-none').addClass('d-block')
    $(editBtn).removeClass('d-none').addClass('d-block')
    return true
}

$(".edit-profile").on("click", function (el) {
    const btn = el.target
    editProfile(btn)
});

function editImage() {
    const imageFormBox = $('.imageFormBox')
    if (!imageFormBox.hasClass('animate__bounceInLeft')) {
        imageFormBox.removeClass('animate__bounceOutRight').css({'display': 'block'}).addClass('animate__bounceInLeft')
    } else {
        imageFormBox.removeClass('animate__bounceInLeft').addClass('animate__bounceOutRight')
        setTimeout(function () {
            imageFormBox.css({'display': 'none'})
        }, 550)
    }
}

function fadeAddSuccess(text, color) {
    const box = $('.add-success');
    box[0].innerHTML = `<p style="color: ${color};">${text}</p>`
    box.removeClass('animate__slideOutUp').css('display', 'block').addClass('animate__slideInDown');
    setTimeout(function () {
        box.removeClass('animate__slideInDown').addClass('animate__slideOutUp')
        setTimeout(function () {
            box.css('display', 'none')
        }, 1200)
    }, 5000)
}

$('.edit-profile-img').on('click', function (el) {
    editImage()
})

$('.imageFormBox-close').on('click', function (el) {
    editImage()
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
    const profileName = el.target.parentNode.parentNode.parentNode.querySelector('#profileName')
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
    characters['profileName'] = profileName.value
    if (result === false) {
        fadeAddSuccess('Некорректные значения', 'red')
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
                fadeAddSuccess('Данные обновлены', '#009900')
            }
        })
        return false;
    }
})

$(function(){
    $('.input-file').each(function() {
        let $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();

        $input.on('change', function(element) {
            let fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
        });
    });

    $('.who-i-href').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#scrollPointWhoI').offset().top }, 1000);
        e.preventDefault();
    });
    $('.results-href').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#scrollPointResults').offset().top }, 1000);
        e.preventDefault();
    });
    $('.who-i-mobile-href').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#mobileScrollPointWhoI').offset().top }, 1000);
        e.preventDefault();
    });
    $('.results-mobile-href').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#mobileScrollPointResults').offset().top }, 1000);
        e.preventDefault();
    });
});

$(function () {
    $('#imageUpload').submit(function (e) {
        e.preventDefault()
        let file = document.querySelector('#imageSelect').value
        const $form = $(this)
        const formData = new FormData(this);
        if (file) {
            const image = document.querySelector('.profile .box-images img')
            const imageMobile = document.querySelector('.mobile-profile-avatar img')
            const imageNavbar = document.querySelector('.mobile-navbar-image img')
            const label = document.querySelector('.js-labelFile')
            const labelReset = '<i class="icon fa fa-check"></i>' +
                '<span class="js-fileName"> Загрузить изображение</span>'
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                error: function(jqXHR, textStatus, err) {
                    console.log('error: ' + err)
                },
                beforeSend: function() {
                    console.log('loading')
                },
                success: function(data) {
                    if ($(window).width() > 767) {
                        image.src = data.img
                    } else {
                        imageMobile.src = data.img
                        imageNavbar.src = data.img
                    }
                    editImage()
                    e.target.reset()
                    $(label).removeClass('has-file');
                    label.innerHTML = labelReset;
                    fadeAddSuccess('Изображение обновлено', '#009900')
                }
            })
            return false;
        } else {
            fadeAddSuccess('Выберите изображение', 'red')
            return false;
        }
    })
})
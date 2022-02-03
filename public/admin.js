$(function () {
    const addCourse = $('.add-course-tab'),
        servicesHref = addCourse.find('.add-course-tab-href');
    servicesHref.on('click', function (e) {
        if (addCourse.hasClass('open')) {
            addCourse.removeClass('open')
        } else {
            addCourse.addClass('open')
        }
    })
})

$(function () {
    $("#addCourse").submit(function (e) {
        e.preventDefault()
        const $form = $(this)
        const formData = new FormData(this);
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
                e.target.reset()
                $(label).removeClass('has-file');
                label.innerHTML = labelReset;
                addCourse(data)
                fadeAddSuccess('Курс добавлен', '#009900')
            }
        })
    })
})

function addCourse(data) {
    const adminCoursesBox = document.querySelector('.admin-courses')
    const { img: img, courseName: name, courseDuration: duration, courseDescription: description, coursePrice: price } = data
    let courseContent = 
        `<div class="col-3">` +
            `<div class="box-images">` +
                `<img src="${img}" alt="course-img">` +
            `</div>` +
        `</div>` +
        `<div class="col-5 offset-1">` +
            `<div class="row">` +
                `<h3 class="f-white">${name}</h3>` +
            `</div>` +
            `<div class="row">` +
                `<p class="f-white">Длительность: ${duration} дней</p>` +
            `</div>` +
            `<div class="row">` +
                `<p class="f-white">${description}</p>` +
            `</div>` +
        `</div>` +
        `<div class="col-3">` +
            `<p class="f-white">${price} руб.</p>` +
        `</div>`;
    adminCoursesBox.innerHTML += courseContent
}
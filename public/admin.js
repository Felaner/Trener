const addCourseTab = $('.add-course-tab');

addCourseTab.on('click', '.add-course-tab-href', openTab)

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
                fadeAddSuccess('Курс не добавлен', 'red')
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
    const courseDelete = document.querySelectorAll('.admin-course-delete')
    courseDelete.forEach(el => {
        $(el).on('click', function (btn) {
            const id = btn.target.getAttribute('data-course-id')
            const courseBox = btn.target.parentNode.parentNode.parentNode.parentNode
            $.ajax({
                type: 'POST',
                url: '/admin/courses/delete-course',
                data: {id: id},
                error: function(jqXHR, textStatus, err) {
                    fadeAddSuccess('Курс не удален', 'red')
                },
                beforeSend: function() {
                    console.log('loading')
                },
                success: function(data) {
                    courseBox.parentNode.removeChild(courseBox)
                    fadeAddSuccess('Курс удален', '#009900')
                }
            })
        })
    })
})

function addCourse(data) {
    const adminCoursesBox = document.querySelector('.admin-courses')
    const { id: id, img: img, courseName: name, courseDuration: duration, courseDescription: description, coursePrice: price } = data
    let courseContent =
        `<div class="admin-course-box col-12">` +
            `<div class="row">` +
                `<div class="col-3 mb-3">` +
                    `<div class="box-images row justify-content-start">` +
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
                    `<div class="row justify-content-end">` +
                        `<p class="f-white">${price} руб.</p>` +
                    `</div>` +
                    `<div class="row justify-content-end">` +
                        `<button class="button-admin admin-course-delete" data-course-id="${id}">Удалить</button>` +
                    `</div>` +
                `</div>` +
            `</div>` +
        `</div>`;
    adminCoursesBox.innerHTML += courseContent
}

function openTab() {
    if (addCourseTab.hasClass('open')) {
        addCourseTab.removeClass('open')
    } else {
        addCourseTab.addClass('open')
    }
}
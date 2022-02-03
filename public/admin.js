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
                fadeAddSuccess('Курс добавлен', '#009900')
            }
        })
    })
})
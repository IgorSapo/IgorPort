$(document).ready(function() {
        
    $('input, textarea').placeholder(); // Apply placeholder plugin

    $(".feedback-form-container").validate({ // Validate feedback form
        rules: {
            sender_name: "required",
            sender_email: {
                required: true,
                email: true
            },
            feedback_mainmessage: "required",
            captcha_input: "required"
        },
        messages: {
            sender_name: "Введите имя",
            sender_email: {
                required: "введите email",
                email: "Введите корректный e-mail"
            },
            feedback_mainmessage: "Ваш вопрос",
            captcha_input: "Код каптчи"
        },
        submitHandler: function(form) {
            ajaxSubmit(form); // Submit form via ajax
            $("input").removeClass('valid');
            $("textarea").removeClass('valid');
          }
    });

    $(".form-add_new_project").validate({ // Validate new project form
        messages: {
            new_project_name: "Введите название",
            filename: "Изображение",
            new_project_url: "Ссылка на проект",
            new_project_description: "Описание проекта"
        },
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
              $(".add_new_project-failure").show();
            } else {
              $(".add_new_project-failure").hide();
            }
          },
        submitHandler: function(form) {
              $(".form-add_new_project").hide();
              $(".add_new_project-success").show();
              console.log("Скрыта форма");
              ajaxSubmit(form); // Submit form via ajax
          }

    });

    var ajaxSubmit = function (submittedForm) { // Sumbit _valid_ form via ajax
        console.log("Вызвана функция сабмита через ajax");
        var str = $(submittedForm).serialize();
        $.ajax ({
                type: "POST",
                cache: false,
                url: "php/hello.php",
                data: str,
                success: function(serverResponse) {
                    console.log(serverResponse);
                }
            });
        $(submittedForm)[0].reset();
    };

    var clearFeedbackForm = function () { // Remove error tooltips and input borders on form reset
        $("#feedback-clear_button").on("click", function() {
            $("label").remove(".error");
            $("input").removeClass('error');
            $("input").removeClass('valid');
            $("textarea").removeClass('error');
            $("textarea").removeClass('valid');
    });
};

clearFeedbackForm();

/* var overlayClick = function () {
    $("#popup1").on("click", function() {
        $("#popup1").hide();
    });
};

overlayClick(); */

});

function PopUpShow(){
    $("#popup1").show();
    $('input, textarea').placeholder();
}

function PopUpHide(){
    $(".add_new_project-success").hide();
    $(".add_new_project-failure").hide();
    $(".form-add_new_project").show();
    $(".form-add_new_project")[0].reset();
    $("label").remove(".error");
    $("input").removeClass('error');
    $("input").removeClass('valid');
    $("textarea").removeClass('error');
    $("textarea").removeClass('valid');
    $("#popup1").hide();
}

function failureHide() { // Hide error message above invalid "add_new_project" form
    $(".add_new_project-failure").hide();
}

    // Прослушка события: изменение инпута загрузки файла.
    var setUpListnerFileupload = function (){
        $('#fileupload').on('change', changefileUpload);
    };

    // Функция добавления имени файла в инпут "filename".
    var changefileUpload = function (){
        var 
            input = $(this), // Инпут type="file"
            name = input[0].files[0].name; // Имя загруженного файла
        $('#filename').val(name); // Добавление имени в инпут "filename".
    };

    setUpListnerFileupload();

    changefileUpload();
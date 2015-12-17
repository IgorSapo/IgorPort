/* $.validator.setDefaults({
        submitHandler: function() {
            alert("submitted!");
        }
    }); */

    $(document).ready(function() {
        //Скрыть PopUp при загрузке страницы    
        /* PopUpHide(); */
        
    $('input, textarea').placeholder();

    $(".feedback-form-container").validate({
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
        }/* ,
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
              $(".add_new_project-failure").show();
            } else {
              $(".add_new_project-failure").hide();
            }
          }


          /* ,
        submitHandler: function(form) {
              $(".form-add_new_project").hide();
              $(".add_new_project-success").show();
          } */

    });

    $(".form-add_new_project").validate({
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
          }

    });

var clearFeedbackForm = function () {
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

//Функция отображения PopUp
function PopUpShow(){
    $("#popup1").show();
    $('input, textarea').placeholder();
}

//Функция скрытия PopUp
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

function failureHide() {
    $(".add_new_project-failure").hide();
}

$("#test_form").submit( function(){
    var str = $(this).serialize();
    $.ajax({
        type: "POST",
        cache: false,
        url: "php/hello.php",
        data: str,
        success: function(html) {
            console.log(html);
        }
    })

})

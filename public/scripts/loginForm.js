$(document).ready(function () {
    $("#login-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            password: {
                required: "Introduzca una contraseña"
            },
            email: {
                required: "Introduzca un Email",
                email: "E-mail no válido"
            },
            submitHandler: onSubmit
        }
    });

    function onSubmit() {
        const data = $("#login-form").serialize();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/login",
            data
        });
    }
});
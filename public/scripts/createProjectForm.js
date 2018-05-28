$(document).ready(function () {
    $("#create-project-form").validate({
        rules: {
            name: {
                required: true
            },
            description: {
                required: true
            },
            startDate: {
                required: true,
                date: true
            },
            requestDate: {
                required: true,
                date: true
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
        },
        submitHandler: onSubmit
    });

    function onsubmit() {

    }
});
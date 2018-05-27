$(document).ready(function () {
    $("#register-form").validate({
        rules: {
            fullName:{
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            fullName:{
                required:"Introduzca su nombre completo"
            },
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

    function onSubmit() {
        const data = {};

        $("#register-form").find('input').each(function (i, node) {
            if (node.type != "submit") {
                data[node.name] = node.value;
            }
        });

        $.ajax({
            type: "post",
            url: apiUrl({ path: "register" }),
            data,
            success: function (response, str, stats) {
                const { error, objs, message } = response;
                const { user, token } = objs;

                if (error) {
                    $("#info").html("<div class='alert alert-danger'>" + message + "</div>");
                } else {
                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('user', JSON.stringify(user));
                    renderView({ path: "" });
                }
            }
        });
    }
});
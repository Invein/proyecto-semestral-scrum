$(document).ready(function () {
    $("#user-form").validate({
        rules: {
            fullName:{
                required:true,
            },
            birthdate: {
                required: true,
            },
            curp: {
                required: true
            },
            rfc: {
                required: true
            },
            address: {
                required: true
            },
            skills: {
                type:[{
                    name: required,
                    rank: required
                }]
            },

        },
        messages: {
            fullName: {
                required: "Introduzca su nombre completa"
            },
            birthdate: {
                required: "Introduzca su cumpleanos"
                
            },
            curp: {
                required: "Introduzca su CURP"
            },
            rfc: {
                required: "Introduzca su rfc"
            },
            address: {
                required: "Introduzca direccion"
            },
        },
        submitHandler: onSubmit
    });

    function onSubmit() {
        const data = {};

        $("#user-form").find('input').each(function (i, node) {
            if (node.type != "submit") {
                data[node.name] = node.value;
            }
        });

        $.ajax({
            type: "post",
            url: apiUrl({ path: "login" }),
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
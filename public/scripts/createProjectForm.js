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
            },
            requestDate: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Introduzca un nombre"
            },
            description: {
                required: "Introduzca una descripción"
            },
            startDate: {
                required: "Introduzca una fecha de arranque",
            },
            requestDate: {
                required: "Introduzca una fecha de Entrega",
            }
        },
        submitHandler: onSubmit
    });

    function onSubmit(arg, arg2) {
        const data = {};

        $("#create-project-form").find('input').each(function (i, node) {
            if (node.type != "submit") {
                data[node.name] = node.value;
            }
        });

        $.ajax({
            type: "post",
            url: apiUrl({ path: "projects" }),
            data,
            success: function (response, str, stats) {
                const { error, objs, message } = response;

                if (error) {
                    $("#info").html("<div class='alert alert-danger'>" + ( error.message || objs.message || message)  + "</div>");
                } else {
                    renderView({ path: "projects/" + objs._id });
                }
            }
        });
    }
});
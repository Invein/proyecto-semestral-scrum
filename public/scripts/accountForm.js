$(document).ready(function () {
    $("#user-form").validate({
        rules: {
            fullName: {
                required: true,
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
            }
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
        submitHandler: onUserSubmit
    });

    $("#skill-form").validate({
        rules: {
            name: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Introduzca un nombre para la habilidad"
            }
        },
        submitHandler: onSkillSubmit
    });

    function onUserSubmit() {
        const data = {};

        $("#user-form").find('input[type=text]').each(function (i, node) {
            if (node.type != "submit") {
                data[node.name] = node.value;
            }
        });

        $.ajax({
            type: "put",
            url: apiUrl({ path: "users" }),
            data,
            success: function (response, str, stats) {
                const { error, objs, message } = response;                

                if (error) {
                    $("#info-user").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                } else {
                    location.reload();
                }
            }
        });
    }

    function onSkillSubmit() {
        const data = {};

        $("#skill-form").find('input[type=text]').each(function (i, node) {
            if (node.type != "submit") {
                data[node.name] = node.value;
            }
        });

        $("#skill-form").find('select').each(function (i, node) {
            data[node.name] = node.value;
        });

        $.ajax({
            type: "put",
            url: apiUrl({ path: "users/skills" }),
            data,
            success: function (response, str, stats) {
                const { error, objs, message } = response;
                const { name, rank, _id } = objs;

                if (error) {
                    $("#info-skill").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                } else {
                    location.reload();
                }
            }
        });
    }

    $("#add-tag").click(function () {
        $("#skill-form-container").css("display", "initial");
    })


    $(".tag-remove-btn").each(function (i, tag) {
        tag.onclick = function () {
            $.ajax({
                type: "delete",
                url: apiUrl({ path: "users/skills/" + tag.id }),
                success: function (response, str, stats) {
                    const { error, objs, message } = response;

                    if (error) {
                        $("#info-skill").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                    } else {
                        $("#" + tag.id).parent().remove();
                    }
                }
            });
        }
    })
});
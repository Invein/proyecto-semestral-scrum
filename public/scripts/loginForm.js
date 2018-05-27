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
        },
        submitHandler: onSubmit
    });

    function onSubmit() {
        const data = {};

        $("#login-form").find('input').each(function (i, node) {
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

// $(document).ready(function () {
//     $("#login-btn").click(function () {
//         const values = {};
//         $("#login-form").find('input').each(function (i, tag) {
//             values[tag.name] = tag.value;
//         });
//         axios.post("http://localhost:3000/api/login", values).then((response) => {
//             const { token, user } = response.data.objs;
//             handleCache.set({ user: { token, ...user } });
//             document.location.replace("http://localhost:3000?token=" + token);
//         });
//     });
// });
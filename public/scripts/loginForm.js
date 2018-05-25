// $(document).ready(function () {
//     $("#login-form").validate({
//         rules: {
//             email: {
//                 required: true,
//                 email: true
//             },
//             password: {
//                 required: true
//             }
//         },
//         messages: {
//             password: {
//                 required: "Introduzca una contraseña"
//             },
//             email: {
//                 required: "Introduzca un Email",
//                 email: "E-mail no válido"
//             },
//             submitHandler: onSubmit
//         }
//     });

//     $("#login-form").onSubmit(function () {
//         console.log("argumentos", arguments);
//         alert("Al");
//     })
//     function onSubmit() {
//         const data = $("#login-form").serialize();
//         while (true) {
//             console.log("HEY");
//         }
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:3000/api/login",
//             data
//         });
//     }
// });

$(document).ready(function () {
    $("#login-btn").click(function () {
        const values = {};
        $("#login-form").find('input').each(function (i, tag) {
            values[tag.name] = tag.value;
        });

        axios.post("http://localhost:3000/api/login", values).then((response) => {
            const { token } = response.data.objs;

            cache = localStorage['scrum-app'];
            document.location.replace("http://localhost:3000?token=" + token);
        });
    });
});
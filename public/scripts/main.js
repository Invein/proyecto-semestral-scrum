$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

function apiUrl({ path }) {
    return "http://" + document.location.host + "/api/" + path;
}

function viewUrl({ path, params }) {
    let url = "http://" + document.location.host + "/" + path
    if (params) {
        url += "?";
        let first = true;
        for (let param in params) {
            url += ((first) ? ((fisrt = false) || "") : "&") + param + "=" + params[param];
        }
    }

    return url;
}

function renderView({ path, body = {}, params }) {
    const token = window.localStorage.getItem("token");
    $.ajax({
        type: "get",
        url: viewUrl({ path, params }),
        data: body,
        success: function (response, str, stats) {
            // document.write(response);
            // window.history.pushState({}, null, viewUrl({ path }));
            document.location.replace(viewUrl({ path, params: { token, ...params } }));
        }
    });
}
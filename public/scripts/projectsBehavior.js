$(document).ready(function () {
    $("#project-container").children("div").each(function (i, tag) {
        tag.onclick = function () {
            renderView({ path: 'projects/' + tag.id });
        };
    });
})
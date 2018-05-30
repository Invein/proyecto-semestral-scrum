$(document).ready(function () {
    $("#project-container").children("div").each(function (i, tag) {
        if (tag.id == "add-project-btn") {
            tag.onclick = function () {
                renderView({ path: 'projects/new'});
            };
        } else {
            tag.onclick = function () {
                renderView({ path: 'projects/' + tag.id });
            };
        }
    });
})
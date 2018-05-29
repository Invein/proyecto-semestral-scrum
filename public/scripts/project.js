$(document).ready(function () {
    $("#user-tag-form").validate({
        submitHandler: onUserSubmit
    });

    function onUserSubmit() {
        const data = {};
        let projectID = $("span#project-id").text();

        $("#user-tag-form").find('select').each(function (i, node) {
            data[node.name] = node.value;
        });

        $.ajax({
            type: "put",
            url: apiUrl({ path: "projects/" + projectID + "/teamMembers" }),
            data,
            success: function (response, str, stats) {
                const { error, objs, message } = response;
                const { name, rank, _id } = objs;

                if (error) {
                    $("#info-member").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                } else {
                    location.reload();
                }
            }
        });
    }

    $("#add-tag").click(function () {
        $("#user-tag-form-container").css("display", "initial");
    })


    $(".tag-remove-btn").each(function (i, tag) {
        tag.onclick = function () {
            let projectID = $("span#project-id").text();
            $.ajax({
                type: "delete",
                url: apiUrl({ path: "projects/" + projectID + "/teamMembers/" + tag.id }),
                success: function (response, str, stats) {
                    const { error, objs, message } = response;

                    if (error) {
                        $("#info-member").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                    } else {
                        $("#" + tag.id).parent().parent().remove();
                    }
                }
            });
        }
    })
});
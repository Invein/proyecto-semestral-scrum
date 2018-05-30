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
                        $("#info-members").html("<div class='alert alert-danger'>" + (error.message || objs.message || message) + "</div>");
                    } else {
                        $("#" + tag.id).parent().parent().remove();
                    }
                }
            });
        }
    })

    $("#product-backlog-btn").click(function () {
        window.location.href = renderView({ path: 'projects/' + $("span#project-id").text() + "/productBacklog" });
    });


    //product Backlog
    $("#add-history").click(function () {
        $("#history-form-container").css("display", "initial");
    });
    $("#cancel-btn").click(function () {
        $("#history-form-container").css("display", "none");
    });

    $("#history-form").validate({
        submitHandler: onSubmit,
        rules: {
            how: {
                required: true
            },
            want: {
                required: true
            },
            way: {
                required: true
            },
            given: {
                required: true
            },
            when: {
                required: true
            },
            then: {
                required: true
            }
        }
    });

    function onSubmit() {
        const data = { criteria: {}, narrative: {} };
        let projectID = $("span#project-id").text();

        $("#history-form").find('select').each(function (i, node) {
            data[node.name] = node.value;
        });
        $("#front-form").find('textarea').each(function (i, node) {
            data.narrative[node.name] = node.value;
        });
        $("#back-form").find('textarea').each(function (i, node) {
            data.criteria[node.name] = node.value;
        });

        $.ajax({
            type: "put",
            url: apiUrl({ path: "projects/" + projectID + "/productBacklog" }),
            data: { history: JSON.stringify(data) },
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
});

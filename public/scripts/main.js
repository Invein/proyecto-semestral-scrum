$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

const handleCache = {
    get: function () {
        return JSON.parse(localStorage['scrum-app'] || "{}");
    },
    set: function (cacheObj) {
        localStorage["scrum-app"] = JSON.stringify(cacheObj);
    }
}
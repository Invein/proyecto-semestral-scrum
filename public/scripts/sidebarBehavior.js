$(document).ready(function () {
    $("#projects-btn").click(function () {
        renderView({ path: "projects" });
    });
    $("#dashboard-btn").click(function () {
        renderView({ path: "" });
    });
    $("#logout-btn").click(function () {        
        window.localStorage.removeItem('token');
        renderView({ path: "login" });
    });
    $("#account-btn").click(function () {
        renderView({ path: "account" });
    });
})
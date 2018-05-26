var appCache = JSON.parse(localStorage['scrum-app']);

function checkForRedirection() {
    const pathname = document.location.pathname;
    const host = document.location.host;
    const { user } = appCache;
    if (user && user.token) {
        
    } else {
        $.ajax({ type: "post", url: host + "/login" });
    }
}

checkForRedirection();
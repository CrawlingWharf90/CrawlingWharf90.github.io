function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function() 
{
    if (isMobileDevice()) {
        console.log("User is on a mobile device");
        window.location.href = 'mobile-page.html';
    } else {
        console.log("User is on a desktop device");
    }
});
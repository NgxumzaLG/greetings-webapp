document.addEventListener('DOMContentLoaded', function() {
    let theMessage = document.querySelector('.greet-message');

    if (theMessage.innerHTML !== "") {
        setTimeout(function() {
            theMessage.innerHTML = "";

        }, 5000);
    }
});
//cookie consent with expiration
function setCookieConsent(consent, days) {
    const now = new Date();
    const expirationTime = now.getTime() + days * 24 * 60 * 60 * 1000; //days to ms
    const consentData = {
        value: consent,
        expires: expirationTime
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
}

//get cookie function
function getCookieConsent() {
    const consentData = JSON.parse(localStorage.getItem('cookieConsent'));
    if (consentData) {
        const now = new Date().getTime();
        //check if expired
        if (now > consentData.expires) {
            localStorage.removeItem('cookieConsent'); //remove expired
            return null; 
        }
        return consentData.value; //return consent value
    }
    return null; 
}


document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookieConsent();
    if (!consent) {
        // show overlay
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('cookieConsent').style.display = 'block';
    }

    document.getElementById('acceptCookies').onclick = function() {
        setCookieConsent('accepted', 30); //30 days
        hideConsentPopup();
    };

    document.getElementById('declineCookies').onclick = function() {
        setCookieConsent('declined', 30); //30 days
        hideConsentPopup();
    };

    //manage consent
    document.getElementById('manageConsent').onclick = function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        // Show the overlay and the cookie consent pop-up again
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('cookieConsent').style.display = 'block';
    };
});

//hide consent 
function hideConsentPopup() {
    document.getElementById('overlay').style.display = 'none'; 
    document.getElementById('cookieConsent').style.display = 'none'; 
}
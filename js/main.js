/* jshint esversion: 6 */

$(document).ready(function() {
    let lastScrollTop = 0;
    const header = $('.header-wrapper');
    const headerHeight = header.outerHeight();
    
    // Create placeholder div
    const placeholder = $('<div></div>').insertAfter(header);
    placeholder.height(headerHeight).hide();
    
    // Initial header state
    header.css({
        width: '100%',
        transition: 'transform 0.3s ease-in-out'
    });

    // Function to handle scroll events
    $(window).scroll(function() {
        let currentScroll = $(window).scrollTop();
        
        if (currentScroll > headerHeight) {
            // Past the header height - make it fixed
            if (!header.hasClass('is-fixed')) {
                header.css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1000
                }).addClass('is-fixed');
                placeholder.show();
            }
            
            // Handle hide/show animation
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                header.css('transform', 'translateY(-100%)');
            } else {
                // Scrolling up
                header.css('transform', 'translateY(0)');
            }
        } else {
            // At the top - return to normal
            header.css({
                position: '',
                transform: '',
                top: '',
                left: '',
                zIndex: ''
            }).removeClass('is-fixed');
            placeholder.hide();
        }
        
        lastScrollTop = currentScroll;
    });

    // Update placeholder height on window resize
    $(window).resize(function() {
        placeholder.height(header.outerHeight());
    });
});

//////////////////////////////////////////////////////////////////////////////// 
// COOKIE CONSENT
////////////////////////////////////////////////////////////////////////////////  

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

    document.getElementById('changeCookies').onclick = function() {
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

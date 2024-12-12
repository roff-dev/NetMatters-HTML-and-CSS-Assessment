
//////////////////////////////////////////////////////////////////////////////// 
// STICKY NAV
////////////////////////////////////////////////////////////////////////////////  

//track scroll variables
let lastScrollY = window.scrollY;
let ticking = false;
let isSticky = false;
let navTop;
let headerOffset;

//get header
const headerWrapper = document.querySelector('.header-wrapper');
const nav = document.querySelector('.nav-popout');

//AND HERE
//placeholder div for jumping position
const placeholder = document.createElement('div');
placeholder.style.display = 'none';
headerWrapper.parentNode.insertBefore(placeholder, headerWrapper.nextSibling);

// start positions
//POTENTIAL ISSUE HERE
function updateNavPosition() {
    //get relative header pos
    const headerRect = headerWrapper.getBoundingClientRect();
    headerOffset = headerRect.top + window.scrollY;
    
    //calc nav original pos
    navTop = headerOffset;
    
    //update placeholder
    //placeholder.style.height = `${headerWrapper.offsetHeight}px`;
}

//position calculation
updateNavPosition();

//scroll behavior function
function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Check if the side menu is active
    const sideMenu = document.querySelector('.side-menu');
    const isSideMenuActive = sideMenu.classList.contains('active');
    
    // at or above nav default pos
    if (currentScrollY <= navTop) {
        if (isSticky) {
            //remove stick
            headerWrapper.classList.remove('sticky');
            headerWrapper.classList.remove('slide-up');
            headerWrapper.classList.remove('slide-down');
            //placeholder.style.display = 'none';
            isSticky = false;
        }
    } else if (currentScrollY < lastScrollY) {
        //scroll up and below def pos
        if (!isSticky && !isSideMenuActive) {
            //slide down animation
            headerWrapper.classList.add('sticky');
            headerWrapper.classList.remove('slide-up');
            headerWrapper.classList.add('slide-down');
            placeholder.style.display = 'block';
            isSticky = true;
        }
    } else {
        //if scroll down
        if (isSticky) {
            // add slide up
            headerWrapper.classList.add('slide-up');
            headerWrapper.classList.remove('slide-down');
            headerWrapper.classList.remove('sticky');
            //wait for animation to complete
            setTimeout(() => {
                if (currentScrollY > lastScrollY) {  
                    headerWrapper.classList.remove('sticky');
                    placeholder.style.display = 'none';
                    isSticky = false;
                }
            }, 300); 
        }
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

//scroll event listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
        });
        ticking = true;
    }
});

//reset on page refresh
window.addEventListener('beforeunload', () => {
    headerWrapper.classList.remove('sticky');
    headerWrapper.classList.remove('slide-up');
    headerWrapper.classList.remove('slide-down');
    placeholder.style.display = 'none';
});

//window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        //updateNavPosition();
    }, 250);
});


document.addEventListener('DOMContentLoaded', updateNavPosition);

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


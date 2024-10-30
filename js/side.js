document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const sideMenu = document.querySelector('.side-menu');
    const body = document.body;
    let overlay;
    let contentWrapper;

    // wrap content to move at once
    function wrapContent() {
        //create
        contentWrapper = document.createElement('div');
        contentWrapper.classList.add('content-wrapper');
        
        //all body except the side menu
        const bodyChildren = Array.from(body.children).filter(child => child !== sideMenu);
        
        //all content to wrapper
        bodyChildren.forEach(child => {
            contentWrapper.appendChild(child);
        });
        
        //body wrapper add
        body.insertBefore(contentWrapper, sideMenu);

        //transition wrapper
        contentWrapper.style.transition = 'transform 0.3s ease-in-out';
        contentWrapper.style.position = 'relative';
        contentWrapper.style.width = '100%';
        contentWrapper.style.left = '0';
    }

    //overlay element
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease-in-out';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '999';
        contentWrapper.appendChild(overlay);
    }

    //open the menu
    function openMenu() {
        sideMenu.classList.add('active');
        contentWrapper.style.transform = `translateX(-${sideMenu.offsetWidth}px)`;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        body.style.overflow = 'hidden';
        hamburgerIcon.classList.add('active');
        hamburgerIcon.querySelector('.hamburger-line').classList.add('x-icon');
    }

    //close the menu
    function closeMenu() {
        sideMenu.classList.remove('active');
        contentWrapper.style.transform = 'translateX(0)';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        body.style.overflow = '';
        hamburgerIcon.classList.remove('active');
        hamburgerIcon.querySelector('.hamburger-line').classList.remove('x-icon');
    }

    //menu function
    function toggleMenu() {
        if (sideMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    //menu functionality
    function Menu() {
        //side menu positioning
        sideMenu.style.position = 'fixed';
        sideMenu.style.top = '0';
        sideMenu.style.right = '0';
        sideMenu.style.height = '100%';
        sideMenu.style.zIndex = '1000';
        
        //content wrapper
        wrapContent();
        createOverlay();

        hamburgerIcon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        //failsafe for if hamburger is not visible
        // click overlay to close
        overlay.addEventListener('click', closeMenu);

        // esc key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        sideMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sideMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX - touchStartX > 50) {
                closeMenu();
            }
        }, { passive: true });

        //window resize
        window.addEventListener('resize', () => {
            // If menu is open, adjust the content wrapper translation
            if (sideMenu.classList.contains('active')) {
                contentWrapper.style.transform = `translateX(-${sideMenu.offsetWidth}px)`;
            }
        });
    }
    Menu();
});
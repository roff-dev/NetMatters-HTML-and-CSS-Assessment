/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const sideMenu = document.querySelector('.side-menu');
    const body = document.body;
    const overlay = document.getElementById('overlay');
    const contentWrapper = document.getElementById('content-wrapper');
    const headerWrapper = document.getElementById('header-wrapper');

   

    //open the menu
    function openMenu() {
        sideMenu.classList.add('active');
        contentWrapper.style.transform = `translateX(-${sideMenu.offsetWidth}px)`;
        headerWrapper.style.transform = `translateX(-${sideMenu.offsetWidth}px)`;
        overlay.style.display = 'block';
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
        headerWrapper.style.transform = 'translateX(0)';
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
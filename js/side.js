/* jshint esversion: 6 */

$(document).ready(function() {
    const $hamburger = $('.hamburger-icon');
    const $sideMenu = $('.side-menu');
    const $contentWrapper = $('#content-wrapper');
    const $headerWrapper = $('.header-wrapper');
    const $overlay = $('#overlay');
    let menuIsOpen = false;

    // Function to open menu
    function openMenu() {
        const menuWidth = $sideMenu.outerWidth();
        menuIsOpen = true;
        
        $sideMenu.addClass('active');
        $contentWrapper.css('transform', `translateX(-${menuWidth}px)`);
        $headerWrapper.css({
            'transform': `translateX(-${menuWidth}px)`,
            'transition': 'transform 0.3s ease-in-out'
        });
        
        // Position overlay to cover both header and content
        $overlay.css({
            'display': 'block',
            'opacity': '1',
            'pointer-events': 'auto',
            'z-index': '99999',
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
        });
        
        $hamburger.addClass('active')
            .find('.hamburger-line')
            .addClass('x-icon');
    }

    // Function to close menu
    function closeMenu() {
        menuIsOpen = false;
        $sideMenu.removeClass('active');
        $contentWrapper.css('transform', 'translateX(0)');
        $headerWrapper.css('transform', 'translateX(0)');
        
        $overlay.css({
            'opacity': '0',
            'pointer-events': 'none'
        });
        
        $hamburger.removeClass('active')
            .find('.hamburger-line')
            .removeClass('x-icon');
    }

    // Set initial menu position
    $sideMenu.css({
        'position': 'fixed',
        'top': '0',
        'right': '0',
        'height': '100%',
        'z-index': '1000',
        'overflow-y': 'auto'
    });

    // Click handlers
    $hamburger.on('click', function(e) {
        e.preventDefault();
        $(this).hasClass('active') ? closeMenu() : openMenu();
    });

    // Close menu when clicking overlay
    $overlay.on('click', closeMenu);

    // Close menu on ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $sideMenu.hasClass('active')) {
            closeMenu();
        }
    });

    // Handle window resize
    $(window).on('resize', function() {
        if (menuIsOpen) {
            const menuWidth = $sideMenu.outerWidth();
            $contentWrapper.css('transform', `translateX(-${menuWidth}px)`);
            $headerWrapper.css('transform', `translateX(-${menuWidth}px)`);
        }
    });

    // Ensure header stays transformed when sticky
    $(window).on('scroll', function() {
        if (menuIsOpen) {
            const menuWidth = $sideMenu.outerWidth();
            $headerWrapper.css('transform', `translateX(-${menuWidth}px)`);
        }
    });
});
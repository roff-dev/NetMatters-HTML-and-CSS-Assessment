$('.slick-slider').slick({
    dots: true,
    speed: 250,
    cssEase: 'linear'
    
});
$(document).ready(function(){
    // Destroy any existing slick initialization
    if ($('.logo-wrapper').hasClass('slick-initialized')) {
        $('.logo-wrapper').slick('unslick');
    }
    
    // Reinitialize with new settings
    $('.logo-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        infinite: true,
        cssEase: 'linear',
        centerMode: false,
        variableWidth: true,
    });
});
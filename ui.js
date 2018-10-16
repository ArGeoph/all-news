$(document).ready( () => {
    let navPosition = $('.nav').offset().top;
    
    $(window).scroll(() => {
        
        let topPosition = $(window).scrollTop();

        if (topPosition > navPosition) {
            $('.nav').addClass('sticky');
        }
        else {
            $('.nav').removeClass('sticky');
        }
    });
});
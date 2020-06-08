$(document).ready(() => {
    let navPosition = $('.container').offset().top;

    $(window).scroll(() => {
        if ($(window).width() > 950 ) {
            let topPosition = $(window).scrollTop();

            if (topPosition > navPosition-70) {
                $('.container').addClass('sticky');

            }
            else {
                $('.container').hide();
                $('.container').removeClass('sticky');
                $('.container').slideDown(180);
            }
        }
        else {
            $('.container').hide();
            $('.container').removeClass('sticky');
            $('.container').slideDown(0);
        }
    });

    //Add sources button actions
    $('#addMoreSources').click((event) => {
        $('#newsSources').fadeToggle(1);

        //Change add Sources button label
        let buttonLabel = document.getElementById('addMoreSources').innerHTML;

        if ( buttonLabel === 'More +') {
            document.getElementById('addMoreSources').innerHTML = 'Close X';
        }
        else {
            document.getElementById('addMoreSources').innerHTML = 'More +';
        }
    });
});
// End of file

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

    //Add sources button actions
    $("#addMoreSources").click((event) => {
        $("#newSources").fadeToggle(300);

        //Change add Sources button label
        let buttonLabel = document.getElementById("addMoreSources").innerHTML;
        
        if ( buttonLabel === "Add +") {
            document.getElementById("addMoreSources").innerHTML = "x";
        }
        else {
            document.getElementById("addMoreSources").innerHTML = "Add +";
        }
    });
});
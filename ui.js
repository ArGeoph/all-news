$(document).ready( () => {
    let navPosition = $('.container').offset().top;
    
    $(window).scroll(() => {
        
        let topPosition = $(window).scrollTop();

        if (topPosition > navPosition) {
            $('.container').addClass('sticky');
        }
        else {
            $('.container').removeClass('sticky');
        }
    });

    //Add sources button actions
    $("#addMoreSources").click((event) => {
        $("#newSources").fadeToggle(300);

        //Change add Sources button label
        let buttonLabel = document.getElementById("addMoreSources").innerHTML;
        
        if ( buttonLabel === "Add +") {
            document.getElementById("addMoreSources").innerHTML = "X";
        }
        else {
            document.getElementById("addMoreSources").innerHTML = "Add +";
        }
    });
});
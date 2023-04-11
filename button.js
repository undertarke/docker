// Nope
// ...except to show the animation on load


document.querySelector(".like-button").onclick = () => {
    setTimeout(() => {
        $('#like_button').animate({ top: '-1000px' });
        $('#like_button').css("display", "none");
    }, 1000);

    setTimeout(() => {
        $('#canvas').fadeIn();
        $('#balloon-container').fadeIn();
    }, 1500);

    // setTimeout(() => {
    //     $('#canvas').slideUp(2000);
    //     $('#balloon-container').slideUp(2000);
    //     $('#merrywrap').slideDown(2000);

    // }, 10000);



}


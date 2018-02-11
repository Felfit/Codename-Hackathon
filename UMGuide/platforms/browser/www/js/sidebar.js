function toggleSideBar(){
    var width = $(".sidebar").width();
    var zIndex = $("toToggle").attr('zIndex');

    if(width <= 0){
        zIndex = 999;
        width = 235;
    } else { 
        width = 0;
        zIndex = -1;
    }

    $(".sidebar").css('width', width);
    $(".sidebar").css('right', width);
    $(".toToggle").css('z-index', zIndex);
}

function addExclusiveClickedClass(elemClicked){
    var clicked = $('.clicked').eq(0);

    clicked.removeClass('clicked');
    $(elemClicked).addClass('clicked');
}
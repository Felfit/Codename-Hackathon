function toggleSideBar(){
    var width = $(".sidebar").width()
    if(width == 0)
        width = 235;
    else 
        width = 0;

    $(".sidebar").css('width', width);
    $(".sidebar").css('right', width);
}
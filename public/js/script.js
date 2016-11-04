///* needs to be run onclick */
//function highlight(route) {
//    var route = window.location.pathname;
//
//    if(/#howitworks/.test(route)) {
//        $("li").removeClass('active');
//        $("li:nth-child(2)").addClass('active');
//    }
//    if(/about/.test(route)) {
//        $("li").removeClass('active');
//        $("li:nth-child(3)").addClass('active');
//    }
//    if(/blog/.test(route)) {
//        $("li").removeClass('active');
//        $("li:nth-child(4)").addClass('active');
//    }
//    if(/info/.test(route)) {
//        $("li").removeClass('active');
//        $("li:nth-child(5)").addClass('active');
//    }
//    if(/contact/.test(route)) {
//        $("li").removeClass('active');
//        $("li:nth-child(6)").addClass('active');
//    }
//};




$(function() {
    var url = window.location.href;

    // passes on every "a" tag
    $(".nav a").each(function() {

        // checks if its the same on the address bar
        if (url == (this.href)) {
            $("li").removeClass('active');
            $(this).closest("li").addClass("active");
        }
    });

    $(".nav a").click(function() {
       //console.log($(this));
       $("li").removeClass('active');
       $(this).closest("li").addClass("active");
   });
});

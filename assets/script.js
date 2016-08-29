/* needs to be run onclick */
function highlight(route) {
    if(/howitworks/.test(route)) {
        $("li").removeClass('active');
        $("li:nth-child(2)").addClass('active');
    }
    if(/about/.test(route)) {
        $("li").removeClass('active');
        $("li:nth-child(3)").addClass('active');
    }
    if(/blog/.test(route)) {
        $("li").removeClass('active');
        $("li:nth-child(4)").addClass('active');
    }
    if(/newsletter/.test(route)) {
        $("li").removeClass('active');
        $("li:nth-child(5)").addClass('active');
    }
    if(/contact/.test(route)) {
        $("li").removeClass('active');
        $("li:nth-child(6)").addClass('active');
    }
};

//function scrollToAnchor(aid){
//    var aTag = $("a[name='"+ aid +"']");
//    $('html,body').animate({ scrollTop: aTag.offset().top },'fast');
//}
//
//$("li:nth-child(2)").click(function() {
//    scrollToAnchor('howitworks');
//});
//
//$("li:nth-child(3)").click(function() {
//    scrollToAnchor('about');
//});

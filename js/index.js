(function() {
    $(".toggle-sidebar").click(function() {
        $(".left-aside").toggleClass("aside-close");
        $('.main-section').toggleClass('main-collape');
    });

    $(window).on('load', function(e) {
        let event = e.originalEvent;
        router(event.target['location']);
    });
})();
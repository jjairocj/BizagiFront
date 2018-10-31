import '../css/style.css';

(function() {
    $(".toggle-sidebar").click(function() {
        $(".left-aside").toggleClass("aside-close");
        $('.main-section').toggleClass('main-collape');
    });
})();
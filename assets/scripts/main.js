(function($) {
    $(document).ready(function() {

        var intro = $('.section--intro'),
            cv = $('.section--cv');

        $('.bio__image').click(function() {
            Section.goTo(cv);
        });

    });
})(jQuery);

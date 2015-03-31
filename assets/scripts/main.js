(function($) {
    $(document).ready(function() {

        var intro = $('.section--intro'),
            cv = $('.section--cv');

        $('.links li').click(function(e) {
            element = $(e.target).data('section');
            Section.goTo($('.' + element));
        });

    });
})(jQuery);

var Section = (function($) {

    var config = {
        sections: $('.section'),
        currentSection: ''
    };

    var goTo = function(section) {

        currentSection = $('.section--active');

        console.log(currentSection);
        console.log(section);

        _goAway(currentSection);
        _comeHere(section);

    };

    var _goAway = function(section) {
        section.removeClass('section--active');
    };

    var _comeHere = function(section) {
        section.addClass('section--active');
    };

    return {
        goTo: goTo
    };

})(jQuery);

var Section = (function($) {

    var config = {
        sections: $('.section'),
        currentSection: ''
    };

    var goTo = function(section) {

        currentSection = $('section--current');

        _goAway(currentSection);
        _comeHere(section);

    };

    var _goAway = function(section) {
        console.log('go away');
    };

    var _comeHere = function(section) {
        console.log('come here');
    };

    return {
        goTo: goTo
    };

})(jQuery);

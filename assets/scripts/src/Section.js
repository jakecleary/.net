/**
 * Simple module for navigating between section of the site.
 */
var Section = (function($) {

    /**
     * Toggle a section.
     *
     * @param {object} section The jQuery object <section> element
     */
    var goTo = function(section) {

        // Get the current section
        currentSection = $('.site-section--active');

        // Navigate to the new section
        _goAway(currentSection);
        _comeHere(section);

    };

    /**
     * Hide a section.
     *
     * @param {object} section The jQuery object <section> element
     */
    var _goAway = function(section) {
        section.removeClass('site-section--active');
    };

    /**
     * Bring a section into view.
     *
     * @param {object} section The jQuery object <section> element
     */
    var _comeHere = function(section) {
        section.addClass('site-section--active');
    };

    /**
     * Return public methods.
     */
    return {
        goTo: goTo
    };

})(jQuery);

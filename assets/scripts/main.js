(function($) {
    $(document).ready(function() {

        /**
         * Site section navigation
         */

        var navLink = $('.nav__link'),
            navLinkActiveName = 'nav__link--active';

        navLink.click(function(e)
        {
            // Get the link we clicked
            var element = $(e.target);

            // Only run the code if we clicked on an inactive section
            if(element.hasClass(navLinkActiveName)) {
                return;
            };

            // Activate the nav item we clicked
            navLink.removeClass(navLinkActiveName);
            element.addClass(navLinkActiveName);

            // Get the name of the section we want to navigate to
            var section = $('.' + element.data('section'));

            // Go to it, yo
            Section.goTo(section);

            // Temporary
            if(section.hasClass('site-section--intro'))
            {
                $('body').css({
                    overflowY: 'hidden'
                });
            }
            else
            {
                $('body').css({
                    overflowY: 'visible'
                });
            }
        });

    });
})(jQuery);

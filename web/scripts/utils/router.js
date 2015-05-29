define([
    'marionette',
    'utils/events'
    ],
    function(
    Marionette,
    events
    ) {

    var router = Marionette.AppRouter.extend({

        initialize: function() {
            events.listen('updateRoute', this.updateNavigate, this)
        },

        appRoutes: {
            ":pageName": "showPage",
            ":pageName?*querystring": "showPage",
        },

        /*
        On navigation event, update url
        */
        updateNavigate: function(urlHash) {
            this.navigate(urlHash, {trigger:false});
        },

        routes: {
            "test": "testFn"
        },

        testFn: function() {
            alert('TEST!!!');
        }

    });

    return router;

});

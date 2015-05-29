define([
    'controllers/baseController',
    'models/fourUpModel',
    'utils/events',
    'views/fourUpView'
    ],
        function(
        BaseController,
        model,
        events,
        view
        ) {


        /*
        This is the main controller used by the router.
        Responsibilities:
        - on route change / nav event, instantitate page/graph/data view controller
        - page controller will instantiate model
        - instantitate view

        what's different?
        - specific view and model
        - specific data load event (get from model?)
        -


        */

        // PLACEHOLDER for when I get to making this consistent

        var controller = BaseController.extend({

            modelClass: model, // here we load the parent model - container for 3 submodels
            viewClass: view,

            // initialize: function() {
            //     // do nothing yet
            // },
            //
            // onDestroy: function() {
            //     // do nothing here too
            // }

        });

        return controller;

    }
);

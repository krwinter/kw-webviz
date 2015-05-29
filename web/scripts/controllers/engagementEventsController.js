define([
    'controllers/baseController',
    'models/engagementEventsModel',
    'utils/events',
    'views/engagementEventsView'
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


        var controller = BaseController.extend({

            modelClass: model,
            viewClass: view,


            // initialize: function() {
            //     console.log('emailController.initialize ')
            //     BaseController.prototype.initialize.call(this);
            // }

        });

        return controller;

    }
);

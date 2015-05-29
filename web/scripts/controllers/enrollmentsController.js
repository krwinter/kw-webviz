define([
    'controllers/baseController',
    'models/enrollmentsModel',
    'utils/events',
    'views/enrollmentsView'
    ],
        function(
        BaseController,
        model,
        events,
        view
        ) {

        var controller = BaseController.extend({

            modelClass: model,
            viewClass: view,

        });

        return controller;
    }
);

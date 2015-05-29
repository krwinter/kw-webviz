define([
    'controllers/baseController',
    'models/rebatesModel',
    'views/rebatesView'
    ],
        function(
        BaseController,
        model,
        view
        ) {


        var controller = BaseController.extend({

            modelClass: model,
            viewClass: view,

        });

        return controller;

    }
);

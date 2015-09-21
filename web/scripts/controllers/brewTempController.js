define([
    'controllers/baseController',
    'models/brewTempModel',
    'views/brewTempView'
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

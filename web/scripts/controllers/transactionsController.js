define([
    'controllers/baseController',
    'models/transactionsModel',
    'views/transactionsView'
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

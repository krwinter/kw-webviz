define([
    'marionette',
    'd3',
    'bootstrap',
    'controllers/mainController',
    'config/appConfig',
    'utils/events',
    'utils/router'
    ],
    function(
        Marionette,
        d3,
        bootstrap,
        MainController,
        config,
        events,
        Router
    ){

        // var startUp = function() {
        //
        //     var mainControllerInstance = new MainController();
        //
        //     var appRouter = new Router({
        //         controller: mainControllerInstance
        //     });
        //
        //     mainControllerInstance.start();
        // };


        var app = Backbone.Marionette.Application.extend({

            // Properties
            router: null,

            mainControllerInstance: null,

            initialize: function() {
                console.log('app.init - we init app');
            },


            onStart: function() {
                console.log('app.onStart - we start');

                this.mainControllerInstance = new MainController();

                this.router = new Router({
                    controller: this.mainControllerInstance
                });

                this.mainControllerInstance.start();

                Backbone.history.start({
                    //pushState: true,
                    //root: '/web/html'
                });

            }
        });


        return app;

});

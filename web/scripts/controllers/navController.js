define([
    'marionette',
    'controllers/baseController',
    'views/navView',
    'models/navModel',
    'utils/events',
    'config/appConfig',
    'config/pageConfig'
    ],
    function(
        Marionette,
        BaseController,
        NavView,
        NavModel,
        events,
        appConfig,
        pageConfig
    ) {


    var controller = Marionette.Controller.extend({

        pageName: null,         // from page model - is key from each page config object

        modelClass: NavModel,
        viewClass: NavView,

        modelInstance: null,    // set here on initialize
        viewInstance: null,     // set here on initialize

        //nav modelInstance in base class

        // page model of current content page
        pageModelInstance: null,

        initialize: function(options) {

            this.createModel(options);
            this.createView(options);

        },


        // model of main nav layout - dependent on permissions of user, environment, etc
        // decide which config to use and get it set up
        createModel: function(options) {

            this.modelInstance = new NavModel();

        },

        createView: function(options) {
            options.model = this.modelInstance;
            this.viewInstance = new NavView(options);

            // only done initially - so we can run region.show on this view
            events.dispatch('navReady', this.viewInstance);
        },



    });

    return controller;


});

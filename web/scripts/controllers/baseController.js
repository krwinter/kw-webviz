define([
    'marionette',
    'utils/events'
    ],
        function(
        Marionette,
        events
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


        var controller = Marionette.Controller.extend({

            pageName: null,         // from page model - is key from each page config object

            modelClass: null,       // set in subclass
            modelInstance: null,    // set here on initialize

            viewClass: null,        // set in subclass
            viewInstance: null,     // set here on initialize

            initialize: function(options) {
                // 1st thing we do is set what our pageName is
                this.pageName = options.pageName;

                this.createModel(options);
                this.createView(options);
                // load data here after views set up?
            },

            createModel: function(options) {
                this.modelInstance = new this.modelClass(options);
                // useful to listen here?
                if (this.modelInstance.dataLoadEvent) {
                    events.listen(this.modelInstance.dataLoadEvent, this.dataLoaded, this)
                }
                // load data from main controller - after view is there - to prevent race condition
                //this.modelInstance.loadData();
            },

            dataLoaded: function() {
                // useful to listen here?
                console.log('baseController - data loaded');
            },

            destroyModel: function() {

            },

            createView: function(options) {
                options.model = this.modelInstance;
                this.viewInstance = new this.viewClass(options);
                events.dispatch('viewReady', this.viewInstance);
            },

            destroyView: function() {
                // DESTROY!
            },

            onDestroy: function() {
                // destroy view
                this.viewInstance.destroy();
                // destroy model
                this.modelInstance = null;
            }


        });

        return controller;

    }
);

define([
    'marionette',
    'utils/events',
    'config/pageConfig'

    ],
        function(
        Marionette,
        events,
        pageConfig
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
                // load data here after views set up?
            },

            // ============= MODEL SETUP =============

            createModel: function(options) {

                this.modelClass = this.getNewModelClass();
                
                require([this.modelClass], 
                    function(modelClass) {

                        console.log('hi');
                        this.modelInstance = new modelClass(options);
                
                        options.model = this.modelInstance;
                        this.createView(options);
                        // useful to listen here?
                        // if (this.modelInstance.dataLoadEvent) {
                        //     events.listen(this.modelInstance.dataLoadEvent, this.dataLoaded, this)
                        // }
                    }.bind(this)
                );
            },

            dataLoaded: function() {
                // useful to listen here?
                console.log('baseController - data loaded');
            },

            destroyModel: function() {

            },

            // ============= VIEW SETUP ===============

            createView: function(options) {
                
                //options.model = this.modelInstance;
                //this.viewInstance = new this.viewClass(options);



                this.viewClass = this.getNewViewClass();
                
                require([this.viewClass], 
                    function(viewClass) {

                        console.log('hi');
                        this.viewInstance = new viewClass(options);
                        // useful to listen here?
                        // if (this.modelInstance.dataLoadEvent) {
                        //     events.listen(this.modelInstance.dataLoadEvent, this.dataLoaded, this)
                        // }
                        events.dispatch('viewReady', this.viewInstance);

                    }.bind(this)
                );

            },

            destroyView: function() {
                // DESTROY!
            },

            // ============= UTILS =================

            getNewModelClass: function() {
                var newModelName;
                if (pageConfig[this.pageName].pageModel) {
                    //newModelName = eval(pageConfig[this.pageName].pageModel);
                    newModelName = pageConfig[this.pageName].pageModel;
                    // TODO: dynamic require
                } else {
                    newModelName = 'BaseModel';
                }

                return newModelName;

            },

            getNewViewClass: function() {
                var newViewName;
                if (pageConfig[this.pageName].pageView) {
                    //newViewName = eval(pageConfig[this.pageName].pageView);
                    newViewName = pageConfig[this.pageName].pageView;
                    // TODO: dynamic require
                } else {
                    newViewName = 'BaseView';
                }

                return newViewName;

            },

            // ============= CLEANUP ===============

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

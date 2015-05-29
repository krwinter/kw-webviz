define([
    'marionette',
    'utils/events',
     ], function(
         Marionette,
         events
        ) {


        /*
        what's different?
        - specific data loaded event
        - graph create method
        - selectors - graph, el
        - template

        */


    var view = Backbone.Marionette.LayoutView.extend({

        graphHolderSelector: '#all-events-graph-holder',

        content: null,

        sql: null,

        extra: null,

        // TODO - get data event from model
        setupListeners: function() {

            events.listen(this.model.dataLoadEvent, this.onDataLoaded, this);
            events.listen('filtersUpdated', this.onDataLoaded, this);
        },

        removeListeners: function() {
            events.remove(this.model.dataLoadEvent, this.onDataLoaded );
            events.remove('filtersUpdated', this.onDataLoaded );
        },


        initialize: function(options) {
            this.options = options;     // want to set this here?  or unpack it?
            this.model = options.model;
            this.setupListeners();
        },

        // TODO - this will always be different - probably?
        //template: allEventsHtml,

        onShow: function() {
            //$('.page-title').text(this.pageTitle);
        },

        onBeforeDestroy: function() {
            this.removeListeners();
        },

        onDataLoaded: function() {
            console.log('baseView.onDataLoaded');
            this.createDataViz();
        },

        createDataViz: function() {

            // THIS WILL ALWAYS BE OVERRIDDEN

        },

        onRenderComplete: function() {
            events.dispatch('renderComplete');
        }



    });


    return view;

    }

);

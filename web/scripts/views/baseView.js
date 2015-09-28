define([
    'marionette',
    'utils/events',
    'config/pageConfig'

     ], function(
         Marionette,
         events,
         pageConfig
        ) {


        /*
        what's different?
        - specific data loaded event
        - graph create method
        - selectors - graph, el
        - template

        */


    var view = Backbone.Marionette.LayoutView.extend({

        templatePath: null,

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
            this.pageName = options.pageName;
            this.setupListeners();

            this.setTemplate();
        },

        setTemplate: function(options) {

            this.templatePath = this.getTemplatePath();
            
            require(['text!' + this.templatePath], 
                function(template) {

                    console.log('hi template');
                    this.template = template;

                }.bind(this)
            );
        },

        getTemplatePath: function() {
            var newTemplateName;
            if (pageConfig[this.pageName].pageTemplate) {
                //newTemplateName = eval(pageConfig[this.pageName].pageTemplate);
                newTemplateName = pageConfig[this.pageName].pageTemplate;
                // TODO: dynamic require
            } else {
                newTemplateName = 'templates/BaseTemplate.html';
            }

            return newTemplateName;

        },

        // TODO - this will always be different - probably?
        //template: allEventsHtml,

        onShow: function() {
            //$('.page-title').text(this.pageTitle);
            console.log('view.onShow');
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

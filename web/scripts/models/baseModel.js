define([
    'backbone',
    'd3',
    'utils/events',
    'config/appConfig',
    'models/filters/filters'
    ],
     function(
         Backbone,
         d3,
         events,
         config,
         Filters
    ) {

        /*
        what's different?
        - api url
        - specific process data fn
        - specific loaddata event
        - download data fn
        - filters available

        */

        var model = Backbone.Model.extend({

            apiPath: null,   // set in subclass
                            // TODO - have this set in config object?

            dataLoadEvent: null,    // event to listent to when data loaded

            pageDataObj: {},    // set of config options for the page

            enabledFlters: [],        // set of filter names enabled for this model instance

            filters: null,      // actual filters module

            rawData: null,

            processedData: null,

            /*
            Options hash contains data about page, filters, loading data, initial data, etc.
            */
            initialize: function(options) {
                if (options && options.filters) {
                    this.filters = options.filters;
                }

                this.setPageData(options);

                // for now we'll just load all filters - maybe later load on demand
            },



            loadData: function() {

                d3.csv(config.baseUrl + this.apiPath)
                    .get(_.bind(this.handleLoadedData, this));

            },

            handleLoadedData: function(error, data) {
                if (!error) {
                    this.rawData = data;
                    events.dispatch(this.dataLoadEvent);
                } else {
                    console.log('ERROR loading data: ' + error);
                }
            },

            setPageData: function(dataObj) {
                this.pageDataObj = dataObj;
            },

            setRawData: function(data) {
                this.rawData = data;
            },

            getRawData: function() {
                return this.rawData;
            },

            /*
            * Return all raw data, run against any enabled filters
            */
            getFilteredData: function() {
                return _.filter(this.rawData, _.bind(this.testAgainstFilters, this));
            },

            getProcessedData: function() {
                return this.processedData;
            },

            processData: function() {
                // we will always override this!
            },

            /*
            * test item against all enabled filters
            * if all come back true, return true
            * if one comes back false, return false
            */
            testAgainstFilters: function(item) {

                var doInclude = true;
                // loop through all enabled filters
                for (var i=0; i < this.enabledFilters.length; i++) {

                    if (!this.filters[this.enabledFilters[i]].test(item)) {
                        doInclude = false;
                        break;
                    }
                }
                return doInclude;
            }

        });

        return model;


    }
);

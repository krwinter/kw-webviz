define([
    'models/baseModel',
    'models/fourUpEmailModel',
    'models/fourUpEventModel',
    'models/fourUpEventTotalsModel',
    'utils/events',
    'utils/format',
    'config/appConfig'
    ],
     function(
         BaseModel,
         FourUpEmailModel,
         FourUpEventModel,
         FourUpEventTotalsModel,
         events,
         format,
         config
    ) {

        /*
        what's different?
        - api url
        - specific process data fn
        - specific loaddata event
        - download data fn
        - filters available

        */

        var model = BaseModel.extend({

            //apiUrl: config.emailApiUrl,

            //dataLoadEvent: 'emailActivityDataLoaded',

            //enabledFilters: ['utility', 'date'],

            emailModelInstance: null,

            eventModelInstance: null,

            eventTotalsModelInstance: null,

            initialize: function(options) {
                // instantiate 3 models
                this.emailModelInstance = new FourUpEmailModel(options);
                this.eventModelInstance = new FourUpEventModel(options);
                this.eventTotalsModelInstance = new FourUpEventTotalsModel(options);
                BaseModel.prototype.initialize.call(this);
            },

            loadData: function() {
                // run laod data for all 3 models
                this.emailModelInstance.loadData();
                this.eventModelInstance.loadData();
                this.eventTotalsModelInstance.loadData();
            },


            processData: function(type) {

                // proxy this through to individual model?
            }

        });

        return model;

    }
);

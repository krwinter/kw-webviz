define([
    'models/baseModel',
    'utils/events',
    'utils/format',
    'config/appConfig'
    ],
     function(
         BaseModel,
         events,
         format,
         config
    ) {

        var model = BaseModel.extend({

            apiPath: config.eventTotalsApiPath,

            dataLoadEvent: 'fourUpEventTotalsDataLoaded',

            enabledFilters: [],

            processData: function(utilityId) {

                // we have e_date_id,e_type,e_count,e_utility_id
                var data = this.getRawData();

                // return a hash

                var streamObj = new Object();

                for (var j=0; j<data.length; j++) {

                    // if area name is in event_type, and not a 'total', add it
                    if (data[j].utility_id == utilityId) {

                        streamObj[data[j]['event_type']] = data[j].event_count;
                    }

                }

                processedData = streamObj

                return processedData;
            }

        });

        return model;

    }
);

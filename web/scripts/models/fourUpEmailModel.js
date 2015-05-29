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

            apiPath: config.emailApiPath,

            dataLoadEvent: 'fourUpEmailDataLoaded',

            enabledFilters: [],

            processData: function(utilityId, eventType) {

                var data = this.getRawData();

                var streamObj = new Object();
                streamObj.values = [];

                for (var j=0; j<data.length; j++) {

                    // if area name is in event_type, and not a 'total', add it
                    if (data[j].utility_id == utilityId) {

                        var valueObj = new Object();
                        valueObj.x = +data[j].date_id;
                        valueObj.y = +data[j][eventType];
                        streamObj.values.push(valueObj);
                    }

                }

                processedData = streamObj.values;

                return processedData;
            }

        });

        return model;

    }
);

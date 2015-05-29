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

        /*
        what's different?
        - api url
        - specific process data fn
        - specific loaddata event
        - download data fn
        - filters available

        */

        var model = BaseModel.extend({

            apiPath: config.emailApiPath,

            dataLoadEvent: 'emailActivityDataLoaded',

            enabledFilters: ['utility', 'date'],

            /*
            * This should return an array of objects
            * Each object should have:
            * - key: name of series
            * - color: color of line
            * - area: (optional) - true if filled
            * - values: array of value objects
            *     - valueObj - { x: xval y: yval }
            */
            processData: function(type) {

                var mainArr = [];
                var streamObj = {};
                var valuesArr = [];

                // loop through and pull out categories
                var colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff']
                var totalsKeys = ['sent', 'delivered', 'opened', 'clicks'];
                var rateKeys = ['open_rate', 'click_rate', 'click_to_open'];
                var activeKeys = rateKeys;

                if (type == 'totals') {
                    activeKeys = totalsKeys;
                }

                var data = this.getRawData();

                var utilityId = 1;

                // TODO - better to loop through keys, or all data 1st?
                for (var i=0; i < activeKeys.length; i++) {

                    var streamObj = new Object();
                    streamObj.key = activeKeys[i];
                    streamObj.color = colors[i];
                    streamObj.values = [];

                    for (var j=0; j<data.length; j++) {

                        // if meets criteria set in filters, include them in data set
                        if (this.testAgainstFilters(data[j])) {
                            var valueObj = new Object();
                            valueObj.x = format.dateIdToUnixTime(data[j].date_id);
                            valueObj.y = +data[j][activeKeys[i]];
                            streamObj.values.push(valueObj);
                        }
                    }
                    mainArr.push(streamObj);
                }
                this.processedData = mainArr;
                return mainArr;
            }

        });

        return model;

    }
);

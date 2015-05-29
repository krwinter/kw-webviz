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


            apiPath: config.activationsApiPath,

            dataLoadEvent: 'activationsDataLoaded',

            enabledFilters: ['engagementEvent', 'utility', 'date'],

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

                this.filters.engagementEvent.filterValue = type;

                var mainArr = [];
                var streamObj = {};
                var valuesArr = [];


                var data = this.getRawData();

                var barObj = new Object();
                barObj.key = this.filters.engagementEvent.filterValue || 'Activations';
                barObj.bar = true;
                barObj.values = [];

                var lineObj = new Object();
                lineObj.key = 'Cumulative';
                lineObj.values = [];

                var total_events = 0;
                for (var j=0; j<data.length; j++) {

                    // CURRENTLY only have activations - TODO - unify
                    // if area name is in event_type, and not a 'total', add it
                    //if (data[j].event_type.indexOf(areas[i]) > -1) {
                        // if meets criteria set in filters, include them in data set
                        if (this.testAgainstFilters(data[j])) {
                            var valueObj = new Object();
                            valueObj.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                            valueObj.y = +data[j].event_count;
                            barObj.values.push(valueObj);

                            total_events += +data[j].event_count
                            var valueObj2 = new Object();
                            valueObj2.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                            valueObj2.y = +total_events;
                            lineObj.values.push(valueObj2);
                        }
                    //}

                }

                mainArr.push(barObj);
                mainArr.push(lineObj);


                this.processedData = mainArr;

                return mainArr;
            }

        });

        return model;


    }
);

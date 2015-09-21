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


            apiPath: config.brewTempApiPath,

            dataLoadEvent: 'brewTempDataLoaded',

            // available filters: 'engagementEvent', 'utility', 'date'
            enabledFilters: ['timestamp'],


            processData: function() {


                var mainArr = [];
                var streamObj = {};
                var valuesArr = [];


                var data = this.getRawData();

                // var eBarObj = new Object();
                // eBarObj.key = 'Set Temp';
                // eBarObj.type = 'bar';
                // eBarObj.yAxis = 1;
                // eBarObj.values = [];

                // var uBarObj = new Object();
                // uBarObj.key = 'UnEnrollments';
                // uBarObj.type = 'bar';
                // uBarObj.yAxis = 1;
                // uBarObj.values = [];

                var tempLine = new Object();
                tempLine.key = 'Temp';
                tempLine.type = 'line';
                tempLine.yAxis = 2;
                tempLine.values = [];

                var relayLine = new Object();
                relayLine.key = 'RelayState';
                relayLine.type = 'line';
                relayLine.yAxis = 1;
                relayLine.values = [];

                var total_events = 0;
                for (var j=0; j<data.length; j++) {


                        // if meets criteria set in filters, include them in data set
                        if (this.testAgainstFilters(data[j]) && j % 50 === 0) {
                            var tempValueObj = new Object();
                            tempValueObj.x = data[j].timestamp; // may later be date
                            tempValueObj.y = +data[j].t2;
                            tempLine.values.push(tempValueObj);

                            var relayValueObj = new Object();
                            relayValueObj.x = data[j].timestamp; // may later be date
                            relayValueObj.y = +data[j].relay_state;
                            relayLine.values.push(relayValueObj);

                        }
                    //}

                }

                mainArr.push(tempLine);
                mainArr.push(relayLine);

                this.processedData = mainArr;

                return mainArr;
            }

        });

        return model;


    }
);

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


            apiPath: config.enrollmentsApiPath,

            dataLoadEvent: 'enrollmentsDataLoaded',

            // available filters: 'engagementEvent', 'utility', 'date'
            enabledFilters: [],


            processData: function() {


                var mainArr = [];
                var streamObj = {};
                var valuesArr = [];


                var data = this.getRawData();

                var eBarObj = new Object();
                eBarObj.key = 'Enrollments';
                eBarObj.type = 'bar';
                eBarObj.yAxis = 1;
                eBarObj.values = [];

                var uBarObj = new Object();
                uBarObj.key = 'UnEnrollments';
                uBarObj.type = 'bar';
                uBarObj.yAxis = 1;
                uBarObj.values = [];

                var lineObj = new Object();
                lineObj.key = 'Total Enrolled';
                lineObj.type = 'line';
                lineObj.yAxis = 2;
                lineObj.values = [];

                var total_events = 0;
                for (var j=0; j<data.length; j++) {


                        // if meets criteria set in filters, include them in data set
                        if (this.testAgainstFilters(data[j])) {
                            var eValueObj = new Object();
                            eValueObj.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                            eValueObj.y = +data[j].enrollments;
                            eBarObj.values.push(eValueObj);

                            var uValueObj = new Object();
                            uValueObj.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                            uValueObj.y = +data[j].unenrollments;
                            uBarObj.values.push(uValueObj);

                            total_events += +data[j].enrollments - data[j].unenrollments
                            var valueObj2 = new Object();
                            valueObj2.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                            valueObj2.y = +total_events;
                            lineObj.values.push(valueObj2);
                        }
                    //}

                }

                mainArr.push(uBarObj);
                mainArr.push(eBarObj);
                mainArr.push(lineObj);


                this.processedData = mainArr;

                return mainArr;
            }

        });

        return model;


    }
);

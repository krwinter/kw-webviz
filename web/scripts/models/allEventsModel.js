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


            apiPath: config.allEventsApiPath,

            dataLoadEvent: 'allEventsDataLoaded',

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

                // here key is e_event_type
                // value.y is e_count ()
                // value.x is either day

                var mainArr = [];
                var streamObj = {};
                var valuesArr = [];

                // loop through and pull out categories
                //var areas = ['Activat', 'Badge', 'Enroll', 'LoggedIn',
                //            'OptOut','PaperToWeb', 'Program', 'Reward', 'Tip', 'Unsubscribed'];
                //var areas = ['Activat', 'Enroll'];
                //var areas = ['Activated'];
                //var areas = ['PaperToWeb'];
            //    var areas = ['LoggedIn'];
                //var areas = ['OptOut'];
                //var areas = ['Unsubscribed'];
                var areas;
                var siteEvents = ['Badge', 'Program', 'Reward', 'Tip'];
                //var areas = ['Enrolled', 'EnrollEmailSent', 'EnrollEmailOpened'];
                //var funnelEvents = ['Activat', 'Enroll', 'PaperToWeb', 'LoggedIn', 'OptOut', 'Unsubscribed'];
                var funnelEvents = ['Activat', 'Enroll', 'LoggedIn'];

                if (type == 'funnel') {
                    areas = funnelEvents;
                } else {
                    areas = siteEvents;
                }

                var data = this.getRawData();

                for (var i=0; i < areas.length; i++) {

                    var streamObj = new Object();
                    streamObj.key = areas[i];
                    streamObj.values = [];

                    for (var j=0; j<data.length; j++) {

                        // if area name is in event_type, and not a 'total', add it
                        if (data[j].event_type.indexOf(areas[i]) > -1) {

                            // if meets criteria set in filters, include them in data set
                            if (this.testAgainstFilters(data[j])) {
                                var valueObj = new Object();
                                valueObj.x = format.dateIdToUnixTime(data[j].date_id); // may later be date
                                valueObj.y = +data[j].event_count;
                                streamObj.values.push(valueObj);
                            }
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

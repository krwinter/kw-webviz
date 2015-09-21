define([
    'marionette',
    'utils/events',
    'utils/utils',
    'utils/format',
    'config/appConfig'
    ],
    function(
        Marionette,
        events,
        utils,
        format,
        appConfig
    ) {

        /*
        * Set of available filters
        */
        var filters = Marionette.Controller.extend({

            app: null,

            initialize: function() {
                console.log('****** init filters ******');
                events.listen('engagementEventFilterChange', this.engagementEvent.update, this.engagementEvent);
                events.listen('utilityFilterChange', this.utility.update, this.utility);
                events.listen('dateFilterChange', this.date.update, this.date);
                events.listen('dateFilterChange', this.timestamp.update, this.timestamp);

                //events.listen('appStart', this.appStart, this);
                this.setFiltersFromQs();

            },

            appStart: function(app) {
                this.app = app;
                this.setFiltersFromQs();
            },

            setFiltersFromQs: function() {

                var qsObj = utils.getQuerystringObject();

                // iterate through keys
                for (var key in qsObj) {

                    var filter,  // filter qs val acts on
                        filterParam,    // start, end for example
                        eventObj = {};  
                    //go through array of filter qs values
                    if (_.contains(appConfig.qsFilters, key)) {
                        eventObj[key] = qsObj[key]
                        events.dispatch('filterValuesSet', eventObj);

                        // map start
                        if (key.indexOf('start') ==0) {
                            filterParam = 'start';
                            filter = key.substring(5).toLowerCase();
                        } else if (key.indexOf('end') ==0) {
                            filterParam = 'end';
                            filter = key.substr(3).toLowerCase();
                        } else {
                            filter = key;
                        }

                        this[filter].set(qsObj[key], filterParam);
                    }



                }

            },

            utility: {

                getQs: function() {
                    return 'utility=' + this.filterValue;
                },

                set: function(value) {
                    this.filterValue = value;
                },

                update: function(value) {
                    this.set(value);
                    events.dispatch('filtersUpdated');
                },

                filterKey: 'utility_id',

                filterValue: "1",  // all data in csv is a string, as well as ui filter select

                test: function(obj) {

                    if (obj[this.filterKey] == this.filterValue) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },

            date: {

                getQs: function(param) {
                    if (param == 'start') {
                        return 'startDate=' + this.filterMin;
                    } else {
                        return 'endDate=' + this.filterMax;
                    }
                },

                // we can get an array, a start date, or an end date
                set: function(dateId, param) {

                    var start,
                        end;

                    if (_.isArray(dateId)) {
                        if (dateId[1] > dateId[0]) {
                            start = dateId[0];
                            end = dateId[1];
                        } else {
                            start = dateId[1];
                            end = dateId[0]; 
                        }
                        this.filterMin = start;
                        this.filterMax = end;
                    } else if (param == 'start') {
                        this.filterMin = dateId;
                    } else if (param == 'end') {
                        this.filterMax = dateId;
                    }
                
                },

                update: function(dateArr) {
                    var dateIdArray = dateArr.map(format.dateIdFromSlashDate);
                    this.set(dateIdArray);
                    events.dispatch('filtersUpdated');
                },

                filterKey: 'date_id',

                filterMin: 20130801,

                filterMax: 20160101,

                test: function(obj) {

                    //return true;

                    if (obj[this.filterKey] >= this.filterMin && obj[this.filterKey] <= this.filterMax) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            timestamp: {

                getQs: function(param) {
                    if (param == 'start') {
                        return 'startDate=' + this.filterMin;
                    } else {
                        return 'endDate=' + this.filterMax;
                    }
                },

                // we can get an array, a start date, or an end date
                set: function(dateId, param) {

                    var start,
                        end;

                    if (_.isArray(dateId)) {
                        if (dateId[1] > dateId[0]) {
                            start = dateId[0];
                            end = dateId[1];
                        } else {
                            start = dateId[1];
                            end = dateId[0]; 
                        }
                        this.filterMin = start;
                        this.filterMax = end;
                    } else if (param == 'start') {
                        this.filterMin = dateId;
                    } else if (param == 'end') {
                        this.filterMax = dateId;
                    }
                
                },

                update: function(dateArr) {
                    var dateIdArray = dateArr.map(format.dateIdFromSlashDate).map(format.dateIdToUnixTime);
                    this.set(dateIdArray);
                    events.dispatch('filtersUpdated');
                },

                filterKey: 'timestamp',

                filterMin: 1436918400,

                filterMax: Math.floor(Date.now() / 1000),

                test: function(obj) {

                    //return true;

                    if (obj[this.filterKey] >= this.filterMin && obj[this.filterKey] <= this.filterMax) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            engagementEvent: {

                getQs: function() {
                    return 'engagementEvent=' + this.filterValue;
                },

                set: function(value){
                    this.filterValue = value;
                },

                update: function(value) {
                    this.set(value);
                    events.dispatch('filtersUpdated');
                },

                filterKey: 'event_type',

                filterValue: "Activated",  // all data in csv is a string, as well as ui filter select

                test: function(obj) {

                    if (obj[this.filterKey] == this.filterValue) {
                        return true;
                    } else {
                        return false;
                    }

                }
            }
        });

        return filters;

    }
);

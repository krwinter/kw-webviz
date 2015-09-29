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

            filterSet: {

                // key values of current filters and their settings
                // date: {
                    //max: xxxxxx,
                    //min: xxxxx
                //},
                //etc

            },

            initialize: function() {
                console.log('****** init filters ******');
                events.listen('dateFilterChange', this.timestamp.update, this.timestamp);

                // in  case we want to do amythign on page change
                events.listen("navToPage", this.onNewPage, this);

                //events.listen('appStart', this.appStart, this);
                this.setFiltersFromQs();

            },

            appStart: function(app) {
                this.app = app;
                this.setFiltersFromQs();
            },

            onNewPage: function() {
                // set filters to defaults, for one
                this.timestamp.onPageChange();
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

            // date time is in utc timestamp
            timestamp: {

                onPageChange: function() {

                    // here just set defaults if not set yet
                    if (!this.filterMin) {
                        this.filterMin = Math.floor(Date.now() / 1000) - 7776000; // 3 months before
                    }

                    if (!this.filterMax) {
                        this.filterMax = Math.floor(Date.now() / 1000);
                    }

                    var eventObj = { startDate: this.filterMin, endDate: this.filterMax};
                    events.dispatch('filterValuesSet', eventObj);

                },

                getQs: function(param) {
                    if (param == 'start') {
                        return 'startDate=' + this.filterMin;
                    } else {
                        return 'endDate=' + this.filterMax;
                    }
                },

                // we can get an array, a start date, or an end date
                set: function(dateValue, param) {

                    var start,
                        end;

                    if (_.isArray(dateValue)) {
                        if (dateValue[1] > dateValue[0]) {
                            start = dateValue[0];
                            end = dateValue[1];
                        } else {
                            start = dateValue[1];
                            end = dateValue[0]; 
                        }
                        this.filterMin = start;
                        this.filterMax = end;
                    } else if (param == 'start') {
                        this.filterMin = dateValue;
                    } else if (param == 'end') {
                        this.filterMax = dateValue;
                    }
                
                },

                update: function(dateArr) {
                    var dateIdArray = dateArr.map(format.timestampFromDate);
                    this.set(dateIdArray);
                    events.dispatch('filtersUpdated');
                },

                filterKey: 'timestamp',

                filterMin: null,

                filterMax: null,

                test: function(obj) {

                    //return true;

                    if (obj[this.filterKey] >= this.filterMin && obj[this.filterKey] <= this.filterMax) {
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

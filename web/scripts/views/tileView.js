define([
    "marionette",
    "text!templates/utilityTile.html",
    "models/fourUpEventModel",
    "models/fourUpEmailModel",
    "models/fourUpEventTotalsModel",
    'views/baseView',
    "utils/events",
    "nvd3"
    ],
    function(
        Marionette,
        mainHtml,
        EventData,
        EmailData,
        EventTotalsData,
        BaseView,
        events,
        nv
    ) {


        var view = BaseView.extend({

            eventGraphHash: {
                    'Activated': '#signup svg',
                    "LoggedIn": '#login svg',
                    'TipCompleted': '#tip svg',
                    'RewardRedeemed': '#reward svg'
            },

            emailGraphHash: {
                'open_rate': '#email-open svg',
                'click_rate': '#email-click svg'
            },

            eventTotalsHash: {
                'Activated': '#signup .total',
                 'LoggedIn': '#login .total',
                 'TipCompleted': '#tip .total',
                 'RewardRedeemed':'#reward .total',
                 'open_rate': '#email-open .total',
                 'click_rate': '#email-click .total'
            },

            //graphSelectorBase: "utility-data-",
            graphSelectorBase: "tile-id-",

            emailModelInstance: null,

            eventModelInstance: null,

            eventTotalsModelInstance: null,

            utilityId: null,

            utilityName: null,

            //graphController: fourUpDataController,

            initialize: function (options) {

                this.utilityId = options.utilityId;
                this.utilityName = options.utilityName;

                this.eventModelInstance = options.model.eventModelInstance;
                this.emailModelInstance = options.model.emailModelInstance;
                this.eventTotalsModelInstance = options.model.eventTotalsModelInstance;

                events.listen(this.eventModelInstance.dataLoadEvent, this.onEventDataLoaded, this);
                events.listen(this.emailModelInstance.dataLoadEvent, this.onEmailDataLoaded, this);
                events.listen(this.eventTotalsModelInstance.dataLoadEvent, this.onEventTotalsDataLoaded, this);

            },


            template: function (serialized_model) {
                var name = serialized_model.utilityName
                return _.template(mainHtml)({
                    utilityName: name
                });
            },


            onRender: function() {

                //console.log('TileView.onRender'); // this fires

            },


            // TODO - put data loading in controller or model
            onEventDataLoaded: function() {

                for (eventType in this.eventGraphHash) {
                    this.buildEventGraph(eventType, this.eventGraphHash[eventType]);
                }

            },


            onEmailDataLoaded: function() {

                for (eventType in this.emailGraphHash) {
                    this.buildEmailGraph(eventType, this.emailGraphHash[eventType]);
                }

                // some of our totals data is in here too - UGLY
                this.buildEmailTotalsDisplay();
            },


            onEventTotalsDataLoaded: function() {

                this.buildEventTotalsDisplay();
            },


            getGraphSelector: function(domSelector) {

                return "#" + this.graphSelectorBase + String(this.utilityId) + " " + domSelector;

            },


            buildEventTotalsDisplay: function() {

                var processedData = this.eventTotalsModelInstance.processData(this.utilityId);

                for (eventType in this.eventTotalsHash) {
                    // hacky!
                    var totalValue;
                    if (eventType.indexOf('_rate') == -1) {
                        totalValue = processedData[eventType];

                        var domSelector = this.getGraphSelector(this.eventTotalsHash[eventType]);

                        d3.select(domSelector)
                            .html("<p>" + totalValue + "</p>");
                    }
                }
            },


            buildEmailTotalsDisplay: function() {
                for (eventType in this.eventTotalsHash) {
                    // hacky!
                    var totalValue;
                    if (eventType.indexOf('_rate') > -1) {

                        // go backwards till we get the last one for this utility_id
                        var rawData = this.emailModelInstance.getRawData();

                        for (var i = rawData.length -1; i--; i >= 0) {

                            if (rawData[i]['utility_id'] == this.utilityId) {
                                totalValue = String( Math.round(Number(rawData[i][eventType]) * 1000) / 10) + "%";
                                var domSelector = this.getGraphSelector(this.eventTotalsHash[eventType]);

                                d3.select(domSelector)
                                    .html("<p>" + totalValue + "</p>");
                                break;
                            }
                        }

                    }
                }
            },


            buildEventGraph: function(eventType, domSelector) {
                var processedData = this.eventModelInstance.processData(this.utilityId, eventType);
                var graphInstanceDomSelector = this.getGraphSelector(domSelector);

                nv.addGraph(function() {
                    var chart = nv.models.sparklinePlus()
                    chart
                    //.margin({left:70})
                    .x(function(d,i) {
                        return i;
                    })
                    .xTickFormat(function(d,i) {
                        return processedData[d].e_date_id;
                    })
                    .height(50)
                    .width(100)
                    //.color(function() {return '#00ff00'})
                    ;
                    d3.select(graphInstanceDomSelector)
                        .datum(processedData)
                        .transition().duration(250)
                        .call(chart);
                    return chart;
                });

            },


            buildEmailGraph: function(eventType, domSelector) {
                var processedData = this.emailModelInstance.processData(this.utilityId, eventType);
                var graphInstanceDomSelector = this.getGraphSelector(domSelector);

                var emailChart = nv.addGraph(function() {
                    var chart = nv.models.sparklinePlus();

                    chart.margin({left:70})
                    //.attr("height", 100);
                    .x(function(d,i) {
                        return i;
                    })
                    .xTickFormat(function(d,i) {
                        return processedData[d].send_date;
                    });

                    d3.select(graphInstanceDomSelector)
                        .datum(processedData)
                        .transition().duration(250)
                        .call(chart);
                    return chart;
                });

            },

            createDataViz: function() {

                // do nothing - subviews will handle

            },
        });


        return view;

});

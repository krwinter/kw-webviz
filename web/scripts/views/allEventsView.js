define([
    'utils/events',
    'views/baseView',
     'text!templates/allEvents.html',
     'nvd3',
     'nv_utils',
     'utils/format'
     ], function(
         events,
         BaseView,
         templateHtml,
         nv,
         nv_utils,
         format
        ) {


        /*
        what's different?
        - specific data loaded event
        - graph create method
        - selectors - graph, el
        - template

        */


    var view = BaseView.extend({

        graphHolderSelector: '#graph-holder',

        chartSelector: '#chart svg',

        // TODO - this should be in model
        pageTitle: 'All Events',

        aboutContent: 'These are ALL the events for a specified date range.',

        template: templateHtml,

        createDataViz: function() {

            nv.addGraph(_.bind(this.buildGraph,this));

        },

        buildGraph: function(data) {

            var data;
            if (this.options.chartView && this.options.chartView == 'funnel') {
                data = this.model.processData('funnel');
            } else {
                data = this.model.processData();
            }

            var chart = nv.models.multiBarChart();

            chart.xAxis
            .tickFormat(function(d,i) {
                //return d;
                return new Date(d).toLocaleDateString();
            });

            chart.yAxis
            .tickFormat(d3.format(',f'));


            chart.width(800)
                .height(600);

            d3.select('#chart svg')
            .datum(data)
            .transition().duration(500)
            .call(chart)
            ;

            nv.utils.windowResize(chart.update);

            return chart;

        }

    });


    return view;

    }

);

define([
    'utils/events',
    'views/baseView',
     'text!templates/enrollments.html',
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

        template: templateHtml,

        createDataViz: function() {

            nv.addGraph(_.bind(this.buildGraph,this));

        },

    buildGraph: function() {

            $('#chart svg').empty();

            var data = this.model.processData();

            //var chart = nv.models.linePlusBarChart();
            var chart = nv.models.multiChart();

            chart
                .width(1000)
                .color(d3.scale.category10().range());

            chart.xAxis.tickFormat(function(d,i) {
                    //return d3.time.format('%x')(new Date(d))
                    return new Date(d).toLocaleDateString();
                })
                .showMaxMin(false);


            d3.select('#chart svg')
                .datum(data)
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);


            return chart;

        }

    });


    return view;

    }

);

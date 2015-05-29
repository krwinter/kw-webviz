define([
    'utils/events',
    'views/baseView',
     'text!templates/activations.html',
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

        buildGraph: function() {

            $('#chart svg').empty();

            var data;

            if (this.options.eventType) {
                data = this.model.processData(this.options.eventType);
            }

            var chart = nv.models.linePlusBarChart();

            chart.margin({top: 50, right: 60, bottom: 30, left: 70})
                .x(function(d,i) { 
                    //console.log('date=' + d.x);
                    return d.x 
                })
                //.legendRightAxisHint(' [Using Right Axis]')
                .color(d3.scale.category10().range())
                .focusEnable(true);

            chart.xAxis.tickFormat(function(d,i) {
                    //return d3.time.format('%x')(new Date(d))
                    return new Date(d).toLocaleDateString();
                })
                .showMaxMin(false);

            chart.y1Axis.tickFormat(function(d) { return d3.format(',f')(d) });
            chart.bars.forceY([0]).padData(false);

            chart.x2Axis.tickFormat(function(d,i) {
                //return d3.time.format('%x')(new Date(d))
                return new Date(d).toLocaleDateString();
            }).showMaxMin(false);

            d3.select('#chart svg')
                .datum(data)
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);

            chart.dispatch.on('stateChange', function(e) {
                nv.log('New State:', JSON.stringify(e)); 
            });

            return chart;

        }

    });


    return view;

    }

);

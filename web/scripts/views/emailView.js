define([
    'utils/events',
    'views/baseView',
     'text!templates/email.html',
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
        pageTitle: 'EmailActivity',

        aboutContent: 'These are ALL the emails for a specified date range.',

        sql: "\
        SELECT \
            utility_id,\
            replace(send_date::date::varchar, '-','') AS date_id,\
            sent,\
            delivered,\
            opened,\
            clicks,\
            open_rate,\
            click_rate,\
            click_to_open\
        FROM\
            mvw_email_summary_90_days;"
        ,

        template: templateHtml,

        createDataViz: function() {
            this.createRatesGraph();
            this.createTotalsGraph();
        },

        createRatesGraph: function() {
            nv.addGraph(_.bind(this.buildGraph,this, 'rates'));
        },

        createTotalsGraph: function() {
            nv.addGraph(_.bind(this.buildGraph,this, 'totals'));
        },

        buildGraph: function(type) {

            var chartSelector = '#rates-chart svg';

            if (type=='totals') {
                chartSelector = '#totals-chart svg';
            }

            var data = this.model.processData(type);

            chart = nv.models.lineChart()
                .options({
                    transitionDuration: 300,
                    useInteractiveGuideline: true
                })
            ;

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            chart.xAxis
                .axisLabel("Send Date")
                .tickFormat(function(d,i) {
                    return new Date(d).toLocaleDateString();
                });
            ;

            if (type=='rates') {
                chart.yAxis
                    .axisLabel('Rate')
                    .tickFormat(d3.format('%.1f'))
                ;
            } else {
                chart.yAxis
                    .axisLabel('Totals')
                    .tickFormat(d3.format(',f'))
                ;
            }

            chart.showXAxis(true);

            chart.yDomain([0, d3.max(data, function (d) {
                return d3.max(d.values, function(e) {
                        return e.y;
                    });
                })
            ]);

            d3.select(chartSelector)
                .datum(data)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;

        }

    });


    return view;

    }

);

define([
    'utils/events',
    'views/baseView',
    'text!templates/transaction.html',
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

        tableItemsHolderSelector: '#transactions-table-items-holder',
        tableTotalsHolderSelector: '#transactions-table-totals-holder',


        itemColumnHash: [
            //{ 'id': '' },
            { 'transaction_time':'Date/Time' },
            { 'merchant_name': 'Merchant' },
            { 'quantity': 'Quantity' },
            { 'item_name': 'Item Name' },
            { 'sku': 'SKU Number' },
            { 'sales_amount': 'Sales ($)' },
            { 'commission_amount': 'Commissions ($)' },
            { 'commission_percentage': 'Commissions (%)' }
        ],

        // TODO - way to avoind having to manually keep keys in sync with model?
        totalColumnHash: [
            { 'merchantName': 'Merchant' },
            { 'totalNumberPurchases': '# Purchases' },
            { 'totalValuePurchases': '$ Purchases' },
            { 'totalClicks': 'Total Referral Clicks' },
            { 'totalValueCommissions': 'Total $ Commission' },
            { 'averagePercentageCommission': 'Net Commission %' }
        ],

        // TODO - this should be in model
        pageTitle: 'Marketplace Transactions',

        aboutContent: 'We get both a summary view as well as item view of all marketplace transactions for a specified date range.',

        template: templateHtml,

        createDataViz: function() {
            // clear any old stuff first
            $(this.tableTotalsHolderSelector).empty();
            $(this.tableItemsHolderSelector).empty();

            this.createSummaryTable();
            this.createItemTable();

            // signal end of rendering
            this.onRenderComplete();
        },

        createSummaryTable: function() {

            var data = this.model.getTransactionsByAllMerchants(),
                columns = this.totalColumnHash;


            var table = d3.select(this.tableTotalsHolderSelector).append("table").classed('table summary-table', true),
                thead = table.append("thead"),
                tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data( this.getTotalColumnHeaderNames())
                //.data(columns)
                .enter()
                .append("th")
                    .text(function(d) {
                        return d;
                    });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function(row) {
                    return columns.map(function(column) {
                        // TODO - find more elegant way to get key name? - is this the best way?
                        // this only works if each column obj has only a single key
                        var key = _.keys(column)[0];
                        return {column: key, value: row[key]};
                    });
                })

                .enter()
                .append("td")
                    .text(function(d) {
                        return d.value;
                });

            return table;
        },

        // TODO - find more elegant way to do this? - preferably inline
        getItemColumnHeaderNames: function() {
            var columnHeaders = [];
            _.each(this.itemColumnHash, function(columnObj) {
                // this only works if each column obj has only a single key
                columnHeaders.push(_.values(columnObj)[0]);

            });

            return columnHeaders;
        },

        // TODO - find more elegant way to do this? - preferably inline
        getTotalColumnHeaderNames: function() {
            var columnHeaders = [];
            _.each(this.totalColumnHash, function(columnObj) {
                // this only works if each column obj has only a single key
                columnHeaders.push(_.values(columnObj)[0]);
            });

            return columnHeaders;
        },

        createItemTable: function() {

            var data = this.model.getFilteredData(),
                columns = this.itemColumnHash;

            var table = d3.select(this.tableItemsHolderSelector).append("table").classed('table item-table', true),
                thead = table.append("thead"),
                tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data( this.getItemColumnHeaderNames())
                //.data(columns)
                .enter()
                .append("th")
                    .text(function(d) {
                        return d;
                    });
                    //.text(function(column) { return column; });
            if (data.length > 0) {
            // create a row for each object in the data
                var rows = tbody.selectAll("tr")
                    .data(data)
                    .enter()
                    .append("tr");

                // create a cell in each row for each column
                var cells = rows.selectAll("td")
                    .data(function(row) {
                        return columns.map(function(column) {
                            // TODO - find more elegant way to get key name? - is this the best way?
                            // this only works if each column obj has only a single key
                            var key = _.keys(column)[0];
                            return {column: key, value: row[key]};
                        });
                    })

                    .enter()
                    .append("td")
                        .text(function(d) {
                            return d.value;
                    });
            } else {
                tbody.append("tr")
                    .append("td")
                    .attr("colspan", 9)
                    .attr("class","report-params")
                    .text("No transactions for the specified date range");
            }

            return table;
        }

    });

    return view;

});

define([
    'utils/events',
    'views/baseView',
    'text!templates/rebate.html',
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

        tableItemsHolderSelector: '#rebates-table-items-holder',
        tableTotalsHolderSelector: '#rebates-table-totals-holder',


        itemColumnHash: [
            { 'id': '' },
            { 'transaction_time':'Date/Time' },
            { 'quantity': 'Quantity' },
            { 'rebate_name': 'Quantity' },
            { 'item_name': 'Item Name' },
            { 'make': 'Make' },
            { 'model_number': 'Model Number' },
            { 'upc_code': 'UPC Code' },
            { 'purchase_price': 'Purchase Price' },
            { 'rebate_value': 'Rebate Value' },
            { 'account_number': 'Utility Account #' },
            { 'account_name': 'Name on Account' },
            { 'billing_address': 'Billing Address' },
            { 'shipping_address': 'Shipping Address' },
            { 'date_id': 'DateId' },
        ],

        // TODO - way to avoind having to manually keep keys in sync with model?
        totalColumnHash: [
            { 'vendorName': 'Vendor' },
            { 'totalNumberPurchases': '# Purchases' },
            { 'totalValuePurchases': '$ Purchases' },
            { 'totalClicks': 'Total Referral Clicks' },
            { 'totalValueCommissions': 'Total $ Commission' },
            { 'averagePercentageCommission': 'Net Commission %' }
        ],

        // TODO - this should be in model
        pageTitle: 'Marketplace Rebate Transactions',

        aboutContent: 'We get both a summary view as well as item view of all marketplace rebate transactions for a specified date range.',

        template: templateHtml,

        createDataViz: function() {
            this.createItemTable();
            this.createSummaryTable();
        },

        createSummaryTable: function() {

            var data = this.model.getTransactionsByAllVendors(),
                columns = this.totalColumnHash;

            // make table

            //make header

            // row for each vendor

            var table = d3.select(this.tableTotalsHolderSelector).append("table").classed('table', true),
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
                    //.text(function(column) { return column; });

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

                // original
                // .data(function(row) {
                //     return columns.map(function(column) {
                //         return {column: column, value: row[column]};
                //     });
                // })
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
                // _.each(columnObj, function(value) {
                //     columnHeaders.push(value);
                // });
            });

            return columnHeaders;
        },

        // TODO - find more elegant way to do this? - preferably inline
        getTotalColumnHeaderNames: function() {
            var columnHeaders = [];
            _.each(this.totalColumnHash, function(columnObj) {
                // this only works if each column obj has only a single key
                columnHeaders.push(_.values(columnObj)[0]);
                // _.each(columnObj, function(value) {
                //     columnHeaders.push(value);
                // });
            });

            return columnHeaders;
        },

        createItemTable: function() {

            var data = this.model.getRawData(),
                columns = this.itemColumnHash;

            var table = d3.select(this.tableItemsHolderSelector).append("table").classed('table', true),
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

                // original
                // .data(function(row) {
                //     return columns.map(function(column) {
                //         return {column: column, value: row[column]};
                //     });
                // })
                .enter()
                .append("td")
                    .text(function(d) {
                        return d.value;
                });

            return table;
        }

    });

    return view;

});

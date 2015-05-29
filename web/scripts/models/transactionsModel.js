define([
    'models/baseModel',
    'utils/events',
    'config/appConfig'
    ],
     function(
         BaseModel,
         events,
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

            apiPath: config.transactionsApiPath,

            dataLoadEvent: 'transactionsDataLoaded',

            enabledFilters: ['date'],

            distinctMerchants: [],

            totals: {},

            getDistinctMerchants: function() {

                merchantArray = [];
                //TODO - cleaner way to iterate
                for (var i = 0; i < this.rawData.length; i++) {
                    if (_.indexOf(merchantArray, this.rawData[i]['merchant_name']) == -1 ) {
                        merchantArray.push(this.rawData[i]['merchant_name']);
                    }
                }

                this.distinctMerchants = merchantArray;

                return merchantArray;

            },

            getTransactionsBySingleMerchant: function(merchantName) {

                // total # purchases
                // total clicks
                // total $ purchases
                // total $ commission
                // caluclate % commission
                var totalNumberPurchases = 0,
                    totalValuePurchases = 0,
                    totalClicks = 0,
                    totalValueCommissions = 0,
                    averagePercentageCommission = 0;



                // TODO - iterate more elegantly
                for (var i = 0; i < this.rawData.length; i++) {

                    if (this.rawData[i]['merchant_name'] == merchantName && this.testAgainstFilters(this.rawData[i])) {
                        totalNumberPurchases += 1;  // are we counting # of transactions (ok) or quantity of items (change code)
                        totalValuePurchases += +this.rawData[i]['sales_amount'];
                        totalClicks += 1; // TODO - get click from referral data!
                        totalValueCommissions += +this.rawData[i]['commission_amount'];
                    }

                }

                return {
                    'merchantName': merchantName,
                    'totalNumberPurchases': totalNumberPurchases,
                    'totalValuePurchases': totalValuePurchases,
                    'totalClicks': totalClicks,
                    'totalValueCommissions': totalValueCommissions.toFixed(2),
                    'averagePercentageCommission': ((totalValuePurchases > 0) ? (totalValueCommissions / totalValuePurchases) * 100 : 0).toFixed(2)
                }
            },


            addToMasterTotal: function(singleTotal) {

                _.each(singleTotal, function(val, key) {
                    (this.totals[key]) ? this.totals[key] += +val : this.totals[key] = +val;
                }, this);

            },

            getTransactionsByAllMerchants: function() {
                this.totals = {}; //reset totals
                var merchants = this.getDistinctMerchants();
                var transactions = [];
                var singleMerchantTotal;
                //TODO - iterate more elegantly
                for (var i = 0; i < merchants.length; i ++) {
                    singleMerchantTotal = this.getTransactionsBySingleMerchant(merchants[i]);
                    transactions.push(singleMerchantTotal);
                    this.addToMasterTotal(singleMerchantTotal);
                }

                var totals = this.totals;
                totals['merchantName'] = 'TOTALS';
                totals['totalValuePurchases'] = totals['totalValuePurchases'].toFixed(2);
                totals['totalValueCommissions'] = totals['totalValueCommissions'].toFixed(2);
                totals['averagePercentageCommission'] = ((totals['totalValuePurchases'] > 0) ? (totals['totalValueCommissions'] / totals['totalValuePurchases']) * 100 : 0).toFixed(2)
                transactions.push(totals);

                return transactions;

            },


        });

        return model;

    }
);

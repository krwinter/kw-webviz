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

            apiPath: config.rebatesApiPath,

            dataLoadEvent: 'rebatesDataLoaded',

            distinctVendors: [],

            totals: {},

            getDistinctVendors: function() {

                var vendorArray = [];
                //TODO - cleaner way to iterate
                for (var i = 0; i < this.rawData.length; i++) {
                    if (_.indexOf(vendorArray, this.rawData[i]['vendor_name']) == -1 ) {
                        vendorArray.push(this.rawData[i]['vendor_name']);
                    }
                }

                this.distinctVendors = vendorArray;

                return vendorArray;

            },

            getTransactionsBySingleVendor: function(vendorName) {

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

                    if (this.rawData[i]['vendor_name'] == vendorName) {
                        totalNumberPurchases += 1;  // are we counting # of transactions (ok) or quantity of items (change code)
                        totalValuePurchases += +this.rawData[i]['sales_amount'];
                        totalClicks += 1; // TODO - get click from referral data!
                        totalValueCommissions += +this.rawData[i]['commission_amount'];
                    }

                }

                return {
                    'vendorName': vendorName,
                    'totalNumberPurchases': totalNumberPurchases,
                    'totalValuePurchases': totalValuePurchases,
                    'totalClicks': totalClicks,
                    'totalValueCommissions': totalValueCommissions,
                    'averagePercentageCommission': ((totalValuePurchases > 0) ? (totalValueCommissions / totalValuePurchases) * 100 : 0)
                }

            },


            addToMasterTotal: function(singleTotal) {

                _.each(singleTotal, function(val, key) {
                    (this.totals[key]) ? this.totals[key] += +val : this.totals[key] = +val;
                }, this);

            },

            getTransactionsByAllVendors: function() {
                this.totals = {}; //reset totals
                var vendors = this.getDistinctVendors();
                var transactions = [];
                var singleVendorTotal;
                //TODO - iterate more elegantly
                for (var i = 0; i < vendors.length; i ++) {
                    singleVendorTotal = this.getTransactionsBySingleVendor(vendors[i]);
                    transactions.push(singleVendorTotal);
                    this.addToMasterTotal(singleVendorTotal);
                }

                var totals = this.totals;
                totals['vendorName'] = 'TOTALS';
                totals['averagePercentageCommission'] = ((totals['totalValuePurchases'] > 0) ? (totals['totalValueCommissions'] / totals['totalValuePurchases']) * 100 : 0)
                transactions.push(totals);

                return transactions;

            }


        });

        return model;

    }
);

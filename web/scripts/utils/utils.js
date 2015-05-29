define([],
    function() {


        var utils = {

        getCurrentRoute: function() {
            return Backbone.history.getHash();
        },

        getQuerystring: function() {
            var qs = this.getCurrentRoute().split('?');
            return qs[1] || '';

        },

        getQuerystringObject: function() {

            var qs = this.getQuerystring(),
                qsObj = {},
                singleParam;

            if (!qs) {
                return qsObj;
            }

            params = qs.split('&');

            for (var i=0; i< params.length; i++) {
                singleParam = params[i].split('=');
                qsObj[singleParam[0]] = singleParam[1]
            }

            return qsObj;

        },


       }

    return utils

});
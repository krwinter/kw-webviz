define([
    'marionette',
    'utils/events',
    'q',
    'd3'

    ],
    function(
        Marionette,
        events,
        q,
        d3
        ) {


    	var service = function(pageConfig) {

    		this.pageConfig = pageConfig;

    		this.load = function() {

    			var deferred = q.defer();

    				d3.csv(this.pageConfig.api.file)
                    .get(function(err, data) {
                    	if (!err) {
                    		deferred.resolve(data);
                    	} else {
                    		console.log('ERROR loading data: ' + error);
                    		deferred.reject(err);
                    	}
                    });

    			return deferred.promise;
    		};

    	};


    	return service;


	}
);
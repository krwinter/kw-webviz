define([
    'backbone',
    'config/appConfig',
    'config/pageConfig'
    ],
     function(
         Backbone,
         appConfig,
         pageConfig
    ) {

        // NavModel - where we set things like views available, features available,
        // based upon user permissions, config, etc.
        var model = Backbone.Model.extend({

            initialize: function(options) {
                this.viewsEnabled = appConfig.viewsEnabled;

            }

        });

        return model;


    }
);

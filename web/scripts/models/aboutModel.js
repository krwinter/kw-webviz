define(["backbone"],
     function(Backbone) {


        var rawData;

        var model = Backbone.Model.extend({


            initialize: function(data) {
                this.setRawData(data);
            },

            setRawData: function(data) {

                rawData = data;

            }

        });

        return model;


    }
);

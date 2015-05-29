define([
    'marionette',
    'views/baseView',
    'views/tileView',
    'text!templates/fourUp.html'
    ],
    function(
        Marionette,
        BaseView,
        TileView,
        mainHtml
        ) {



        // TODO - make regions and do show()?  or keep as is?
        var createAllSubviews = function() {

            for (var i=0; i<utilities.length; i++) {

                var tileModel = Backbone.Model.extend({
                    defaults: {
                        utilityName: utilities[i],
                        utilityId: i + 1
                    }
                });
                modelInstance = new tileModel();

                //var tileId = "tile-id-" + String(i + 1);

                var tileId = i + 1;

                var newView = createSingleTileView(modelInstance, tileId);

                tileViews.push(newView);
            }

        };


        var createSingleTileView = function(model, tileId) {
            var tileEl = $("<div/>");
            var tileSelector = "tile-id-" + String(tileId);
            tileEl.addClass("utility-tile col-md-6");
            tileEl.attr("id", tileSelector);

            var attachPoint = "#tile-row-1";
            if (tileId >= 3) {
                attachPoint = "#tile-row-2";
            }

            $(attachPoint).append(tileEl);

            var tileView = new TileView( {
                el: "#" + tileSelector,
                model: modelInstance
                }
            );

            tileView.render();

            return tileView;
        };


        var view = BaseView.extend({

            // initialize: function(options) {
            //     // model passed in
            // },

            pageTitle: 'Weekly Summary Stats',

            aboutContent: 'The Weekly Summary stats are a combination of 90 day trends along with the most recent numbers',

            utilities: ["SDG&E", "NGRID", "Milton", "Horizon"],

            tileViews: [],

            //graphController: fourUpDataController,

            //graphControllerInstance: null,

            initialize: function() {
                // nothing to do here or in base view, no listeners here to manage
            },


            //el: "#holder",

            // TODO - better way of handling subviews - onShow does not fire, probablt needs 'show()'
            onShow: function() {
                console.log('4up view onShow');
                $('.page-title').text(this.pageTitle);
                this.createAllSubviews()

            },

            template : function(serialized_model) {
                var name = serialized_model.name;
                return _.template(mainHtml)({
                    name : "name222",
                    some_custom_attribute : "some_custom_key"
                });
            },

            createDataViz: function() {

                // do nothing - subviews will handle

            },

            createAllSubviews: function() {

                for (var i=0; i<this.utilities.length; i++) {

                    var viewOptions = {};

                    viewOptions.model = this.model;
                    // ! IMPORTANT ! - each view gets the same model instance - so we have only 1 data load,
                    //      but utility id and name set separately on each view
                    viewOptions.utilityName = this.utilities[i];
                    viewOptions.utilityId = i + 1;

                    // var tileModel = Backbone.Model.extend({
                    //     defaults: {
                    //         utilityName: this.utilities[i],
                    //         utilityId: i + 1
                    //     }
                    // });
                    //modelInstance = new tileModel();

                    //var tileId = "tile-id-" + String(i + 1);

                    var tileId = i + 1;

                    var newView = this.createSingleTileView(viewOptions, tileId);

                    this.tileViews.push(newView);
                }

            },

            createSingleTileView: function(viewOptions, tileId) {
                var tileEl = $("<div/>");
                var tileSelector = "tile-id-" + String(tileId);
                tileEl.addClass("utility-tile col-md-6");
                tileEl.attr("id", tileSelector);

                var attachPoint = "#tile-row-1";
                if (tileId >= 3) {
                    attachPoint = "#tile-row-2";
                }

                $(attachPoint).append(tileEl);

                viewOptions.el = "#" + tileSelector;

                // var tileView = new TileView( {
                //     el: "#" + tileSelector,
                //     model: modelInstance
                //     }
                // );

                var tileView = new TileView(viewOptions);

                tileView.render();

                return tileView;
            }

        });

        return view;

});

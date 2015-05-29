define([
    'marionette',
    'utils/events',
    "text!templates/components/alert.html"
    ],
        function(
            marionette,
            events,
            modalHtml
        ) {


    var view = Backbone.Marionette.LayoutView.extend({

        //template: modalHtml,
        initialize: function(options) {

        },

        template : function(serialized_model) {
            var name = serialized_model.name;
            return _.template(modalHtml)({
                title : serialized_model.title,
                content: serialized_model.content,
                extra: serialized_model.extra
            });
        },

        onShow: function() {
            console.log('show alert modal')
        }


    });

    return view;

    }

);

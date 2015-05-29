define([
    'marionette',
    //'bootstrap',
    'text!templates/appLayout.html'
    ],
    function(
        marionette,
        //bootstrap,
        appLayout
    ) {


    var view = Backbone.Marionette.LayoutView.extend({

        //template: "#layout-view-template",
        template: appLayout,
        //template: Handlebars.compile("Hello, {{name}}"),

        events: {

            'click .help': 'clickHelp'

        },

        clickHelp: function() {
            //alert('help');
        },

        el: '#main',

        regions: {
            pageHeader: "#pageHeader",
            content: "#content",
            modal: "#modalHolder"
        },

        onRender: function() {
            $(function () {
              //$('[data-toggle="tooltip"]').tooltip()
            })
        }

    });


    return view;

    }

);

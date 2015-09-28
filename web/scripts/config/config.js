require.config({

        baseUrl: "../scripts",

        paths: {
            lib: "../lib",
            text: "../lib/text",
            templates: "../templates",
            backbone: "../lib/backbone-min",
            underscore: "../lib/underscore-min",
            jquery: "../lib/jquery-2.1.3.min",
            marionette: "../lib/backbone.marionette.min",
            d3: "../lib/d3.min",
            nvd3: "../lib/nv.d3.min",
            nv_utils: "../lib/nv_utils",
            bootstrap: '../lib/bootstrap.min',
            datepicker: '../lib/bootstrap-datepicker.min',   // https://github.com/eternicode/bootstrap-datepicker
            filesaver: '../lib/FileSaver.min',  // https://github.com/eligrey/FileSaver.js
            q: '../lib/q'
        },
        // paths: {
        //     lib: "../lib",
        //     text: "../lib/text",
        //     templates: "../templates",
        //     backbone: "../lib/backbone",
        //     underscore: "../lib/underscore",
        //     jquery: "../lib/jquery-2.1.3",
        //     marionette: "../lib/backbone.marionette",
        //     d3: "../lib/d3",
        //     nvd3: "../lib/nv.d3",
        //     nv_utils: "../lib/nv_utils",
        //     bootstrap: '../lib/bootstrap',
        //     datepicker: '../lib/bootstrap-datepicker',   // https://github.com/eternicode/bootstrap-datepicker
        //     filesaver: '../lib/FileSaver'  // https://github.com/eligrey/FileSaver.js
        // },

        shim: {

            nvd3: {
                deps: ['d3'],
                exports: "nv"
            },

            nv_utils: {
                deps: ['nvd3']
            },

            bootstrap: {
                deps: ['jquery']
            },

            datepicker: {
                deps: ['bootstrap']
            }

        }

});

define(["backbone"],
    function(Backbone) {

        // so we rely on known keys vs. error-prone strings
        var events = {

            dataLoaded: "dataLoaded"

        };


        var eventBus = {

            busObj : {},

            initialize : function() {
                   console.log('event bus init');
            },


            dispatch : function( event, args ) {

                this.busObj.trigger( event, args );
            },

            listen : function( event, callback, context ) {

                this.busObj.on( event, callback, context )

            },

            remove : function( event, callback, context ) {

                this.busObj.off( event, callback, context );

            },

            // events as properties
            e : events


        };

        _.extend( eventBus.busObj, Backbone.Events );

        return eventBus;

    }
);

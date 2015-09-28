define([
        "text!content/enrollments.sql",
        "text!content/activations.sql",
        "text!content/logins.sql",
        "text!content/tips.sql"
    ], 
    function(
        enrollmentsSql,
        activationsSql,
        loginsSql,
        tipsSql
    ) {


    /*
    Need to map:
        nav menu id to enabled
        nav menu id to click events
        click events to controller

        nav menu id to page model - title, about, etc.
        filter buttons / features to model - what filters, what dl options are available

    */

    var pages = {

        brewTemp: {

            pageTitle: 'Brew Temp',

            pageController: "BrewTempController",

            pageModel: "models/BrewTempModel",

            pageView: "views/BrewTempView",

            pageTemplate: "templates/brewTemp.html",

            options: { },

            filterControls: ['date'],

            aboutContent: "Enrollment and unenrollment events are typically triggered by a utility action, usually the sending of \
            an file. These are recorded as they occur and are tallied by month. ",

            sql: enrollmentsSql,

            repoUrl: "https://github.com/simpleenergy/data-democracy/blob/master/queries/enrollment/sdge_by_date.md",

            extra: 'Real Slack integration coming soon...'

        }

    };

    return pages;

});

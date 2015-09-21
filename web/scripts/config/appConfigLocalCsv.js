define(function() {

    var config = {

        baseUrl: "http://localhost:8000",

        brewTempApiPath: "/../data/brewtemp.csv",

        downloadGenerateWkApiPath: '/download/wk',

        downloadGenerateXhpApiPath: '/download/xhp',

        downloadGeneratePjsApiPath: '/download/pjs',

        viewsEnabled: [
            'brewTemp'
        ],

        qsFilters: ['startDate','endDate','utility','engagementEvent']
    };

    return config;

});

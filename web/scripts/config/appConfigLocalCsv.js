define(function() {

    var config = {

        baseUrl: "http://localhost:8000",

        brewTempFiles: [
            { name: '1st Pi File', url: 'data/brewtemp.csv'},
            { name: '2nd Pi File', url: 'data/brewtemp2.csv'}

        ],

        brewTempApiPath: "/../data/brewtemp.csv",

        downloadGenerateWkApiPath: '/download/wk',

        downloadGenerateXhpApiPath: '/download/xhp',

        downloadGeneratePjsApiPath: '/download/pjs',

        viewsEnabled: [
            'brewTemp'
        ],

        qsFilters: ['startDate','endDate']
    };

    return config;

});

define(function() {

    var config = {

        baseUrl: "http://localhost:5000",

        emailApiPath: "/emailEvents/cornell",

        activationsApiPath: "/activations/cornell",
        
        eventsApiPath: "/siteEvents/cornell",

        eventTotalsApiPath: "/eventsTotal/cornell",
        
        enrollmentsApiPath: "/enrollments/cornell",

        //transactionsApiPath: "/../data/transactions.csv",
        transactionsApiPath: "/marketplaceTransactions/dev",

        rebatesApiPath: "/../data/rebates.csv",

        allEventsApiPath: "/siteEvents/cornell",

        downloadGenerateWkApiPath: '/download/wk',

        downloadGenerateXhpApiPath: '/download/xhp',

        downloadGeneratePjsApiPath: '/download/pjs',

        viewsEnabled: [
            'weeklySummary',
            'engagementNav', // list header
            'enrollments',
            'activations',
            'logins',
            'tipsCompleted',
            'emailActivity',
            'marketplaceNav', //list header
            'marketplaceTransactions'
        ],

        qsFilters: ['startDate','endDate','utility','engagementEvent']
    };

    return config;

});

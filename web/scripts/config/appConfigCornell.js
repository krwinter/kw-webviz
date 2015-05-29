define(function() {

    var config = {

        baseUrl: "http://pk01.cornell.mgmt/api",

        emailApiPath: "/emailEvents/cornell",

        activationsApiPath: "/activations/cornell",
        
        eventsApiPath: "/siteEvents/cornell",

        eventTotalsApiPath: "/eventsTotal/cornell",

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

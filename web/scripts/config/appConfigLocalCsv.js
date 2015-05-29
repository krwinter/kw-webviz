define(function() {

    var config = {

        baseUrl: "http://localhost:8000",

        emailApiPath: "/../data/email_all_utilities.csv",

        activationsApiPath: "/../data/events_all_days_all_utilities.csv",

        eventsApiPath: "/../data/events_all_days_all_utilities.csv",

        eventTotalsApiPath: "/../data/events_last_week_total_all_utilities.csv",

        transactionsApiPath: "/../data/transactions.csv",

        rebatesApiPath: "/../data/rebates.csv",

        allEventsApiPath: "/../data/events_all_days_all_utilities.csv",

        downloadGenerateWkApiPath: '/download/wk',

        downloadGenerateXhpApiPath: '/download/xhp',

        downloadGeneratePjsApiPath: '/download/pjs',

        viewsEnabled: [
            'weeklySummary',
            'engagementNav', // list header
            'siteActivity',
            'engagementFunnel',
            'activations',
            'logins',
            'tipsCompleted',
            'emailActivity',
            'marketplaceNav', //list header
            'marketplaceTransactions',
            'marketplaceRebates'
        ],

        qsFilters: ['startDate','endDate','utility','engagementEvent']
    };

    return config;

});

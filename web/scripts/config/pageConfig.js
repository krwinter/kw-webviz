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

        weeklySummary: {

            pageTitle: "Weekly Summary",

            pageController: "FourUpController",

            options: {},

            filterControls: [],

            aboutContent: '4 up!',

            sql: 'SELECT * FROM ?',

            extra: 'Real Slack integration coming soon...'

        },

        activations: {

            pageTitle: "Activations",

            pageController: "EngagementEventsController",

            options: {eventType: 'Activated'},

            filterControls: ['utility', 'date'],

            aboutContent: "Activation events are recorded either when users take action to activate, or a utility activates a user on their behalf. \
                            This query returns the aggregate number of activation events per day.",

            sql: activationsSql,

            extra: 'Real Slack integration coming soon...'

        },

        logins: {

            pageTitle: "Logins",

            pageController: "EngagementEventsController",

            options: {eventType: 'LoggedIn'},

            filterControls: ['utility', 'date'],

            aboutContent: "Each time a user logs in a login event is recorded. \
                        This query returns the aggregate number of login events per day.",

            sql: loginsSql,

            extra: 'Real Slack integration coming soon...'

        },

        tipsCompleted: {

            pageTitle: "Tips Completed",

            pageController: "EngagementEventsController",

            options: {eventType: 'TipCompleted'},

            filterControls: ['utility', 'date'],

            aboutContent: "Each time a user completes a tip an event is recorded. \
                        This query returns the aggregate number of tip completeion events per day.",

            sql: tipsSql,

            extra: 'Real Slack integration coming soon...'

        },

        rewardsRedeemed: {

            pageTitle: "Rewards Redeemed",

            pageController: "EngagementEventsController",

            options: {eventType: 'RewardRedeemed'},

            filterControls: ['utility', 'date'],

            aboutContent: "Each time a user redeems a reward an event is recorded. \
                        This query returns the aggregate number of reward redemption events per day.",

            sql: "SELECT \
                    REPLACE(full_date::date::varchar, '-','') AS date_id, \
                    event_type AS event_type, \
                    event_count AS event_count, \
                    utility_id AS utility_id \
                FROM mvw_event_summary_90_days \
                    WHERE event_type = 'RewardRedeemed' \
             ORDER BY utility_id, full_date, event_type;",

            extra: 'Real Slack integration coming soon...'

        },

        siteActivity: {

            pageTitle: "Site Activity",

            pageController: "AllEventsController",

            options: {},

            filterControls: ['utility', 'date'],

            aboutContent: 'Site Activity',

            sql: "select \
                    replace(full_date::date::varchar, '-','') AS date_id, \
                    event_type as event_type, \
                    event_count as event_count, \
                    utility_id as utility_id \
                from mvw_event_summary_90_days \
                order by utility_id, full_date, event_type;",

            extra: 'Real Slack integration coming soon...'

        },

        engagementFunnel: {

            pageTitle: "Engagement",

            pageController: "AllEventsController",

            options: { chartView: 'funnel' },

            filterControls: ['utility', 'date'],

            aboutContent: 'Signups!',

            sql: 'SELECT something FROM somewhere ORDER BY nothing',

            extra: 'Nothing to see here'

        },
        emailActivity: {

            pageTitle: 'Email Activity',

            pageController: "EmailController",

            options: { },

            filterControls: ['utility', 'date'],

            aboutContent: "To get email activity, we query a summary table to get aggregated statistics. The query returns the total \
                        numbers of events recorded per day, per utility.  The source data for this summary table is pulled directly \
                        from Sailthru using their API, and is then processed and inserted into the siummary table in the DW.",

            sql: "SELECT \n\tutility_id, \n\treplace(send_date::date::varchar, '-','') AS date_id, \n\tsent, \n\tdelivered, \n\topened, \n\tclicks, \n\topen_rate, \n\tclick_rate, \n\tclick_to_open \nFROM \n\tmvw_email_summary_90_days",

            extra: 'Real Slack integration coming soon...'

        },

        enrollments: {

            pageTitle: 'Enrollments',

            pageController: "EnrollmentsController",

            options: { },

            filterControls: [],

            aboutContent: "Enrollment and unenrollment events are typically triggered by a utility action, usually the sending of \
            an file. These are recorded as they occur and are tallied by month. ",

            sql: enrollmentsSql,

            repoUrl: "https://github.com/simpleenergy/data-democracy/blob/master/queries/enrollment/sdge_by_date.md",

            extra: 'Real Slack integration coming soon...'

        },

        brewTemp: {

            pageTitle: 'Brew Temp',

            pageController: "BrewTempController",

            options: { },

            filterControls: ['date'],

            aboutContent: "Enrollment and unenrollment events are typically triggered by a utility action, usually the sending of \
            an file. These are recorded as they occur and are tallied by month. ",

            sql: enrollmentsSql,

            repoUrl: "https://github.com/simpleenergy/data-democracy/blob/master/queries/enrollment/sdge_by_date.md",

            extra: 'Real Slack integration coming soon...'

        },

        /*****************
        *   Marketplace  *
        *****************/

        marketplaceTransactions: {

            pageTitle: "Marketplace Transactions",

            pageController: "TransactionsController",

            options: { },

            filterControls: ['date'],

            aboutContent: 'Marketplace!!!!',

            sql: 'SELECT $$ FROM MARKET',

            extra: 'Real Slack integration coming soon...'

        },

        marketplaceRebates: {

            pageTitle: "Marketplace Rebates",

            pageController: "RebatesController",

            options: { },

            filterControls: [],

            aboutContent: 'Reeeeee-bates!',

            sql: 'SELECT $$ INTO my_wallet',

            extra: 'Real Slack integration coming soon...'

        }

    };

    return pages;

});

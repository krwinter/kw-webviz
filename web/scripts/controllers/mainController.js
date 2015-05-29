define([
    'views/appLayoutView',
    'controllers/navController',
    'controllers/downloadController',
    'controllers/fourUpController',
    'controllers/engagementEventsController',
    'controllers/allEventsController',
    'controllers/emailController',
    'controllers/enrollmentsController',
    'controllers/transactionsController',
    'controllers/rebatesController',

    'views/modalView',
    'views/alertModalView',
    'models/aboutModel',
    'models/alertModel',
    'models/filters/filters',
    'utils/events',
    'utils/utils',

    'config/pageConfig',
    'config/appConfig'
    ],
        function(
            AppLayoutView,
            NavController,
            DownloadController,
            FourUpController,
            EngagementEventsController,
            AllEventsController,
            EmailController,
            EnrollmentsController,
            TransactionsController,
            RebatesController,

            ModalView,
            AlertView,
            AboutModel,
            AlertModel,
            Filters,
            events,
            utils,

            pageConfig,
            appConfig
        ) {


        /*
        This is the main controller used by the router.
        Responsibilities:
        - on route change / nav event, instantitate page/graph/data view controller
        - page controller will instantitate view
        - page controller will instantitate model
        - model will load data - on load, trigger event
        - view listen for data ready/change event

        - model listen for filter / download events - knows how to act on them

        */



        var controller = Marionette.Controller.extend({

            mainView: null,

            // name of the current page, which is the key for the pageConfig
            currentPageName: null,

            currentContentView: null,

            currentPageController: null,

            currentNavView: null,

            navController: null,

            filters: null,

            setupListeners: function() {

                events.listen("navToPage", this.showPage, this);

                events.listen("navAbout", this.showAbout, this);

                // generic view ready
                events.listen("viewReady", this.showView, this);
                events.listen("navReady", this.showNav, this);

                events.listen("showAlert", this.showAlert, this);

                events.listen("renderComplete", this.onRenderComplete, this);

            },


            /*
                Steps:
                    1. go to route / trigger page
                    2. load page controller
                    3. load page model
                    4. generate page view
                        4a. load data
                        4b. update page / draw graph
                    5. generate nav view - based on model

            */


            /*
                Called right after app start
            */
            start: function() {

                this.setupListeners();

                // we have them here sop they're available to both view and model

                this.mainView = new AppLayoutView();
                this.mainView.render();

                // creates main nav controller - no page set up yet, if no perms fallback to shell page
                this.navController = new NavController();
                this.downloadController = new DownloadController( { mainController: this } );

                this.filters = new Filters();

                var currentRoute = Backbone.history.getHash();


                // triggers new page controller - same as if triggered by nav click
                if (currentRoute = '' || !currentRoute) {
                    this.showPage('weeklySummary');
                }
                //this.showPage('marketplaceTransactions');

            },

            // depending on page, different nav / tools will appear
            showNav: function(viewInstance) {
                //this.currentNavView.destroy(); // still should do this in the controller
                this.currentNavView = viewInstance;
                this.mainView.pageHeader.show(this.currentNavView);
            },



            showView: function(viewInstance) {

                //this.currentContentView.destroy(); // need to do this here?  or done already?
                this.currentContentView = viewInstance;
                this.mainView.content.show(this.currentContentView)
                // to prevent race condition we only load data after view is instantiated and dataLoaded listeners are there
                this.currentContentView.model.loadData();

            },


            /*
                pageName is the key to page model in pageConfig
                pageName is also CURRENTLY id of nav menu item clicked
            */
            showPage: function(pageName, querystring) {
                
                options = {};

                // only show page if it's exists as a valid config, and is enabled for this particular config instance
                if (!_.has(pageConfig, pageName) || !_.contains(appConfig.viewsEnabled, pageName)) {
                    console.log('PAGE NOT FOUND');
                    return;
                }

                // check if this view is for the sole purpose of generating a pdf
                if (querystring) {
                    if (utils.getQuerystringObject().hasOwnProperty('pdfgen')) {
                        options['qs'] = 'pdfgen'
                    }

                }

                // page has been changed, set current on this controller
                this.currentPageName = pageName;
                this.currentPageModel = pageConfig[pageName];

                if (this.currentPageController) {
                    this.currentPageController.destroy();
                }

                // string to class - can we use something besides eval?
                var controller = eval(pageConfig[pageName].pageController);

                // will serve as main key from config - defines all
                options['pageName'] = pageName;

                // pass in this persisted singleton instance - state stored
                options['filters'] = this.filters;

                for (var key in pageConfig[pageName].options) {
                    options[key] = pageConfig[pageName].options[key];
                }


                this.currentPageController = new controller(options);

                // TODO - make event
                this.navController.viewInstance.update(pageConfig[pageName], options);

            },

            // TODO - show/hide/update vs new one each time - or ok doing show repeatedly?
            showAbout: function() {

                // show modal view, passing in model with content, depending on current view
                var aboutModel = {
                    title: 'About ' + this.currentPageModel.pageTitle,
                    content: this.currentPageModel.aboutContent,
                    sql: this.currentPageModel.sql,
                    repoUrl: this.currentPageModel.repoUrl || "https://github.com/simpleenergy/data-democracy",
                    extra: this.currentPageModel.extra
                };
                //var modalView = new ModalView({model: aboutModel});
                var modalView = new ModalView({model: new AboutModel(aboutModel)});
                this.mainView.modal.show(modalView);
                $('#aboutModal').modal('show');

            },

            showAlert: function(contentObj) {

                // show modal view, passing in model with content, depending on current view
                var alertModel = {
                    title: contentObj.title,
                    content: contentObj.content,
                    extra: contentObj.extra
                };
                //var modalView = new ModalView({model: aboutModel});
                var alertView = new AlertView({model: new AlertModel(alertModel)});
                this.mainView.modal.show(alertView);
                $('#alertModal').modal('show');

            },

            onRenderComplete: function() {
                //alert('MC render complete');
                if (this.currentPageController.options.qs == 'download') {
                    //this.doDownloadDataViz();
                    downloadController.generatePdf();
                }

            }


        });

        return controller;

    }
);

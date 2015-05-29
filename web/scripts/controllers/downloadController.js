define([
    'controllers/baseController',
    'utils/events',
    'filesaver',

    'config/appConfig',
    'config/pageConfig'
    ],
    function(
        BaseController,
        events,
        filesaver,
        appConfig,
        pageConfig
    ) {


    var controller = BaseController.extend({

        mainController: null,

        alertEvent: 'showAlert',

        initialize: function(options) {
            this.mainController = options.mainController;
            this.setupListeners();
        },

        setupListeners: function() {
            events.listen("navDownloadCsv", this.doDownloadCsv, this);
            events.listen("navDownloadDataViz", this.generatePdf, this);
        },

        doDownloadCsv: function() {
            var csvData = d3.csv.format(this.mainController.currentPageController.modelInstance.getRawData()),
                fileName = this.mainController.currentPageController.viewInstance.pageTitle + '.csv', //TODO - get from model
                blob = new Blob([csvData], { type: "application/xml;charset=utf-8" });

            saveAs(blob, fileName);

        },

        generatePdf: function() {

            // TODO - get vars from filters or querystring (as long as we constanbtly update url)
            var postVars = "pageName=" + this.mainController.currentPageName;
            for (var i=0; i < appConfig.qsFilters.length; i++ ) {
                var param,
                    filter;
                if (appConfig.qsFilters[i].indexOf('start') > -1) {
                    param = 'start';
                    filter = appConfig.qsFilters[i].substring(5).toLowerCase();
                } else if (appConfig.qsFilters[i].indexOf('end') > -1) { 
                    param = 'end';
                    filter = appConfig.qsFilters[i].substring(3).toLowerCase();
                } else {
                    filter = appConfig.qsFilters[i];
                }

                postVars += '&' + this.mainController.filters[filter].getQs(param);
            }
            
            d3.xhr(appConfig.baseUrl + appConfig.downloadGenerateWkApiPath)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .post(postVars, _.bind(this.processDownload, this)); // send done event
        },

        processDownload: function (err, response){

            if (response) {
                file_url = response.responseText;
                // alert
                alertObj = {
                    title: 'Report generation complete',
                    content: '<P>Click to Download</p><p>S3 URL: <a href="' + file_url + '" target="_blank">' + file_url + '</a>'
                }
                this.showAlert(alertObj);

            }

        },

        showAlert: function (alertObj) {
            events.dispatch(this.alertEvent, alertObj);
        }

    });

    return controller;



});
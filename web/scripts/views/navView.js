define([
    'marionette',
    'datepicker',
    'utils/events',
    'utils/format',
    'utils/utils',
    "text!templates/nav.html",
    'config/pageConfig'
    ],
        function(
            marionette,
            datepicker,
            events,
            format,
            utils,
            nav,
            pageConfig
        ) {


    var view = Backbone.Marionette.LayoutView.extend({

        setupListeners: function() {
            // after main content view is ready, we know we everything is in place so we can update nav
            events.listen('viewReady', this.updateView);
            events.listen('filtersLoaded', this.updateFilterVisibility);
            events.listen('filterValuesSet', this.updateFilterValues, this);
        },

        initialize: function(options) {
            console.log('nav view init');
            this.options = options;
            this.model = options.model;
            this.setupListeners();

            this.setDateFilters();

            //this.updateFilters();
        },

        /*
        TEMPORARY HACK! - TILL they all follow the pattern to get bject passed on init, we have to do this
        */
        update: function(pageModel, options) {

            this.options = options;
            this.pageModel = pageModel;
            this.updateFilterVisibility();
            this.updateView();
        },

        setDateFilters: function() {
            

        },


        template: nav,

        //el: $('#main-header'),

        events: {

            "click #navMenu": "clickNavMenu",

            'click #aboutButton': 'clickAbout',

            'click #downloadCsv': 'clickDownloadCsv',
            'click #downloadDataViz': 'clickDownloadDataViz',

            'change #engagementEventSelect': 'engagementEventSelected',
            'change #utilitySelect': 'utilitySelected',
            'change #startDate': 'dateChanged',
            'change #endDate': 'dateChanged'

        },

        // matches name of filter to element
        inputHash: {

            startDate: '#startDate',
            endDate: '#endDate',
            utility: '#utilitySelect',
            engagementEvent: 'engagementEventSelect'
        },

        // when filter values passed in querystring, update filter values
        updateFilterValues: function(valueObj) {
            var value;
            for (var key in valueObj) {
                if (key.indexOf('date') > -1 || key.indexOf('Date') > -1) {
                    value = format.dateIdToSlashDate(valueObj[key]);
                } else {
                    value = valueObj[key];
                }
                $(this.inputHash[key]).val(value);
            }
        },


        /*
        * Fired on nav menu click - triggers main navigation to page
        */
        clickNavMenu: function(e) {
            events.dispatch('navToPage', e.target.id);
            events.dispatch('updateRoute', 'allEvents');
        },

        engagementEventSelected: function(eventObj) {
            var eventSelected = eventObj.currentTarget.selectedOptions[0].value;
            events.dispatch('engagementEventFilterChange', eventSelected);
        },

        utilitySelected: function(eventObj) {
            var utilityId = eventObj.currentTarget.selectedOptions[0].value;
            events.dispatch('utilityFilterChange', utilityId);
        },

        dateChanged: function(eventObj) {
            var startDate = $('#startDate')[0].value,
                endDate = $('#endDate')[0].value;

            events.dispatch('dateFilterChange', [startDate, endDate]);
        },


        clickDownloadCsv: function() {
            events.dispatch('navDownloadCsv');
        },

        clickDownloadDataViz: function() {
            events.dispatch('navDownloadDataViz');
        },

        clickAbout: function() {
            events.dispatch('navAbout');
        },

        onShow: function() {
            // once view is there, we need to init datepicker
            $('.datepicker').datepicker();

            // hide nav items we don't want
            //TODO - better way to do this
            var navElements = $('#navMenu li');

            for (var i=0; i<navElements.length; i++) {

                var elementId = $(navElements[i]).attr('id');

                var keepElement = false;

                for (var j=0; j<this.model.viewsEnabled.length; j++) {

                    if (elementId == this.model.viewsEnabled[j]) {
                        keepElement = true;
                        break
                    }
                }

                if (!keepElement) {
                    $(navElements[i]).remove();
                }
            }
        },

        // everything we need to do when there is a change that necessitates updating the nav
        updateView: function() {
            // get config from model
            var pageData = this.pageModel;
            if (this.pageModel) {
                $('.page-title').text(this.pageModel.pageTitle);
            }

            // hide nav / tools if we're printing a pdf
            if (this.options && this.options.qs == 'pdfgen') {

                var reportParams,
                    qsObj,
                    start,
                    end;

                qsObj = utils.getQuerystringObject();

                if (qsObj.startDate) {
                    start = format.dateIdToSlashDate(qsObj.startDate);
                }

                if (qsObj.endDate) {
                    end = format.dateIdToSlashDate(qsObj.endDate);
                }

                reportParams = 'From ' + start + ' to ' + end;

                var html = '<div class="row report-params">' + reportParams + '</div>';
                $(html).insertAfter('#toolRow');

                $('#toolRow').hide();
                $('.nav-button-group').children().remove();
            
            }


        },

        updateFilterVisibility: function() {

            //TODO - better way to do this
            // 1st hide all
            var filterElements = $('.filter');
            filterElements.hide();

            var visibleFilters = this.pageModel.filterControls;

            // show enabled ones
            for (var i=0; i<visibleFilters.length; i++) {

                var element = $('#' + visibleFilters[i] + 'Filter');
                element.show();

            }

        }


    });

    return view;

    }

);

var app = app || {};
//controller
$(document).ready(function() {
    (function() {
        app.controller = new(Backbone.View.extend({
            initialize: function() {
                $(".chart-period").on('click', _.bind(this.clickedChartPeriodButton, this));
                //After a#Kate or a#Vova clicking model parameter 'userName' is set.
                //After 'userName' setting model parameter 'sidebarData' is set.
                this.listenTo(app.model, 'change:userName', _.bind(app.model.getSidebarData, app.model));
				//After 'sidebarData' setting model parameter 'chartData' is set.
                this.listenTo(app.model, 'change:sidebarData', _.bind(app.model.getChartData, app.model));
                //After 'chartData' setting model parameter 'progressData' is set.
                this.listenTo(app.model, 'change:chartData', _.bind(app.model.getProgressData, app.model));
                //After 'progressData' setting this.checkRenders() triggers.
                this.listenTo(app.model, 'change:progressData', _.bind(this.checkRenders, this));
                //After triggered event 'newInfoPanel' model parameter 'chartData' is set.
                this.listenTo(app.model, 'newInfoPanel', _.bind(app.model.getChartData, app.model));
                //If dates in the datepicker are set incorrectly.
                this.listenTo(app.model, 'invalid', _.bind(
                    function(model, error) {
                        $("#validation-error-container").html(error).addClass("alert-danger");
                    },
                    app.model));
            },
            clickedChartPeriodButton: function(e) {
                var lastClickedElem = $(e.currentTarget).attr("class").match(/chart-period/g)[0];
                var transformDateFormat = function(param) {
                    if (!param) return false;
                    var yyyy = param.getFullYear(),
                        mm = param.getMonth() + 1,
                        dd = param.getDate();
                    return yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd);
                };
                if (lastClickedElem == 'chart-period') {
                    var datesArray = $('#datepicker').data().datepicker.dates,
                        startDate = $("input[type=text][name=start]").val().length == 0 ? false : transformDateFormat(datesArray[0]),
                        endDate = $("input[type=text][name=end]").val().length == 0 ? false : transformDateFormat(datesArray[1]);
                    app.model.set({
                        startDate: startDate,
                        endDate: endDate
                    }, {
                        validate: true
                    });
                    if (app.model.get('startDate') == startDate && app.model.get('endDate') == endDate) {
                        $("#validation-error-container").removeClass("alert-danger");
                        $("#validation-error-container").text("Выберите даты:");
                    };
                    app.model.trigger('newInfoPanel');//It's needed to rerender only div#progress and div#chart-container
                }
            },
            checkRenders: function() {
                var needSidebarRender = app.model.get('needSidebarRender');
                if (needSidebarRender) {
                    app.views.sidebarView.initialize();
                    app.views.progressView.initialize();
                    app.views.chartView.initialize();
                } else {
                    app.views.progressView.initialize();
                    app.views.chartView.initialize();
                }
            }
        }));
    })();
});
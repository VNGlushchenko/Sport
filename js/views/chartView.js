var app = app || {};
//chartView
$(document).ready(function() {
    (function() {
        app.views.chartView = new(Backbone.View.extend({
            initialize: function() {
                this.render();
            },
            render: function() {
                if (app.model.get('chartData')) {
                    $("#chart-container").highcharts(app.model.get('chartData'));
                }
            }
        }));
    })();
});
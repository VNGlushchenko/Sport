var app = app || {};
//model
$(document).ready(function() {
    (function() {
        app.model = new(Backbone.Model.extend({
            defaults: {
                startDate: '1900-01-01',
                endDate: '2300-01-01',
                userName: '',
                sidebarData: '',
                needSidebarRender: '',
                currentBodyParam: '',
                chartData: '',
                progressData: ''
            },
            validate: function(attrs, options) {
                if (!attrs.startDate && !attrs.endDate) {
                    return 'Выберите даты!';
                } else if (!attrs.startDate) {
                    return 'Выберите первую дату!';
                } else if (!attrs.endDate) {
                    return 'Выберите вторую дату!';
                } else if (attrs.startDate > attrs.endDate) {
                    return 'Вторая дата меньше первой. Введите верно дату!';
                };
            },
            getSidebarData: function() {
                var self = this;
                $.ajax({
                    type: "POST",
                    url: "php/getSidebarData.php",
                    data: "userName=" + self.get('userName'),
                    success: function(json) {
                        self.set({
                            currentBodyParam: JSON.parse(json)[1][0],
                            sidebarData: JSON.parse(json)
                        });
                    }
                });
            },
            getChartData: function() {
                var self = this,
                    obj,
                    categoriesListItems = [],
                    seriesListItems = [],
                    currentBodyParamName = self.get('sidebarData')[0][self.get('sidebarData')[1].indexOf(self.get('currentBodyParam'))],
                    chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: []
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        series: [{
                            name: null,
                            data: []
                        }],
                        legend: {
                            enabled: false
                        }
                    };
                $.ajax({
                    type: "POST",
                    url: "php/getChartData.php",
                    data: "userName=" + self.get('userName') + "&liParameter=" + self.get('currentBodyParam') + "&startDate=" + self.get('startDate') + "&endDate=" + self.get('endDate'),
                    success: function(json) {
                        obj = JSON.parse(json);
                        categoriesListItems = [];
                        seriesListItems = [];
                        $.each(obj, function(index, value) {
                            if (index == 0) {
                                value.forEach(function(item, i, value) {
                                    categoriesListItems.push(item);
                                });
                            } else {
                                value.forEach(function(item, i, value) {
                                    seriesListItems.push(item);
                                });
                            }
                        });
                        chartOptions.yAxis.title.text = self.get('currentBodyParam') == 'weight' ? 'Macca, кг' : 'Объем, см';
                        chartOptions.xAxis.categories = categoriesListItems;
                        chartOptions.series[0].data = seriesListItems;
                        chartOptions.series[0].name = currentBodyParamName;
                        chartOptions.title.text = 'Динамика по показателю<br>"' + currentBodyParamName + '"';
                        self.set({
                            chartData: chartOptions
                        });
                    }
                });
            },
            getProgressData: function() {
                var self = this,
                    firstDate = self.get('chartData').xAxis.categories[0],
                    lastDate = self.get('chartData').xAxis.categories[self.get('chartData').xAxis.categories.length - 1],
                    firstValue = self.get('chartData').series[0].data[0],
                    lastValue = self.get('chartData').series[0].data[self.get('chartData').series[0].data.length - 1],
                    diffValueRel = +(100 * (lastValue / firstValue - 1)).toFixed(2),
                    diffValueAbs = +(lastValue - firstValue).toFixed(2),
                    diffColor = (function() {
                        if (
                            (
                                self.get('userName') == 'Kate' &&
                                (
                                    (diffValueRel > 0 &&
                                        diffValueAbs > 0 && ['breast', 'biceps'].indexOf(self.get('currentBodyParam')) != -1) ||
                                    (diffValueRel < 0 &&
                                        diffValueAbs < 0 && ['breast', 'biceps'].indexOf(self.get('currentBodyParam')) == -1)
                                )
                            ) ||
                            (
                                self.get('userName') == 'Vova' &&
                                (
                                    (diffValueRel > 0 &&
                                        diffValueAbs > 0 && ['waist', 'hips', 'weight'].indexOf(self.get('currentBodyParam')) == -1) ||
                                    (diffValueRel < 0 &&
                                        diffValueAbs < 0 && ['waist', 'hips', 'weight'].indexOf(self.get('currentBodyParam')) != -1)
                                )
                            )
                        ) {
                            return 'green';
                        } else {
                            return 'red';
                        }
                    })();
                self.set({
                    progressData: {
                        firstDate: firstDate,
                        lastDate: lastDate,
                        diffValueRel: diffValueRel,
                        diffValueAbs: diffValueAbs,
                        diffColor: diffColor
                    }
                });
            }
        }));
    })();
});
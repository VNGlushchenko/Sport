var app = app || {};
//progressView
$(document).ready(function() {
    (function() {
        app.views.progressView = new(Backbone.View.extend({
            el: $("#progress"),
            initialize: function() {
                this.render();
            },
            render: function() {
                var arg = app.model.get('progressData').diffValueRel;
                this.$el.html(this.template(arg));
                $(".type-progress").css({
                    "color": app.model.get('progressData').diffColor
                });
            },
            template: function(param) {
                var htmlBlock;
                var transformDateFormat = function(param) {
                    if (param) {
                        return param.slice(8, 10) + '.' + param.slice(5, 7) + '.' + param.slice(0, 4);
                    }
                };
                if (param !== param) {
                    htmlBlock = ('<p class="lead text-center">За указанный период<br>нет данных.</p>' +
                        '<img src="images/oops.png" class="img-responsive center-block" alt="oops image">');
                } else {
                    htmlBlock = (
                        '<p class="lead text-center">Изменение '+
                        (app.model.get('currentBodyParam') == 'weight' ? 'веса' : 'объема') +
                        '<br>c ' +
                        transformDateFormat(app.model.get('progressData').firstDate) +
                        ' по ' +
                        transformDateFormat(app.model.get('progressData').lastDate) +
                        '<br>составило<br><strong><span class="type-progress">' +
                        (app.model.get('progressData').diffValueAbs > 0 ? '+' : '') +
                        app.model.get('progressData').diffValueAbs +
                        '</span></strong> ' +
                        (app.model.get('currentBodyParam') == 'weight' ? 'кг' : 'см') +
                        ' (<strong><span class="type-progress">' +
                        (app.model.get('progressData').diffValueAbs > 0 ? '+' : '') +
                        app.model.get('progressData').diffValueRel +
                        '%</span></strong>)' +
                        (app.model.get('progressData').diffColor == 'green' ? '<br><strong><span class="type-progress">Молодец!</span></strong><br><strong><span class="type-progress">Так держать!</span></strong></p>' : '<br><strong><span class="type-progress">Не расстраивайся!</span></strong><br><strong><span class="type-progress">Поднажми в этом месяце!</span></strong></p>') +
                        '<img src="images/' +
                        (app.model.get('progressData').diffColor == 'green' ? 'success.jpg' : 'attention.jpg') +
                        '" class="img-responsive center-block" alt="' +
                        (app.model.get('progressData').diffColor == 'green' ? 'success image' : 'attention image') + '">');
                };
                return htmlBlock;
            }
        }));
    })();
});
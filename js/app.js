var app = app || {};
//StartView
(function() {
    app.views = {}; // перенести эту строку в первую вьюху
    app.views.StartView = Backbone.View.extend({
        el: $("body"),
        initialize: function() {
            this.$el.css({
                "padding-top": "5px"
            });
            this.render();
            Backbone.history.start();
        },
        render: function() {
            this.$el.prepend(this.template());
        },
        template: _.template(
            '<div class="container" id="start-div">' +
                '<div class="row">' +
                    '<div class="col-xs-12"><div class="main">' +
                        '<div class="panel panel-info">' +
                            '<div class="panel-heading">' +
                                '<h3 class="panel-title text-center lead">Спортивные достижения нашей семьи</h3>' +
                            '</div>' +
                        '</div>' +
                        '<div class="panel-body">' +
                            '<div class="btn-group btn-group-lg col-xs-6 col-xs-offset-3 col-sm-2 col-sm-offset-5 col-md-offset-5 col-lg-offset-5" role="group">' +
                                '<a href="#Kate" id="Kate" class="btn btn-default btn-md user-name">Катя</a>' +
                                '<a href="#Vova" id="Vova" class="btn btn-default btn-md user-name">Вова</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-xs-12" id="main-image">' +
                        '<img src="images/sport.jpg" class="img-responsive center-block" alt="sport image">' +
                    '</div>' +
                '</div>' +
            '</div>'
        ),
    });
})();
//StartView rendering
$(document).ready(function() {
    $("header").hide();
    $("main").hide();
    new app.views.StartView();
    $('#sandbox-container .input-daterange').datepicker({
        language: "ru",
        autoclose: true,
        todayHighlight: true,
        format: "dd.mm.yyyy"
    });
});
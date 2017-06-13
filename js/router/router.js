var app = app || {};
//---router----
$(document).ready(function() {
    (function() {
        app.router = new(Backbone.Router.extend({
            routes: {
                'Kate': 'showUserPage',
                'Vova': 'showUserPage',
                'Kate/:bodyParam': 'updateInfoPanel',
                'Vova/:bodyParam': 'updateInfoPanel'
            },
            showUserPage: function() {
                $("#start-div").hide();
                $("body").css({
                    "padding-top": "70px"
                });
                $("header").show();
                $("main").show();
                var hashArr = window.location.hash.split('/');
                app.model.set({
                    startDate: '1900-01-01',
                    endDate: '2300-01-01',
                    needSidebarRender: true, //It's needed to rerender sidebar
                    userName: hashArr[0].slice(1, 5)
                });
                $("input[type=text][name=start]").val(""); //empty the startDate value
                $("input[type=text][name=end]").val("");   //empty the endDate value
            },
            updateInfoPanel: function(bodyParam) {
                app.model.set({
                    startDate: '1900-01-01',
                    endDate: '2300-01-01',
                    needSidebarRender: false, //It's needed to not rerender the sidebar
                    currentBodyParam: bodyParam,
                });
                $("input[type=text][name=start]").val(""); //empty the startDate value
                $("input[type=text][name=end]").val("");   //empty the endDate value in
                app.model.trigger('newInfoPanel'); // It's needed to rerender only div#progress and div#chart-container
            }
        }));
    })();
});
var app = app || {};
//sidebarView
$(document).ready(function() {
    (function() {
        app.views.sidebarView = new(Backbone.View.extend({
            el: $("#no-smartphone-menu-list"),
            initialize: function() {
                this.render1();
                this.render2();
                //for not smartphone sidebar
                $("ul.nav-pills li").removeClass("active");
                $("ul.nav-pills li a").each(function() {
                    var str = window.location.hash;
                    if ($(this).attr("href") === str)
                        $(this).parent().addClass("active");
                    if (window.location.hash === "#Kate" || window.location.hash === "#Vova")
                        $('ul.nav-pills li').eq(0).addClass("active");
                });
                //---------------------------------------------
                $("ul.nav-pills li a").click(function(event) {
                    $("ul.nav-pills li").removeClass("active");
                    $(this).parent("li").addClass("active");
                });
                //for smartphone sidebar
                $("ul.navbar-right li").removeClass("active");
                $("ul.navbar-right li a").each(function() {
                    var str = window.location.hash;
                    if ($(this).attr("href") === str)
                        $(this).parent().addClass("active");
                    if (window.location.hash === "#Kate" || window.location.hash === "#Vova")
                        $("ul.navbar-right li").eq(0).addClass("active");
                });
                //---------------------------------------------
                $("ul.navbar-right li a").click(function(event) {
                    $("ul.navbar-right li").removeClass("active");
                    $(this).parent("li").addClass("active");
                });
            },
            render1: function() {
                this.$el.html(this.template(app.model.get('sidebarData'), app.model.get('userName')).listForNotSmartphones);
            },
            render2: function() {
                $("#navbar").html(this.template(app.model.get('sidebarData'), app.model.get('userName')).listForSmartphones);
            },
            template: function(arr, name) {
                var liElems = [];
                var liElemsIds = [];
                //fill in arrays for menu creation
                $.each(arr, function(index, value) {
                    if (index == 0) {
                        value.forEach(function(item, i, value) {
                            liElems.push(item);
                        });
                    } else {
                        value.forEach(function(item, i, value) {
                            liElemsIds.push(item);
                        });
                    }
                });
                //create list
                var listForNotSmartphones = '<ul class = "nav nav-pills nav-stacked">';
                var listForSmartphones = '<ul class = "nav navbar-nav navbar-right">';
                for (i = 0; i < liElems.length; i++) {
                    listForNotSmartphones += '<li id="' + liElemsIds[i] + '"><a href="#' + name + '/' + liElemsIds[i] + '">' + liElems[i] + '</a></li>';
                    listForSmartphones += '<li id="' + liElemsIds[i] + '"><a href="#' + name + '/' + liElemsIds[i] + '">' + liElems[i] + '</a></li>';
                }
                return {
                    listForNotSmartphones: listForNotSmartphones + '</ul>',
                    listForSmartphones: listForSmartphones + '</ul>'
                };
            }
        }))
    })();
});
Cecilia.module("PageApp", function(PageApp, Cecilia, Backbone, Marionette, $, _){

  PageApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      ":url": "showPage",
    },
  });

  var API = {
    showPage: function(url){
      PageApp.Show.Controller.showPage(url);
    },
  };

  Cecilia.on("menu:page:show", function(url){
      Cecilia.navigate(url);
      API.showPage(url);
  });
  Cecilia.on("start", function(){
    new PageApp.Router({
      controller: API,
    });
  });
});

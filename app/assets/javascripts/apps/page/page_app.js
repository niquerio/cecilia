Cecilia.module("PageApp", function(PageApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false; //so I can start module in order
  PageApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showHome",
      "*url": "showPage",
    },
  });

  var API = {
    showHome: function(){
      PageApp.Show.Controller.showPage('home');
    },
    showPage: function(url){
      PageApp.Show.Controller.showPage(url);
    },
  };

  Cecilia.on("menu:page:show", function(url){
      Cecilia.navigate(url);
      API.showPage(url);
  });
  PageApp.on("start", function(){
    new PageApp.Router({
      controller: API,
    });
  });

  
});

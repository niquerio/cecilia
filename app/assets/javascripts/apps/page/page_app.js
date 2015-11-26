Cecilia.module("PageApp", function(PageApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false; //so I can start module in order
  PageApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showHome",
      "*url": "showPage",
    },
  });

  PageApp._API = {
    showHome: function(){
      PageApp.Show.Controller.showPage('home');
    },
    showPage: function(url){
      PageApp.Show.Controller.showPage(url);
    },
  };

  Cecilia.on("page:show", function(url){
      Cecilia.navigate(url);
      PageApp._API.showPage(url);
  });
  PageApp.on("start", function(){
    new PageApp.Router({
      controller: PageApp._API,
    });
  });

  
});

Cecilia.module("PageApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showPage: function(url){
      var pageEntity = Cecilia.request('page:entity', url)
      var pageView = new Show.Page({model: pageEntity});
      Cecilia.regions.main.show(pageView); 
    },
  };
});

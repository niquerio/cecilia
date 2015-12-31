Cecilia.module("PageApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showPage: function(url){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingPage = Cecilia.request('page:entity', url)
      $.when(fetchingPage).done(function(pageEntity){
        var pageView = new Show.Page({model: pageEntity});
        Cecilia.regions.main.show(pageView); 
      });
    },
  };
});

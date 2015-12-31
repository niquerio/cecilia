Cecilia.module("PageApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showPage: function(url){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingPage = Cecilia.request('page:entity', url)
      $.when(fetchingPage).done(function(pageEntity){
        var pageView;
        if(pageEntity != undefined){
          pageView = new Show.Page({model: pageEntity});
        }else{
          pageView = new Cecilia.Common.Views.Missing();
        }
        pageView.on("page:edit",function(args){
          Cecilia.trigger("admin:page:edit",args.model.get('id'));
        });
        Cecilia.regions.main.show(pageView); 
      });
    },
  };
});

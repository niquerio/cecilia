Cecilia.module("ActivityApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showActivity: function(id){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingActivity = Cecilia.request("activity:entity", id);
      $.when(fetchingActivity).done(function(activity){
        var activityView;  
        if(activity != undefined){
          activityView = new Show.Activity({model:activity});
        }else{
          activityView = new Cecilia.Common.Views.Missing({message: "This Activity Doesn't Exist!"})
        }

        activityView.on("activity:edit", function(args){
          Cecilia.trigger("admin:activity:edit", args.model.get('id'));
        });
        activityView.on("childview:teacher:show", function(args){
          Cecilia.trigger("teacher:show", args.model.get('username'));
        });
        Cecilia.regions.main.show(activityView);
      });
    },
  };
});

Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  ListTeachers.Controller = {
    listTeachers: function(){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingTeachers = Cecilia.request("user:entities:teachers");
      $.when(fetchingTeachers).done(function(teachers){
        var teachersView = new ListTeachers.Teachers({collection:teachers});

        teachersView.on("childview:teacher:show", function(args){
          Cecilia.trigger("teacher:show", args.model.get('username'));
        });
        teachersView.on("childview:childview:activity:edit", function(parentArgs, childArgs){
          Cecilia.trigger("admin:activity:edit", childArgs.model.get('id'));
        });
        teachersView.on("childview:childview:activity:show", function(parentArgs, childArgs){
          Cecilia.trigger("activity:show", childArgs.model.get('id'));
        });
        Cecilia.regions.main.show(teachersView);
      });
    },
  };
});

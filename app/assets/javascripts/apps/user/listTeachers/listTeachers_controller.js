Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  ListTeachers.Controller = {
    listTeachers: function(){
      var fetchingTeachers = Cecilia.request("user:entities:teachers");
      $.when(fetchingTeachers).done(function(teachers){
        var teachersView = new ListTeachers.Teachers({collection:teachers});

        teachersView.on("childview:teacher:show", function(args){
          Cecilia.trigger("teacher:show", args.model.get('username'));
        });
        teachersView.on("childview:childview:activity:show", function(parentArgs, childArgs){
          Cecilia.trigger("activity:show", childArgs.model.get('id'));
        });
        Cecilia.regions.main.show(teachersView);
      });
    },
  };
});

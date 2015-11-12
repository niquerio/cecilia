Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  ListTeachers.Controller = {
    listTeachers: function(){
      var fetchingTeachers = Cecilia.request("user:entities:teachers");
      $.when(fetchingTeachers).done(function(teachers){
        var teachersView = new ListTeachers.Teachers({collection:teachers});

        Cecilia.regions.main.show(teachersView);
      });
    },
  };
});

Cecilia.module("UserApp.ListAllTeachers", function(ListAllTeachers, Cecilia, Backbone, Marionette, $, _){
  ListAllTeachers.Controller = {
    listAllTeachers: function(){
      var fetchingTeachers = Cecilia.request("user:entities:teachers:all");
      $.when(fetchingTeachers).done(function(teachers){
        var teachersView = new ListAllTeachers.Teachers({collection:teachers});

        Cecilia.regions.main.show(teachersView);
      });
    },
  };
});
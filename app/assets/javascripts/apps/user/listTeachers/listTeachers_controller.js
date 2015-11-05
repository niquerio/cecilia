Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  ListTeachers.Controller = {
    listTeachers: function(){
      var teachers = Cecilia.request("user:entities:teachers");
      var teachersView = new ListTeachers.Teachers({collection:teachers});

      Cecilia.regions.main.show(teachersView);
    },
  };
});

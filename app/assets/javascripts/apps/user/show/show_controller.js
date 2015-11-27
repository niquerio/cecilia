Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showTeacher: function(username){
      var fetchingTeacher = Cecilia.request("teacher:entity", username);
      $.when(fetchingTeacher).done(function(teacher){
        var teacherView = new Show.Teacher({model:teacher});

        Cecilia.regions.main.show(teacherView);
      });
    },
  };
});

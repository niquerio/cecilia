Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showTeacher: function(username){
      var fetchingTeacher = Cecilia.request("teacher:entity", username);
      $.when(fetchingTeacher).done(function(teacher){
        var teacherView = new Show.Teacher({model:teacher});

        teacherView.on("childview:activity:show", function(args){
          Cecilia.trigger("activity:show", args.model.get('id'));
        });
        Cecilia.regions.main.show(teacherView);
      });
    },
  };
});

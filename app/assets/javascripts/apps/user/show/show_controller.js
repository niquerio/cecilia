Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Controller = {
    showTeacher: function(username){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingTeacher = Cecilia.request("teacher:entity", username);
      $.when(fetchingTeacher).done(function(teacher){
        var teacherView;
        if(teacher != undefined){ 
          teacherView = new Show.Teacher({model:teacher});
        }else{
          teacherView = new Cecilia.Common.Views.Missing({message: "This Teacher Doesn't Exist!"})
        }

        teacherView.on("user:edit", function(args){
          Cecilia.trigger("admin:user:edit", args.model.get('id'));
        });
        teacherView.on("childview:activity:show", function(args){
          Cecilia.trigger("activity:show", args.model.get('id'));
        });
        Cecilia.regions.main.show(teacherView);
      });
    },
  };
});

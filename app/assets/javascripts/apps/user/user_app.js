Cecilia.module("UserApp", function(UserApp, Cecilia, Backbone, Marionette, $, _){
  UserApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "teachers" : "listTeachers",
      "staff" : "listStaff",
    }
  });

  var API = {
    listTeachers: function(){
      UserApp.ListTeachers.Controller.listTeachers();
    },
    listStaff: function(){
      UserApp.ListStaff.Controller.listStaff();
    },
  };

  Cecilia.on("menu:user:teachers:list", function(){
    Cecilia.navigate('teachers')
    API.listTeachers();
  });
  Cecilia.on("menu:user:staff:list", function(){
    Cecilia.navigate('staff')
    API.listStaff();
  });

  UserApp.on("start", function(){
    new UserApp.Router({
      controller: API,
    });
  });
});

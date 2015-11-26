Cecilia.module("UserApp", function(UserApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false; //so I can start module in order
  UserApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "teachers" : "listTeachers",
      "staff" : "listStaff",
      "all_teachers" : "listAllTeachers",
    }
  });

  UserApp._API = {
    listTeachers: function(){
      UserApp.ListTeachers.Controller.listTeachers();
    },
    listAllTeachers: function(){
      UserApp.ListAllTeachers.Controller.listAllTeachers();
    },
    listStaff: function(){
      UserApp.ListStaff.Controller.listStaff();
    },
  };

  Cecilia.on("user:teachers:list", function(){
    Cecilia.navigate('teachers')
    UserApp._API.listTeachers();
  });
  Cecilia.on("user:teachers:list:all", function(){
    Cecilia.navigate('all_teachers')
    UserApp._API.listAllTeachers();
  });
  Cecilia.on("user:staff:list", function(){
    Cecilia.navigate('staff')
    UserApp._API.listStaff();
  });

  UserApp.on("start", function(){
    new UserApp.Router({
      controller: UserApp._API,
    });
  });
});

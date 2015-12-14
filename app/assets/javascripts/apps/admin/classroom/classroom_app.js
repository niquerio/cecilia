Cecilia.module("AdminClassroomApp", function(AdminClassroomApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminClassroomApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/classrooms" : "listClassrooms",
    }
  });

  AdminClassroomApp._API = {
    listClassrooms: function(){
      AdminClassroomApp.List.Controller.listClassrooms();
    },
  };

  Cecilia.on("admin:classroom:list", function(){
    Cecilia.navigate('admin/classrooms')
    AdminClassroomApp._API.listClassrooms();
  });

  AdminClassroomApp.on("start", function(){
    new AdminClassroomApp.Router({
      controller: AdminClassroomApp._API,
    });
  });
});

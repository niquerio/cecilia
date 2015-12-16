Cecilia.module("AdminClassroomApp", function(AdminClassroomApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminClassroomApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/classrooms" : "listClassrooms",
      "admin/classrooms/:id/edit" : "editClassroom",
    }
  });

  AdminClassroomApp._API = {
    listClassrooms: function(){
      AdminClassroomApp.List.Controller.listClassrooms();
    },

    editClassroom: function(id){
      AdminClassroomApp.Edit.Controller.editClassroom(id);
    }
  };

  Cecilia.on("admin:classroom:list", function(){
    Cecilia.navigate('admin/classrooms')
    AdminClassroomApp._API.listClassrooms();
  });

  Cecilia.on("admin:classroom:edit", function(id){
    Cecilia.navigate('admin/classrooms/' + id + '/edit')
    AdminClassroomApp._API.editClassroom(id);
  });

  AdminClassroomApp.on("start", function(){
    new AdminClassroomApp.Router({
      controller: AdminClassroomApp._API,
    });
  });
});

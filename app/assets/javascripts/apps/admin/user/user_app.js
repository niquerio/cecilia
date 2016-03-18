Cecilia.module("AdminUserApp", function(AdminUserApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminUserApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/users" : "listUsers",
      "admin/users/:id/edit" : "editUser",
    }
  });

  AdminUserApp._API = {
    listUsers: function(){
      AdminUserApp.List.Controller.listUsers();
    },

    editUser: function(id){
      AdminUserApp.Edit.Controller.editUser(id);
    }
  };

  Cecilia.on("admin:user:list", function(){
    Cecilia.navigate('admin/users')
    AdminUserApp._API.listUsers();
  });

  Cecilia.on("admin:user:edit", function(id){
    Cecilia.navigate('admin/users/' + id + '/edit')
    AdminUserApp._API.editUser(id);
  });

  AdminUserApp.on("start", function(){
    new AdminUserApp.Router({
      controller: AdminUserApp._API,
    });
  });
});

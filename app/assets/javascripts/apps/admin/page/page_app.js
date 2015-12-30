Cecilia.module("AdminPageApp", function(AdminPageApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminPageApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/pages" : "listPages",
      "admin/pages/:id/edit" : "editPage",
    }
  });

  AdminPageApp._API = {
    listPages: function(){
      AdminPageApp.List.Controller.listPages();
    },

    editPage: function(id){
      AdminPageApp.Edit.Controller.editPage(id);
    }
  };

  Cecilia.on("admin:page:list", function(){
    Cecilia.navigate('admin/pages')
    AdminPageApp._API.listPages();
  });

  Cecilia.on("admin:page:edit", function(id){
    Cecilia.navigate('admin/pages/' + id + '/edit')
    AdminPageApp._API.editPage(id);
  });

  AdminPageApp.on("start", function(){
    new AdminPageApp.Router({
      controller: AdminPageApp._API,
    });
  });
});

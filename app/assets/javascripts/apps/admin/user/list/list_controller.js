Cecilia.module("AdminUserApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listUsers: function(){
      var fetchingUsers = Cecilia.request("admin:user:entities");
      $.when(fetchingUsers).done(function(users){
        var usersView = new List.Users({collection:users});


        usersView.on("user:new", function(){
          var newUser = new Cecilia.Entities.AdminUser({
            id: null,
          });
          var view = new List.NewModal({
            model: newUser
          })

          this.listenTo(view, "user:created", function(newUser){
            users.add(newUser);
          });

          Cecilia.regions.dialog.show(view);
        });
        
        usersView.on("childview:user:edit", function(parentArgs, args){
          var view = new List.EditModal({
            model: args.model,
          });

          this.listenTo(view, "user:updated", function(){
            args.view.render();
          });

          Cecilia.regions.dialog.show(view);
        });

        Cecilia.regions.main.show(usersView);
      });
    },
  };
});

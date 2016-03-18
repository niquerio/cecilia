Cecilia.module("AdminUserApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listUsers: function(){
      var fetchingUsers = Cecilia.request("admin:user:entities");
      $.when(fetchingUsers).done(function(users){
        var usersView = new List.Users({collection:users});


        usersView.on("user:new", function(){
          var fetchingTitles = Cecilia.request("title:entities");
          var self = this;
          $.when(fetchingTitles).done(function(titles){
            var newUser = new Cecilia.Entities.AdminUser({
              id: null,
            });
            var view = new List.NewModal({
              model: newUser,
              templateHelpers: function(){
                return {
                  'modal_title': "New User",
                  'titles': titles,
                  'button_text': 'Create',
                }
              }
            })

            self.listenTo(view, "user:created", function(newUser){
              users.add(newUser);
            });

            Cecilia.regions.dialog.show(view);
          });
        });
        
        usersView.on("childview:user:edit", function(parentArgs, args){
          var fetchingTitles = Cecilia.request("title:entities");
          var self = this;
          $.when(fetchingTitles).done(function(titles){
            var view = new List.EditModal({
              model: args.model,
              templateHelpers: function(){
                return {
                  'modal_title': 'Edit ' + this.model.get('sca_first_name') + ' ' + this.model.get('sca_last_name'),
                  'titles': titles,
                  'button_text': 'Update'
                }
              },
            });

            self.listenTo(view, "user:updated", function(){
              args.view.render();
            });

            Cecilia.regions.dialog.show(view);
          });
        });
        usersView.on("childview:user:show", function(parentArgs, args){
          Cecilia.trigger("teacher:show",args.model.get('username'));
        });

        Cecilia.regions.main.show(usersView);
      });
    },
  };
});

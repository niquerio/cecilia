Cecilia.module("AdminUserApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Controller = {
    editUser: function(id){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingUser = Cecilia.request("admin:user:entity", id);
      var fetchingTitles = Cecilia.request("title:entities");
      $.when(fetchingUser,fetchingTitles).done(function(user,titles){
        var userView;
        if(user != undefined){
          userView = new Edit.UserPage({
              model:user,
              templateHelpers: function(){
                return {
                  'modal_title': 'Edit ' + this.model.get('sca_first_name') + ' ' + this.model.get('sca_last_name'),
                  'titles': titles,
                  'button_text': 'Update',
                }
              },
          });
        }else{
          userView = new Cecilia.Common.Views.Missing({message:'This User Does Not Exist'});
        }

        userView.on("user:updated",function(user){
          Cecilia.trigger("teacher:show", user.get('username'));
        });
        userView.on("form:submit", function(data){
          if(user.save(data)){
            this.trigger("user:updated", user);
          }else{
            this.triggerMethod("form:data:invalid", this.model.validationError);
          }
        });
        Cecilia.regions.main.show(userView);
      });
    },
  };
});

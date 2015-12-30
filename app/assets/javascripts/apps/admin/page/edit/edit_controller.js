Cecilia.module("AdminPageApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Controller = {
    editPage: function(id){
      var fetchingPage = Cecilia.request("admin:page:entity", id);
      $.when(fetchingPage).done(function(page){
        var pageView = new Edit.Page({model:page});

        pageView.on("page:updated",function(){
          Cecilia.trigger("page:show", page.get('slug'));
        });
        pageView.on("form:submit", function(data){
          if(page.save(data)){
            this.trigger("page:updated");
          }
          else{
            this.triggerMethod("form:data:invalid", this.model.validationError);
          }
        });

        Cecilia.regions.main.show(pageView);
      });
    },
    
  };
});

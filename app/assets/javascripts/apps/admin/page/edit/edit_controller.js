Cecilia.module("AdminPageApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Controller = {
    editPage: function(id){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingPage = Cecilia.request("admin:page:entity", id);
      $.when(fetchingPage).done(function(page){
        var pageView;
        if(page != undefined){
          pageView = new Edit.Page({model:page});
        }else{
          pageView = new Cecilia.Common.Views.Missing()
        }

        pageView.on("form:data:invalid", function(error){
          console.log("Page Update Error: " + error)
        });
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

Cecilia.module("AdminPageApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listPages: function(){
      var fetchingPages = Cecilia.request("admin:page:entities");
      $.when(fetchingPages).done(function(pages){
        var pagesView = new List.Pages({collection:pages});
        
        pagesView.on("childview:page:edit", function(parentArgs, args){
          Cecilia.trigger("admin:page:edit",args.model.get('id'));
        });

        Cecilia.regions.main.show(pagesView);
      });
    },
  };
});

Cecilia.module("MenuApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listMenu: function(){
      var links = Cecilia.request("menu:entities");
      var menu = new List.Menu({collection: links});
      
      menu.on("childview:childview:navigate", function(childView, args){
        var url = args.model.get('url');
        var page_type = args.model.get('page_type');
        if(page_type == "page"){
          Cecilia.trigger('menu:page:show', url);
        }
      });
      menu.on("childview:navigate", function(childView, args){
        var url = args.model.get('url');
        var page_type = args.model.get('page_type');
        if(page_type == "page"){
          Cecilia.trigger('menu:page:show', url);
        }
      });
      Cecilia.regions.header.show(menu);
    },
  };
});

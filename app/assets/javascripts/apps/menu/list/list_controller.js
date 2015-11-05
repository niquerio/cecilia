Cecilia.module("MenuApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listMenu: function(){
      var links = Cecilia.request("menu:entities");
      var menu = new List.Menu({collection: links});
      
      var childViewNavigate = function(childView, args){
        var url = args.model.get('url');
        var page_type = args.model.get('page_type');
        switch(page_type){
          case "page":
            Cecilia.trigger('menu:page:show', url);
            break;
          case "class_schedule":
            Cecilia.trigger('menu:activity:showSchedule');
            break;
          case "classes":
            Cecilia.trigger('menu:activity:list');
            break;
          case "teachers":
            Cecilia.trigger('menu:user:teachers:list');
            break;
          case "staff":
            Cecilia.trigger('menu:user:staff:list');
            break;
        }
      };
      menu.on("childview:childview:navigate", function(childView, args){
        childViewNavigate(childView, args);
      });
      menu.on("childview:navigate", function(childView, args){
        childViewNavigate(childView, args);
      });
      Cecilia.regions.header.show(menu);
    },
  };
});

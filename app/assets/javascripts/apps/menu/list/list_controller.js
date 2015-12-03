Cecilia.module("MenuApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listMenu: function(){
      var links = Cecilia.request("menu:entities");
      var menu = new List.Menu({collection: links});
      var mobile_nav = new List.MobileNav({collection:links});
      
      var childViewNavigate = function(args){
        var url = args.model.get('url');
        switch(url){
          case "class_schedule":
            Cecilia.trigger('activity:showSchedule');
            break;
          case "classes":
            Cecilia.trigger('activity:list');
            break;
          case "all_classes":
            Cecilia.trigger('activity:list:all');
            break;
          case "teachers":
            Cecilia.trigger('user:teachers:list');
            break;
          case "all_teachers":
            Cecilia.trigger('user:teachers:list:all');
            break;
          case "staff":
            Cecilia.trigger('user:staff:list');
            break;
          default:
            Cecilia.trigger('page:show', url);
            break;
        }
      };
      menu.on("childview:childview:navigate", function(parentArgs, childArgs){
        childViewNavigate(childArgs);
      });
      menu.on("childview:navigate", function(args){
        childViewNavigate(args);
      });
      mobile_nav.on("childview:childview:navigate", function(parentArgs, childArgs){
        childViewNavigate(childArgs);
      });
      mobile_nav.on("childview:navigate", function(args){
        childViewNavigate(args);
      });
      Cecilia.regions.mobile.show(mobile_nav);
      Cecilia.regions.header.show(menu);
    },
  };
});

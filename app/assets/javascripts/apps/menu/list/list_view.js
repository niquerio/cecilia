Cecilia.module("MenuApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.MenuItem = Marionette.ItemView.extend({
    template: "menu/menu_item",
    tagName: "li",
    triggers: {
      "click" : "navigate",
    },
  });

  List.TopLevel = Marionette.CompositeView.extend({
    tagName: "li",
    childView: List.MenuItem,
    childViewContainer: "ul",
    initialize: function(){
      this.collection = this.model.get('children')
      if(this.collection.length){
        this.template = "menu/dropdown"
        this.className = "dropdown"
      }else{
        this.template = "menu/single_top_level"
        this.triggers = {
          "click" : "navigate",
        };
      }

    },
  });

 List.Menu = Marionette.CompositeView.extend({
  template: 'menu/menu',
  tagname: 'nav',
  childViewContainer: ".navbar-nav",
  childView: List.TopLevel,
  className: "navbar navbar-default",

  });
});

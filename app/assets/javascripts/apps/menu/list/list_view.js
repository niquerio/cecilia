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
        this.$el.addClass('dropdown')
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
  tagname: 'div',
  childViewContainer: ".navbar-nav",
  childView: List.TopLevel,
  className: "navbar transparent navbar-default",

  });
  List.MobileNav = Marionette.CompositeView.extend({
    template: "menu/menu_mobile",
    className: "container-fluid",
    childViewContainer: "ul",
    childView: List.TopLevel,
    triggers:{
    "click .navbar-brand": "navigate:home",
    },
  });
});

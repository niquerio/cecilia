Cecilia.module("MenuApp", function(Menu, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  var API = {
    listMenu: function(){
      Menu.List.Controller.listMenu();
    },
  };

  Menu.on("start", function(){
    API.listMenu();
  });
});

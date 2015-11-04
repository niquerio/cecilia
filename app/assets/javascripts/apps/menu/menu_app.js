Cecilia.module("MenuApp", function(Menu, Cecilia, Backbone, Marionette, $, _){
  var API = {
    listMenu: function(){
      Menu.List.Controller.listMenu();
    },
  };

  Menu.on("start", function(){
    API.listMenu();
  });
});

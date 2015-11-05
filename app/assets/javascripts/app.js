Marionette.Renderer.render = function(template, data){
  return JST[template](data);
};

var Cecilia = new Marionette.Application();

Cecilia.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

Cecilia.getCurrentRoute = function(){
  return Backbone.history.fragment
};
Cecilia.on("before:start", function(){
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      header: "#header-region",
      main: "#main-region",
      dialog: "#dialog-region"
    }
  });
  Cecilia.regions = new RegionContainer();
  Cecilia.regions.dialog.onShow = function(view){
    var self = this;
    var closeDialog = function(){
      self.stopListening();
      self.empty();
      self.$el.dialog("destroy");
    };

    this.listenTo(view, "dialog:close", closeDialog);

    this.$el.dialog({
      modal: true,
      title: view.title,
      width: "auto",
      close: function(e, ui){
        closeDialog();
      }
    });
  };
});

Cecilia.on("start", function(){
  //Modules started in order. Page app at top because it is the default route
  Cecilia.module("PageApp").start();
  Cecilia.module("MenuApp").start();
  Cecilia.module("ActivityApp").start();
  if(Backbone.history){
    Backbone.history.start();

  }
});

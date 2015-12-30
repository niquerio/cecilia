Marionette.Renderer.render = function(template, data){
  return JST[template](data);
};

var Cecilia = new Marionette.Application();

Cecilia.Constants = {
  current_event_id: 4,
};

Cecilia.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

Cecilia.getCurrentRoute = function(){
  return Backbone.history.fragment
};

Cecilia.RegionContainer = Marionette.LayoutView.extend({
  el: "#app-container",

  regions: {
    mobile: "#mobile-nav-region",
    header: "#header-region",
    main: "#main-region",
    dialog: "#dialog-region"
  }
});

Cecilia._configureRegions = function(){
  this.regions = new Cecilia.RegionContainer();
};

Cecilia.on("before:start", function(){
  Cecilia._configureRegions();
});

Cecilia.on("start", function(){
  //Modules started in order. Page app at top because it is the default route
  Cecilia.module("PageApp").start();
  Cecilia.module("MenuApp").start();
  Cecilia.module("ActivityApp").start();
  Cecilia.module("UserApp").start();
  if(Cecilia.currentUser != null){
    Cecilia.module("AdminClassroomApp").start();
    Cecilia.module("AdminActivityApp").start();
    Cecilia.module("AdminPageApp").start();
  }
  if(Backbone.history){
    Backbone.history.start();

  }
});

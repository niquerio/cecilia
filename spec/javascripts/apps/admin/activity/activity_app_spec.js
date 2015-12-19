describe("AdminActivityApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.AdminActivityApp, "Router");

    Cecilia.AdminActivityApp.start();
    expect(Cecilia.AdminActivityApp.Router).to.have.been.calledWithNew.once;

    Cecilia.AdminActivityApp.stop();    
  }));
  describe("API",function(){
    describe("listActivities",function(){
      it("executes AdminActivitiesApp.List.Controller.listActivities", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminActivityApp.List.Controller, "listActivities");

        Cecilia.AdminActivityApp._API.listActivities();
        expect(Cecilia.AdminActivityApp.List.Controller.listActivities).to.have.been.called.once;

        Cecilia.AdminActivityApp.List.Controller.listActivities.restore();
        Cecilia.navigate.restore();
      });
    });
  });
  describe("routing",function(){
    var routing_setup = function(){
      Cecilia.AdminActivityApp.start();
      Backbone.history.start();
    }
    var routing_cleanup = function(){
      Cecilia.AdminActivityApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }
    xit("routes to common view if not logged in")
    it("executes the API's listActivities", sinon.test(function(){
      this.stub(Cecilia.AdminActivityApp._API, "listActivities");
      routing_setup();

      Cecilia.navigate("admin/activities", {trigger:true});
      expect(Cecilia.AdminActivityApp._API.listActivities).to.have.been.called.once;

      routing_cleanup();
    }));

  });
  describe("triggers",function(){
    var trigger_setup = function(){
        Cecilia.AdminActivityApp.start();
        sinon.stub(Cecilia, "navigate");
    }
    var trigger_cleanup = function(){
        Cecilia.navigate.restore();
        Cecilia.AdminActivityApp.stop();
    
    }
    describe("'activity:list'",function(){
      it("navigates to activity list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminActivityApp._API, "listActivities");
        

        Cecilia.trigger("admin:activity:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));
    });
  });
});

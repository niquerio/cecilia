describe("ActivityApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.ActivityApp, "Router");

    Cecilia.ActivityApp.start();
    expect(Cecilia.ActivityApp.Router).to.have.been.calledWithNew.once;

    Cecilia.ActivityApp.stop();    
  }));

  describe("API", function(){
    describe("listActivities",function(){
      it("executes ActivityApp.List.Controller.listActivities", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.List.Controller, "listActivities");

        Cecilia.ActivityApp._API.listActivities();
        expect(Cecilia.ActivityApp.List.Controller.listActivities).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.ActivityApp.List.Controller.listActivities.restore();
      });
    });
    describe("listAllActivities",function(){
      it("executes ActivityApp.ListAll.Controller.listAllActivities", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.ListAll.Controller, "listAllActivities");

        Cecilia.ActivityApp._API.listAllActivities();
        expect(Cecilia.ActivityApp.ListAll.Controller.listAllActivities).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.ActivityApp.ListAll.Controller.listAllActivities.restore();
      });
    });
    describe("showActivitiesSchedule",function(){
      it("executes ActivityApp.ShowSchedule.Controller.showActivitiesSchedule", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.ShowSchedule.Controller,"showActivitiesSchedule");

        Cecilia.ActivityApp._API.showActivitiesSchedule();
        expect(Cecilia.ActivityApp.ShowSchedule.Controller.showActivitiesSchedule).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.ActivityApp.ShowSchedule.Controller.showActivitiesSchedule.restore();
      });
    });
  });
  describe("routing", function(){
    it("executes the API's listActivities", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "listActivities");
      Cecilia.ActivityApp.start();
      Backbone.history.start();

      Cecilia.navigate("classes", {trigger:true});
      expect(Cecilia.ActivityApp._API.listActivities).to.have.been.called.once;

      Cecilia.ActivityApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
    it("executes the API's listActivities", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "listAllActivities");
      Cecilia.ActivityApp.start();
      Backbone.history.start();

      Cecilia.navigate("all_classes", {trigger:true});
      expect(Cecilia.ActivityApp._API.listAllActivities).to.have.been.called.once;

      Cecilia.ActivityApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
    it("executes the API's showActivitiesSchedule", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
      Cecilia.ActivityApp.start();
      Backbone.history.start();

      Cecilia.navigate("class_schedule", {trigger:true});
      expect(Cecilia.ActivityApp._API.showActivitiesSchedule).to.have.been.called.once;

      Cecilia.ActivityApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
  });
  describe("triggers", function(){
    describe("'activity:list'", function(){
      it("navigates to activity list", sinon.test(function(){
        Cecilia.ActivityApp.start();
        this.stub(Cecilia, "navigate");
        this.stub(Cecilia.ActivityApp._API, "listActivities");
        

        Cecilia.trigger("activity:list");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.ActivityApp.stop();
      }));
      it("executes the API's listActivitis", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp._API, "listActivities");
        Cecilia.ActivityApp.start();
      
        Cecilia.trigger("activity:list");
        expect(Cecilia.ActivityApp._API.listActivities).to.have.been.called.once;

        Cecilia.ActivityApp.stop();
        Cecilia.navigate.restore();
        Cecilia.ActivityApp._API.listActivities.restore();
      });

    });
    describe("'activity:list:all'", function(){
      it("navigates to complete activity list", sinon.test(function(){
        Cecilia.ActivityApp.start();
        this.stub(Cecilia, "navigate");
        this.stub(Cecilia.ActivityApp._API, "listAllActivities");
        

        Cecilia.trigger("activity:list:all");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.ActivityApp.stop();
      }));
      it("executes the API's listAllActivities", function(){
        Cecilia.ActivityApp.start();
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp._API, "listAllActivities");
      
        Cecilia.trigger("activity:list:all");
        expect(Cecilia.ActivityApp._API.listAllActivities).to.have.been.called.once;

        Cecilia.ActivityApp.stop();
        Cecilia.navigate.restore();
        Cecilia.ActivityApp._API.listAllActivities.restore();
      });

    });
    describe("'activity:showSchedule'", function(){
      it("navigates to activity schedule", function(){
        Cecilia.ActivityApp.start();
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
        

        Cecilia.trigger("activity:showSchedule");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.ActivityApp.stop();
        Cecilia.navigate.restore();
        Cecilia.ActivityApp._API.showActivitiesSchedule.restore();
      });
      it("executes the API's showActivitiesSchedule", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
        Cecilia.ActivityApp.start();
      
        Cecilia.trigger("activity:showSchedule");
        expect(Cecilia.ActivityApp._API.showActivitiesSchedule).to.have.been.called.once;

        Cecilia.ActivityApp.stop();
        Cecilia.navigate.restore();
        Cecilia.ActivityApp._API.showActivitiesSchedule.restore();
      });

    });
  });
});

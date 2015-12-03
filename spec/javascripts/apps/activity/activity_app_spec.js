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

        Cecilia.ActivityApp.List.Controller.listActivities.restore();
        Cecilia.navigate.restore();
      });
    });
    describe("showActivity",function(){
      it("executes ActivityApp.Show.Controller.showActivity", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.Show.Controller, "showActivity");

        Cecilia.ActivityApp._API.showActivity(2);
        expect(Cecilia.ActivityApp.Show.Controller.showActivity).to.have.been.calledWith(2).once;

        Cecilia.ActivityApp.Show.Controller.showActivity.restore();
        Cecilia.navigate.restore();
      });
    });
    describe("listAllActivities",function(){
      it("executes ActivityApp.ListAll.Controller.listAllActivities", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.ListAll.Controller, "listAllActivities");

        Cecilia.ActivityApp._API.listAllActivities();
        expect(Cecilia.ActivityApp.ListAll.Controller.listAllActivities).to.have.been.called.once;

        Cecilia.ActivityApp.ListAll.Controller.listAllActivities.restore();
        Cecilia.navigate.restore();
      });
    });
    describe("showActivitiesSchedule",function(){
      it("executes ActivityApp.ShowSchedule.Controller.showActivitiesSchedule", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.ActivityApp.ShowSchedule.Controller,"showActivitiesSchedule");

        Cecilia.ActivityApp._API.showActivitiesSchedule();
        expect(Cecilia.ActivityApp.ShowSchedule.Controller.showActivitiesSchedule).to.have.been.called.once;

        Cecilia.ActivityApp.ShowSchedule.Controller.showActivitiesSchedule.restore();
        Cecilia.navigate.restore();
      });
    });
  });
  describe("routing", function(){
    var routing_setup = function(){
      Cecilia.ActivityApp.start();
      Backbone.history.start();
    }
    var routing_cleanup = function(){
      Cecilia.ActivityApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }
    it("executes the API's listActivities", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "listActivities");
      routing_setup();

      Cecilia.navigate("classes", {trigger:true});
      expect(Cecilia.ActivityApp._API.listActivities).to.have.been.called.once;

      routing_cleanup();
    }));
    it("executes the API's listAllActivities", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "listAllActivities");
      routing_setup();

      Cecilia.navigate("all_classes", {trigger:true});
      expect(Cecilia.ActivityApp._API.listAllActivities).to.have.been.called.once;

      routing_cleanup();
    }));
    it("executes the API's showActivitiesSchedule", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
      routing_setup();

      Cecilia.navigate("class_schedule", {trigger:true});
      expect(Cecilia.ActivityApp._API.showActivitiesSchedule).to.have.been.called.once;

      routing_cleanup();
    }));
    it("executes the API's showActivity", sinon.test(function(){
      this.stub(Cecilia.ActivityApp._API, "showActivity");
      routing_setup();

      Cecilia.navigate("activities/2", {trigger:true});
      expect(Cecilia.ActivityApp._API.showActivity).to.have.been.calledWith('2').once;

      routing_cleanup();
    }));
  });
  describe("triggers", function(){
    var trigger_setup = function(){
        Cecilia.ActivityApp.start();
        sinon.stub(Cecilia, "navigate");
    }
    var trigger_cleanup = function(){
        Cecilia.navigate.restore();
        Cecilia.ActivityApp.stop();
    
    }
    describe("'activity:list'", function(){
      it("navigates to activity list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.ActivityApp._API, "listActivities");
        

        Cecilia.trigger("activity:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));
      it("executes the API's listActivitis", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "listActivities");
      
        Cecilia.trigger("activity:list");
        expect(Cecilia.ActivityApp._API.listActivities).to.have.been.called.once;

        Cecilia.ActivityApp._API.listActivities.restore();
        trigger_cleanup();
      });

    });
    describe("'activity:list:all'", function(){
      it("navigates to complete activity list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.ActivityApp._API, "listAllActivities");
        

        Cecilia.trigger("activity:list:all");
        expect(Cecilia.navigate).to.have.been.called.once;


        trigger_cleanup();
      }));
      it("executes the API's listAllActivities", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "listAllActivities");
      
        Cecilia.trigger("activity:list:all");
        expect(Cecilia.ActivityApp._API.listAllActivities).to.have.been.called.once;

        Cecilia.ActivityApp._API.listAllActivities.restore();
        trigger_cleanup();
      });

    });
    describe("'activity:showSchedule'", function(){
      it("navigates to activity schedule", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
        

        Cecilia.trigger("activity:showSchedule");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.ActivityApp._API.showActivitiesSchedule.restore();
        trigger_cleanup();
      });
      it("executes the API's showActivitiesSchedule", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "showActivitiesSchedule");
      
        Cecilia.trigger("activity:showSchedule");
        expect(Cecilia.ActivityApp._API.showActivitiesSchedule).to.have.been.called.once;

        Cecilia.ActivityApp._API.showActivitiesSchedule.restore();
        trigger_cleanup();
      });

    });
    describe("'activity:show'", function(){
      it("navigates to activity with appropriate id", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "showActivity");
        

        Cecilia.trigger("activity:show");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.ActivityApp._API.showActivity.restore();
        trigger_cleanup();
      });
      it("executes the API's showActivitiesSchedule", function(){
        trigger_setup();
        sinon.stub(Cecilia.ActivityApp._API, "showActivity");
      
        Cecilia.trigger("activity:show", '2');
        expect(Cecilia.ActivityApp._API.showActivity).to.have.been.calledWith('2').once;

        Cecilia.ActivityApp._API.showActivity.restore();
        trigger_cleanup();
      });

    });
  });
});

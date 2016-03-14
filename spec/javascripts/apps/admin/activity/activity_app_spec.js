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
    describe("editSchedule",function(){
      it("executes AdminActivitiesApp.EditSchedule.Controller.editSchedule", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminActivityApp.EditSchedule.Controller, "editSchedule");

        Cecilia.AdminActivityApp._API.editSchedule();
        expect(Cecilia.AdminActivityApp.EditSchedule.Controller.editSchedule).to.have.been.called.once;

        Cecilia.AdminActivityApp.EditSchedule.Controller.editSchedule.restore();
        Cecilia.navigate.restore();
      });
    });
    describe("editActivity",function(){
      it("executes AdminActivitiesApp.Edit.Controller.editActivity", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminActivityApp.Edit.Controller, "editActivity");

        Cecilia.AdminActivityApp._API.editActivity(3);
        expect(Cecilia.AdminActivityApp.Edit.Controller.editActivity).to.have.been.calledWith(3).once;

        Cecilia.AdminActivityApp.Edit.Controller.editActivity.restore();
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
    it("executes the API's editActivity", sinon.test(function(){
      this.stub(Cecilia.AdminActivityApp._API, "editActivity");
      routing_setup();

      Cecilia.navigate("activities/3/edit", {trigger:true});
      expect(Cecilia.AdminActivityApp._API.editActivity).to.have.been.calledWith('3').once;

      routing_cleanup();
    }));
    it("executes the API's listActivities", sinon.test(function(){
      this.stub(Cecilia.AdminActivityApp._API, "listActivities");
      routing_setup();

      Cecilia.navigate("admin/activities", {trigger:true});
      expect(Cecilia.AdminActivityApp._API.listActivities).to.have.been.called.once;

      routing_cleanup();
    }));
    it("executes the API's editSchedule", sinon.test(function(){
      this.stub(Cecilia.AdminActivityApp._API, "editSchedule");
      routing_setup();

      Cecilia.navigate("admin/scheduler", {trigger:true});
      expect(Cecilia.AdminActivityApp._API.editSchedule).to.have.been.called.once;

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
    describe("'admin:activity:edit'",function(){
      it("navigates to edit activity page", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminActivityApp._API, "editActivity");
        

        Cecilia.trigger("admin:activity:edit",3);
        expect(Cecilia.navigate).to.have.been.calledWith('activities/3/edit').once;

        trigger_cleanup();
      }));
    });
    describe("'admin:activity:list'",function(){
      it("navigates to activity list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminActivityApp._API, "listActivities");
        

        Cecilia.trigger("admin:activity:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));
    });
    describe("'admin:activity:editSchedule'",function(){
      it("navigates to scheduler", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminActivityApp._API, "editSchedule");
        

        Cecilia.trigger("admin:activity:editSchedule");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));
    });
  });
});

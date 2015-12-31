describe("AdminClassroomApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.AdminClassroomApp, "Router");

    Cecilia.AdminClassroomApp.start();
    expect(Cecilia.AdminClassroomApp.Router).to.have.been.calledWithNew.once;

    Cecilia.AdminClassroomApp.stop();    
  }));

  describe("API", function(){
    describe("listClassrooms",function(){
      it("executes AdminClassroomApp.List.Controller.listClassrooms", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminClassroomApp.List.Controller, "listClassrooms");

        Cecilia.AdminClassroomApp._API.listClassrooms();
        expect(Cecilia.AdminClassroomApp.List.Controller.listClassrooms).to.have.been.called.once;

        Cecilia.AdminClassroomApp.List.Controller.listClassrooms.restore();
        Cecilia.navigate.restore();
      });
    });
  });
  describe("routing", function(){
    var routing_setup = function(){
      Cecilia.AdminClassroomApp.start();
      Backbone.history.start();
    }
    var routing_cleanup = function(){
      Cecilia.AdminClassroomApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }
    it("executes the API's listClassrooms", sinon.test(function(){
      this.stub(Cecilia.AdminClassroomApp._API, "listClassrooms");
      routing_setup();

      Cecilia.navigate("admin/classrooms", {trigger:true});
      expect(Cecilia.AdminClassroomApp._API.listClassrooms).to.have.been.called.once;

      routing_cleanup();
    }));
  });
  describe("triggers", function(){
    var trigger_setup = function(){
        Cecilia.AdminClassroomApp.start();
        sinon.stub(Cecilia, "navigate");
    }
    var trigger_cleanup = function(){
        Cecilia.navigate.restore();
        Cecilia.AdminClassroomApp.stop();
    
    }
    describe("'classroom:list'", function(){
      it("navigates to classroom list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminClassroomApp._API, "listClassrooms");
        

        Cecilia.trigger("admin:classroom:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));

    });

  });
});

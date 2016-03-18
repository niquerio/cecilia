describe("AdminUserApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.AdminUserApp, "Router");

    Cecilia.AdminUserApp.start();
    expect(Cecilia.AdminUserApp.Router).to.have.been.calledWithNew.once;

    Cecilia.AdminUserApp.stop();    
  }));

  describe("API", function(){
    describe("listUsers",function(){
      it("executes AdminUserApp.List.Controller.listUsers", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminUserApp.List.Controller, "listUsers");

        Cecilia.AdminUserApp._API.listUsers();
        expect(Cecilia.AdminUserApp.List.Controller.listUsers).to.have.been.called.once;

        Cecilia.AdminUserApp.List.Controller.listUsers.restore();
        Cecilia.navigate.restore();
      });
    });
  });
  describe("routing", function(){
    var routing_setup = function(){
      Cecilia.AdminUserApp.start();
      Backbone.history.start();
    }
    var routing_cleanup = function(){
      Cecilia.AdminUserApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }
    it("executes the API's listUsers", sinon.test(function(){
      this.stub(Cecilia.AdminUserApp._API, "listUsers");
      routing_setup();

      Cecilia.navigate("admin/users", {trigger:true});
      expect(Cecilia.AdminUserApp._API.listUsers).to.have.been.called.once;

      routing_cleanup();
    }));
  });
  describe("triggers", function(){
    var trigger_setup = function(){
        Cecilia.AdminUserApp.start();
        sinon.stub(Cecilia, "navigate");
    }
    var trigger_cleanup = function(){
        Cecilia.navigate.restore();
        Cecilia.AdminUserApp.stop();
    
    }
    describe("'user:list'", function(){
      it("navigates to user list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminUserApp._API, "listUsers");
        

        Cecilia.trigger("admin:user:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));

    });

  });
});

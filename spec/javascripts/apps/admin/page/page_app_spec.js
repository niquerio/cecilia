describe("AdminPageApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.AdminPageApp, "Router");

    Cecilia.AdminPageApp.start();
    expect(Cecilia.AdminPageApp.Router).to.have.been.calledWithNew.once;

    Cecilia.AdminPageApp.stop();    
  }));

  describe("API", function(){
    describe("listPages",function(){
      it("executes AdminPageApp.List.Controller.listPages", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.AdminPageApp.List.Controller, "listPages");

        Cecilia.AdminPageApp._API.listPages();
        expect(Cecilia.AdminPageApp.List.Controller.listPages).to.have.been.called.once;

        Cecilia.AdminPageApp.List.Controller.listPages.restore();
        Cecilia.navigate.restore();
      });
    });
  });
  describe("routing", function(){
    var routing_setup = function(){
      Cecilia.AdminPageApp.start();
      Backbone.history.start();
    }
    var routing_cleanup = function(){
      Cecilia.AdminPageApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }
    it("executes the API's listPages", sinon.test(function(){
      this.stub(Cecilia.AdminPageApp._API, "listPages");
      routing_setup();

      Cecilia.navigate("admin/pages", {trigger:true});
      expect(Cecilia.AdminPageApp._API.listPages).to.have.been.called.once;

      routing_cleanup();
    }));
  });
  describe("triggers", function(){
    var trigger_setup = function(){
        Cecilia.AdminPageApp.start();
        sinon.stub(Cecilia, "navigate");
    }
    var trigger_cleanup = function(){
        Cecilia.navigate.restore();
        Cecilia.AdminPageApp.stop();
    
    }
    describe("'page:list'", function(){
      it("navigates to page list", sinon.test(function(){
        trigger_setup();
        this.stub(Cecilia.AdminPageApp._API, "listPages");
        

        Cecilia.trigger("admin:page:list");
        expect(Cecilia.navigate).to.have.been.called.once;

        trigger_cleanup();
      }));

    });

  });
});

describe("PageApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.PageApp, "Router");

    Cecilia.PageApp.start();
    expect(Cecilia.PageApp.Router).to.have.been.calledWithNew.once;

    Cecilia.PageApp.stop();    
  }));

  describe("API", function(){
    describe("showPage", function(){
      it("executes PageApp.Show.Controller.showPage", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.PageApp.Show.Controller, "showPage");

        Cecilia.PageApp._API.showPage('slug');
        expect(Cecilia.PageApp.Show.Controller.showPage).to.have.been.calledWith('slug').once;

        Cecilia.navigate.restore();
        Cecilia.PageApp.Show.Controller.showPage.restore();
      });
    });
    describe("showHome", function(){
      it("executes PageApp.Show.Controller.showPage with home slug", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.PageApp.Show.Controller, "showPage");

        Cecilia.PageApp._API.showHome();
        expect(Cecilia.PageApp.Show.Controller.showPage).to.have.been.calledWith('home').once;

        Cecilia.navigate.restore();
        Cecilia.PageApp.Show.Controller.showPage.restore();
      });
    });
  });

  describe("routing", function(){
    it("executes the API's showHome", function(){
      sinon.stub(Cecilia.PageApp._API, "showHome");
      Cecilia.PageApp.start();
      Backbone.history.start();

      Cecilia.navigate("", {trigger:true});
      expect(Cecilia.PageApp._API.showHome).to.have.been.called.once;

      Cecilia.PageApp.stop();
      Cecilia.PageApp._API.showHome.restore();
      Backbone.history.navigate("");
      Backbone.history.stop();
    });
    it("executes the API's showPage", function(){
      sinon.stub(Cecilia.PageApp._API, "showHome");
      sinon.stub(Cecilia.PageApp._API, "showPage");
      Cecilia.PageApp.start();
      Backbone.history.start();

      Cecilia.navigate("slug", {trigger:true});
      expect(Cecilia.PageApp._API.showPage).to.have.been.calledWith('slug').once;

      Cecilia.PageApp.stop();
      Cecilia.PageApp._API.showHome.restore();
      Cecilia.PageApp._API.showPage.restore();
      Backbone.history.navigate("");
      Backbone.history.stop();
    });
  });
  
  describe("triggers", function(){
    describe("'page:show'", function(){
      it("navigates to page's slug", sinon.test(function(){
        Cecilia.PageApp.start();
        this.stub(Cecilia, "navigate");
        this.stub(Cecilia.PageApp._API, "showPage");
        

        Cecilia.trigger("page:show", 'slug');
        expect(Cecilia.navigate).to.have.been.calledWith("slug").once;


        Cecilia.PageApp.stop();
      }));
      it("executes the API's showPage", function(){
        Cecilia.PageApp.start();
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.PageApp._API, "showPage");

        Cecilia.trigger("page:show", 'slug');
        expect(Cecilia.PageApp._API.showPage).to.have.been.called.once;
       
        Cecilia.PageApp.stop();
        Cecilia.navigate.restore(); 
        Cecilia.PageApp._API.showPage.restore(); 
      });
    });
  });


});

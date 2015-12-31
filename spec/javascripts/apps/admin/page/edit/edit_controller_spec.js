describe("AdminPageApp.Edit.Controller", function(){
  var self = this;
  var setup = function(){
    self.controller = Cecilia.AdminPageApp.Edit.Controller;
    self.loadingView = _.extend({}, Backbone.Events);
    self.view = _.extend({}, Backbone.Events);
    self.model = new Cecilia.Entities.AdminPage({id: 3, slug: 'slug'});
    self.request = sinon.stub(Cecilia, "request").withArgs("admin:page:entity", 3).returns(self.model);
    sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
    sinon.stub(Cecilia.AdminPageApp.Edit, "Page").returns(self.view);
    Cecilia._configureRegions();
    sinon.stub(Cecilia.regions.main, "show");
  };

  var cleanup = function(){
   delete self.loadingview;
   delete self.request;
   delete self.controller;
   delete self.view;
   Cecilia.request.restore();
   Cecilia.Common.Views.Loading.restore();
   Cecilia.AdminPageApp.Edit.Page.restore();
   Cecilia.regions.main.show.restore();
  };
  describe("editPage", function(){
    it("shows a loading view before loading a page", sinon.test(function(){
      setup();
      self.controller.editPage(3)
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("shows missing page view if requested page can't be found", function(){
      setup();
      self.request.withArgs('admin:page:entity',4).returns(); 
      var missingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Missing").returns(missingView)

      self.controller.editPage(4); 
      
      expect(Cecilia.regions.main.show).to.have.been.calledWith(missingView).once;
      Cecilia.Common.Views.Missing.restore();
      cleanup();
    });
    it("displays the edit page form in the main region", sinon.test( function(){
      setup();
      self.controller.editPage(3);
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
    }));  
  });

  describe("page updating", function(){
    it("triggers 'page:show' with the same id if saving the modification was successful", function(){
      setup();
      sinon.stub(Cecilia, "trigger")
      
      self.controller.editPage(3)
      self.view.trigger("page:updated");
      
      expect(Cecilia.trigger).to.have.been.calledWith("page:show",self.model.get('slug'));

      Cecilia.trigger.restore();
      cleanup();
    });
    it("triggers method 'form:data:invalid' if saving the modification was not successful, sends errors to console", function(){
      setup();
      sinon.stub(Cecilia, "trigger")
      sinon.stub(console, "log")
      var error = {body: 'body error'}
      
      self.controller.editPage(3)
      self.view.trigger("form:data:invalid", error);
      
      expect(console.log).to.have.been.calledWith("Page Update Error: " + error);

      
      console.log.restore();
      Cecilia.trigger.restore();
      cleanup();
    });
  });
});

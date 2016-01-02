describe("AdminActivityApp.Edit.Controller", function(){
  var self = this;
  var setup = function(){
    self.controller = Cecilia.AdminActivityApp.Edit.Controller;
    self.loadingView = _.extend({}, Backbone.Events);
    self.view = _.extend({}, Backbone.Events);
    self.model = new Cecilia.Entities.AdminActivity({id: 3});
    self.request = sinon.stub(Cecilia, "request").withArgs("admin:activity:entity", 3).returns(self.model);
    self.request.returns({});
    sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
    sinon.stub(Cecilia.AdminActivityApp.Edit, "ActivityPage").returns(self.view);
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
   Cecilia.AdminActivityApp.Edit.ActivityPage.restore();
   Cecilia.regions.main.show.restore();
  };
  describe("editActivity", function(){
    it("shows a loading view before loading a activity", sinon.test(function(){
      setup();
      self.controller.editActivity(3)
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("shows missing activity view if requested activity can't be found", function(){
      setup();
      self.request.withArgs('admin:activity:entity',4).returns(); 
      var missingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Missing").returns(missingView)

      self.controller.editActivity(4); 
      
      expect(Cecilia.regions.main.show).to.have.been.calledWith(missingView).once;
      Cecilia.Common.Views.Missing.restore();
      cleanup();
    });
    it("displays the edit activity form in the main region", sinon.test( function(){
      setup();
      self.controller.editActivity(3);
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
    }));  
  });

  describe("activity updating", function(){
    it("triggers 'admin:activity:show' if saving the modification was successful", function(){
      setup();
      sinon.stub(Cecilia, "trigger")
      
      self.controller.editActivity(3)
      self.view.trigger("activity:updated",self.model);
      
      expect(Cecilia.trigger).to.have.been.calledWith("activity:show",3);

      Cecilia.trigger.restore();
      cleanup();
    });
  });
});

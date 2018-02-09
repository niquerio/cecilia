describe("AdminUserApp.Edit.Controller", function(){
  var self = this;
  var setup = function(){
    self.controller = Cecilia.AdminUserApp.Edit.Controller;
    self.loadingView = _.extend({}, Backbone.Events);
    self.view = _.extend({}, Backbone.Events);
    self.model = new Cecilia.Entities.AdminUser({id: 3, username: 'Mundungus'});
    self.request = sinon.stub(Cecilia, "request").withArgs("admin:user:entity", 3).returns(self.model);
    self.request.returns({});
    sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
    sinon.stub(Cecilia.AdminUserApp.Edit, "UserPage").returns(self.view);
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
   Cecilia.AdminUserApp.Edit.UserPage.restore();
   Cecilia.regions.main.show.restore();
  };
  describe("editUser", function(){
    it("shows a loading view before loading a user", sinon.test(function(){
      setup();
      self.controller.editUser(3)
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("shows missing user view if requested user can't be found", function(){
      setup();
      self.request.withArgs('admin:user:entity',4).returns(); 
      var missingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Missing").returns(missingView)

      self.controller.editUser(4); 
      
      expect(Cecilia.regions.main.show).to.have.been.calledWith(missingView).once;
      Cecilia.Common.Views.Missing.restore();
      cleanup();
    });
    it("displays the edit user form in the main region", sinon.test( function(){
      setup();
      self.controller.editUser(3);
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
    }));  
  });

  describe("user updating", function(){
    it("triggers 'admin:user:show' if saving the modification was successful", function(){
      setup();
      sinon.stub(Cecilia, "trigger")
      self.controller.editUser(3)
      self.view.trigger("user:updated",self.model);
      
      expect(Cecilia.trigger).to.have.been.calledWith("teacher:show",self.model.get('username'));

      Cecilia.trigger.restore();
      cleanup();
    });
  });
});

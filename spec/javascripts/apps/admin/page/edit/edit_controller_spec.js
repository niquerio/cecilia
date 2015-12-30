describe("AdminPageApp.Edit.Controller", function(){
  it("shows a loading view before loading a page");
  it("shows missing page view if requested page can't be found");
  var self = this;
  var setup = function(){
    self.controller = Cecilia.AdminPageApp.Edit.Controller;
    self.view = _.extend({}, Backbone.Events);
    self.model = new Cecilia.Entities.AdminPage({id: 3, slug: 'slug'});
    sinon.stub(Cecilia, "request").withArgs("admin:page:entity", 3).returns(self.model);
    sinon.stub(Cecilia.AdminPageApp.Edit, "Page").returns(self.view);
    Cecilia._configureRegions();
    sinon.stub(Cecilia.regions.main, "show");
  };

  var cleanup = function(){
   delete self.controller;
   delete self.view;
   Cecilia.request.restore();
   Cecilia.AdminPageApp.Edit.Page.restore();
   Cecilia.regions.main.show.restore();
  };
  describe("editPage", function(){
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
    it("triggers method 'onFormDataInvalid' if saving the modification was not successful");
  });
});

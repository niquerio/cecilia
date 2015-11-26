describe("UserApp.listAllTeachers.Controller", function(){
  describe("listAllTeachers",function(){
    it("displays the complete teacher list in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.ListAllTeachers.Controller;
      this.stub(Cecilia, "request").withArgs("user:entities:teachers:all").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.ListAllTeachers, "Teachers").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listAllTeachers();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
});

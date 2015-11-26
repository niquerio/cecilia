describe("UserApp.listStaff.Controller", function(){
  describe("listStaff",function(){
    it("displays the staff list in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.ListStaff.Controller;
      this.stub(Cecilia, "request").withArgs("user:entities:staff").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.ListStaff, "Staff").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listStaff();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
});

describe("UserApp.listTeachers.Controller", function(){
  describe("listTeachers",function(){
    it("displays the teacher list in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.ListTeachers.Controller;
      this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.ListTeachers, "Teachers").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listTeachers();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
});

describe("UserApp.Show.Controller", function(){
  describe("showTeacher",function(){
    it("displays the teacher info in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.Show.Controller;
      this.stub(Cecilia, "request").withArgs("teacher:entity",'blah').returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.Show, "Teacher").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.showTeacher();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
    describe("events", function(){
      describe("childview:childview:activity:show", function(){
        xit("triggers 'activity:show' with proper id" ,sinon.test(function(){}));
      });
    });
  });
});

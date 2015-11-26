describe("ActivityApp.ShowSchedule.Controller", function(){
  describe("showActivitiesSchedule",function(){
    it("displays the activities schedule in the main region", sinon.test(function(){
      var controller = Cecilia.ActivityApp.ShowSchedule.Controller;
      this.stub(Cecilia, "request").withArgs("activity:entities:schedule").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.ActivityApp.ShowSchedule, "Activities").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.showActivitiesSchedule();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
    }));
  });
});

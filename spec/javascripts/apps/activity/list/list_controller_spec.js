describe("ActivityApp.List.Controller", function(){
  describe("listActivities",function(){
    it("displays the activity list in the main region", sinon.test(function(){
      var controller = Cecilia.ActivityApp.List.Controller;
      this.stub(Cecilia, "request").withArgs("activity:entities").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.ActivityApp.List, "Activities").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listActivities();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
});

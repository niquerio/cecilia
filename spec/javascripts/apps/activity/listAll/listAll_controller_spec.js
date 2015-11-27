describe("ActivityApp.List.Controller", function(){
  describe("listAllActivities",function(){
    it("displays the complete activity list in the main region", sinon.test(function(){
      var controller = Cecilia.ActivityApp.ListAll.Controller;
      this.stub(Cecilia, "request").withArgs("activity:entities:all").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.ActivityApp.ListAll, "Activities").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listAllActivities();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
});

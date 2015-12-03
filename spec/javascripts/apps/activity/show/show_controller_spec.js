describe("ActivityApp.Show.Controller", function(){
  describe("showActivity",function(){
    it("displays the activity in the main region", sinon.test(function(){
      var controller = Cecilia.ActivityApp.Show.Controller;
      this.stub(Cecilia, "request").withArgs("activity:entity", "2").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.ActivityApp.Show, "Activity").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.showActivity();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
  describe("events", function(){
    describe("childview:childview:teacher:show", function(){
      it("triggers 'teacher:show' with proper username", sinon.test(function(){
        Cecilia._configureRegions();
        var controller = Cecilia.ActivityApp.Show.Controller;
        this.stub(Cecilia.regions.main, "show");
        
        var model = new Cecilia.Entities.Teacher({username: 'blah'});
        this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
        var view = _.extend({}, Backbone.Events);
        this.stub(Cecilia.ActivityApp.Show, "Activity").returns(view);
        this.stub(Cecilia, "trigger");
        controller.showActivity('2');
        var args = {model: model};
        view.trigger("childview:teacher:show", args);
        expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
        
      }));
    });
  });
});

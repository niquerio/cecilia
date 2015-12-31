describe("ActivityApp.Show.Controller", function(){
  describe("showActivity",function(){
    it("displays loading view by default", sinon.test(function(){
      Cecilia._configureRegions();
      var controller = Cecilia.ActivityApp.Show.Controller;
      this.stub(Cecilia, "request")
      var view2 = _.extend({}, Backbone.Events);
      this.stub(Cecilia.Common.Views, "Missing").returns(view2);
      this.stub(Cecilia.regions.main, "show");

      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.Common.Views, "Loading").returns(view);
  
      controller.showActivity(2)
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }))
    it("displays missing view when no activity returned", sinon.test(function(){
      Cecilia._configureRegions();
      var controller = Cecilia.ActivityApp.Show.Controller;
      this.stub(Cecilia, "request").returns();
      var loadingView = _.extend({}, Backbone.Events);
      var missingView = _.extend({}, Backbone.Events);
      this.stub(Cecilia.Common.Views, "Loading").returns(loadingView);
      this.stub(Cecilia.Common.Views, "Missing").returns(missingView);
      this.stub(Cecilia.regions.main, "show");

  
      controller.showActivity(1609106219681)
      expect(Cecilia.regions.main.show).to.have.been.calledWith(missingView).once;
    }))
    it("displays the activity in the main region", sinon.test(function(){
      Cecilia._configureRegions();
      var controller = Cecilia.ActivityApp.Show.Controller;
      this.stub(Cecilia, "request").withArgs("activity:entity", 2).returns({id: 2});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.ActivityApp.Show, "Activity").returns(view);
      this.stub(Cecilia.regions.main, "show");

      controller.showActivity(2);
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
    describe("events", function(){
      describe("childview:childview:teacher:show", function(){
        it("triggers 'teacher:show' with proper username", sinon.test(function(){
          Cecilia._configureRegions();
          var controller = Cecilia.ActivityApp.Show.Controller;
          this.stub(Cecilia.regions.main, "show");
          var model = new Cecilia.Entities.Teacher({username: 'blah'});
          var request = this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
          request.withArgs('activity:entity', 2).returns({id:2});
          var view = _.extend({}, Backbone.Events);

          this.stub(Cecilia.ActivityApp.Show, "Activity").returns(view);
          this.stub(Cecilia, "trigger");
          controller.showActivity(2);
          var args = {model: model};
          view.trigger("childview:teacher:show", args);
          expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
          
        }));
      });
    });
  });
});

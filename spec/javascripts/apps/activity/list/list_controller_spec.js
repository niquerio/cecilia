describe("ActivityApp.List.Controller", function(){
  describe("listActivities",function(){
    var self = this;
    var setup = function(){
      self.controller = Cecilia.ActivityApp.List.Controller;

      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.ActivityApp.List, "Activities").returns(self.view);

      sinon.stub(Cecilia, "request").withArgs("activity:entities").returns({});

      self.loadingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);

      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
    };

    var cleanup = function(){
      delete self.controller;
      delete self.view;

      delete self.loadingView;
      Cecilia.Common.Views.Loading.restore();

      Cecilia.request.restore();
      Cecilia.ActivityApp.List.Activities.restore();
      Cecilia.regions.main.show.restore();
    };
    it("displays loading view in the main region", sinon.test(function(){
      setup();
      self.controller.listActivities();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("displays the activity list in the main region", sinon.test(function(){
      setup();
      self.controller.listActivities();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
      
    }));
    describe("events", function(){
      describe("childview:childview:teacher:show", function(){
        it("triggers 'teacher:show' with proper username", sinon.test(function(){
          setup(); 
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Teacher({username: 'blah'});

          self.controller.listActivities();
          self.view.trigger("childview:childview:teacher:show", undefined, {model:model});

          expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;

          cleanup();
        }));
      });
      describe("childview:activity:show", function(){
        it("triggers 'activity:show' with proper id" ,sinon.test(function(){
          setup(); 
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Activity({id: '3'});

          self.controller.listActivities();
          self.view.trigger("childview:activity:show", {model: model});

          expect(Cecilia.trigger).to.have.been.calledWith("activity:show", model.get('id')).once;

          cleanup();
        }));
      });
    });
  });
});

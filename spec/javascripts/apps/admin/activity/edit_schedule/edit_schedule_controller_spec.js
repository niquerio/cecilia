describe("AdminActivityApp.EditSchedule.Controller", function(){
  describe("editSchedule",function(){
    var self = this;

    var setup = function(){
      self.controller = Cecilia.AdminActivityApp.EditSchedule.Controller;
      self.view = new Marionette.LayoutView;
      self.request = sinon.stub(Cecilia, "request").withArgs("admin:activity:entities:scheduled").returns({});
      self.request.returns({});
      self.loadingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.AdminActivityApp.EditSchedule, "Layout").returns(self.view);
      sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
    };

    var cleanup = function(){
      Cecilia.regions.main.show.restore();
      Cecilia.AdminActivityApp.EditSchedule.Layout.restore();
      Cecilia.request.restore();
      Cecilia.Common.Views.Loading.restore();
      delete self.loadingView;
      delete self.request;
      delete self.view;
      delete self.controller;
    };
    it("shows a loading view before loading scheduler", sinon.test(function(){
      setup();
      self.controller.editSchedule()
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("displays the schedule layout in the main region", sinon.test(function(){
      setup();
      self.controller.editSchedule();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
      
    }));
    it("gets instantiated with sub-views (scheduled and unscheduled)", sinon.test(function(){
      setup();
      var scheduledView = new Marionette.Object(), unscheduledView = new Marionette.Object();
      this.stub(Cecilia.AdminActivityApp.EditSchedule, "Days").returns(scheduledView);
      this.stub(Cecilia.AdminActivityApp.EditSchedule, "UnscheduledClasses").returns(unscheduledView);

      self.controller.editSchedule();
      var layoutOptions = {
        scheduledView: scheduledView,
        unscheduledView: unscheduledView,
      }
      expect(Cecilia.AdminActivityApp.EditSchedule.Layout).to.have.been.calledWith(layoutOptions).once;
      cleanup();
        
    }));
  });
   
});

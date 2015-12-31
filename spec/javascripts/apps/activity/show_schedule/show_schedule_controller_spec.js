describe("ActivityApp.ShowSchedule.Controller", function(){
  describe("showActivitiesSchedule",function(){
    var self = this;
    var setup = function(){
      Cecilia._configureRegions();
      self.controller = Cecilia.ActivityApp.ShowSchedule.Controller;
      self.loadingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia, "request").withArgs("activity:entities:schedule").returns({});
      sinon.stub(Cecilia.ActivityApp.ShowSchedule, "Activities").returns(self.view);
      sinon.stub(Cecilia.regions.main, "show");
    }
    var cleanup = function(){
      delete self.controller;
      delete self.view;
      delete self.loadingView;
      Cecilia.Common.Views.Loading.restore();
      Cecilia.request.restore();
      Cecilia.ActivityApp.ShowSchedule.Activities.restore();
      Cecilia.regions.main.show.restore();
    }
    it("displays loading view in the main region", sinon.test(function(){
      setup();
      self.controller.showActivitiesSchedule();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("displays the activities schedule in the main region", sinon.test(function(){
      setup();

      self.controller.showActivitiesSchedule();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
    }));
    describe("events", function(){
      var events_setup = function(){
        Cecilia._configureRegions();
        self.controller = Cecilia.ActivityApp.ShowSchedule.Controller;
        self.activityView = new Marionette.ItemView();
        sinon.stub(Cecilia.regions.dialog, "show");
        sinon.stub(Cecilia, "trigger");

      }
      var events_cleanup = function(){
        Cecilia.regions.dialog.show.restore();
        Cecilia.trigger.restore();
        delete self.controller;
        delete self.activityView;
      }
      describe("childview:childview:childview:showClass", function(){
        var showClass_setup = function(){
          self.scheduleView = _.extend({}, Backbone.Events);
          sinon.stub(self.controller, "_configureModal");
          sinon.stub(Cecilia.ActivityApp.Show, "ActivityModal").returns(self.activityView);
        }
        var showClass_cleanup = function(){
          Cecilia.ActivityApp.ShowSchedule.Controller._configureModal.restore();
          Cecilia.ActivityApp.Show.ActivityModal.restore();
          delete self.scheduleView;
        }
        it("does not displays the activity in dialog region when model doesn't have a title", sinon.test(function(){
          events_setup();
          showClass_setup();

          self.controller._configureSchedule.call(self.scheduleView);
          var model = new Cecilia.Entities.Activity();
          self.scheduleView.trigger("childview:childview:childview:showClass", undefined, undefined, {model: model});

          expect(Cecilia.regions.dialog.show).not.to.have.been.calledWith(self.activityView).once;
          showClass_cleanup();
          events_cleanup();
        }));
        it("displays the activity in dialog region when model has a title", sinon.test(function(){
          events_setup();
          showClass_setup();
          var model = new Cecilia.Entities.Activity({title: 'Blah'});

          self.controller._configureSchedule.call(self.scheduleView);
          self.scheduleView.trigger("childview:childview:childview:showClass", undefined, undefined, {model: model});

          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.activityView).once;

          showClass_cleanup();
          events_cleanup();
        }));
        
        describe("events", function(){
          describe("childview:teacher:show", function(){
            it("triggers 'teacher:show' with proper username", sinon.test(function(){
              events_setup();
              this.stub(self.activityView.$el, "modal");
              var model = new Cecilia.Entities.Teacher({username: 'blah'});


              self.controller._configureModal.call(self.activityView);
              self.activityView.trigger("childview:teacher:show", {model: model});
              expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
              
              events_cleanup();
            }));
          });
          describe("activity:show", function(){
            it("triggers 'activity:show' with proper id", sinon.test(function(){ 
              events_setup();
              this.stub(self.activityView.$el, "modal");
              var model = new Cecilia.Entities.Activity({id: '3'});

              self.controller._configureModal.call(self.activityView);
              self.activityView.trigger("activity:show", {model: model});
              expect(Cecilia.trigger).to.have.been.calledWith("activity:show", model.get('id')).once;

              events_cleanup();
            }));
          });
        });
      });
    });
  });
});

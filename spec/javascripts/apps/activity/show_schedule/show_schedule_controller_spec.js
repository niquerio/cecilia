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
    describe("events", function(){
      describe("childview:childview:childview:showClass", function(){
        it("does not displays the activity in dialog region when model doesn't have a title", sinon.test(function(){
          Cecilia._configureRegions();
          this.stub(Cecilia.regions.dialog, "show");
          var controller = Cecilia.ActivityApp.ShowSchedule.Controller;
          var activityView = _.extend({}, Backbone.Events);
          this.stub(Cecilia.ActivityApp.Show, "ActivityModal").returns(activityView);
          var scheduleView = _.extend({}, Backbone.Events);
          this.stub(Cecilia, "trigger");
          this.stub(controller, "_configureModal");
          var model = new Cecilia.Entities.Activity();

          controller._configureSchedule.call(scheduleView);
          scheduleView.trigger("childview:childview:childview:showClass", undefined, undefined, {model: model});

          expect(Cecilia.regions.dialog.show).not.to.have.been.calledWith(activityView).once;
        }));
        it("displays the activity in dialog region when model has a title", sinon.test(function(){
          Cecilia._configureRegions();
          this.stub(Cecilia.regions.dialog, "show");
          var controller = Cecilia.ActivityApp.ShowSchedule.Controller;
          var activityView = _.extend({}, Backbone.Events);
          this.stub(Cecilia.ActivityApp.Show, "ActivityModal").returns(activityView);
          var scheduleView = _.extend({}, Backbone.Events);
          this.stub(Cecilia, "trigger");
          this.stub(controller, "_configureModal");
          var model = new Cecilia.Entities.Activity({title: 'Blah'});

          controller._configureSchedule.call(scheduleView);
          scheduleView.trigger("childview:childview:childview:showClass", undefined, undefined, {model: model});

          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(activityView).once;
        }));
        
        describe("events", function(){
          describe("childview:teacher:show", function(){
            it("triggers 'teacher:show' with proper username", sinon.test(function(){
              Cecilia._configureRegions();
              this.stub(Cecilia.regions.dialog, "show");
              var controller = Cecilia.ActivityApp.ShowSchedule.Controller;
              
              var model = new Cecilia.Entities.Teacher({username: 'blah'});
              var activityView = new Marionette.ItemView();
              this.stub(activityView.$el, "modal");
              this.stub(Cecilia, "trigger");
              
              controller._configureModal.call(activityView);
              activityView.trigger("childview:teacher:show", {model: model});
              expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
              
            }));
          });
          describe("activity:show", function(){
            xit("triggers 'activity:show' with proper id", sinon.test(function(){ }));
          });
        });
      });
    });
  });
});

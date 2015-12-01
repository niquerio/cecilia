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
  describe("events", function(){
    describe("childview:childview:teacher:show", function(){
      it("triggers 'teacher:show' with proper username", sinon.test(function(){
        Cecilia._configureRegions();
        var controller = Cecilia.ActivityApp.List.Controller;
        this.stub(Cecilia.regions.main, "show");
        
        var model = new Cecilia.Entities.Teacher({username: 'blah'});
        this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
        var view = new Cecilia.ActivityApp.List.Activities({
          collection: new Cecilia.Entities.ActivityCollection({
            teachers: new Cecilia.Entities.TeacherCollection(),  
          }),
        });
        this.stub(Cecilia.ActivityApp.List, "Activities").returns(view);
        this.stub(Cecilia, "trigger");
        controller.listActivities();
        var args = {model: model};
        view.trigger("childview:childview:teacher:show", undefined, args);
        expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
        
      }));
    });
  });
});

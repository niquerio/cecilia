describe("ActivityApp.ListAll.Controller", function(){
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
  describe("events", function(){
    describe("childview:childview:teacher:show", function(){
      it("triggers 'teacher:show' with proper username", sinon.test(function(){
        Cecilia._configureRegions();
        var controller = Cecilia.ActivityApp.ListAll.Controller;
        this.stub(Cecilia.regions.main, "show");
        
        var model = new Cecilia.Entities.Teacher({username: 'blah'});
        this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
        var view = new Cecilia.ActivityApp.ListAll.Activities({
          collection: new Cecilia.Entities.CompleteActivityCollection({
            teachers: new Cecilia.Entities.TeacherCollection(),  
          }),
        });
        this.stub(Cecilia.ActivityApp.ListAll, "Activities").returns(view);
        this.stub(Cecilia, "trigger");
        controller.listAllActivities();
        var args = {model: model};
        view.trigger("childview:childview:teacher:show", undefined, args);
        expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
        
      }));
    });
  });
});

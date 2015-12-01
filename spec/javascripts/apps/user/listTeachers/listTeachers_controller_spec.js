describe("UserApp.listTeachers.Controller", function(){
  describe("listTeachers",function(){
    it("displays the teacher list in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.ListTeachers.Controller;
      this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.ListTeachers, "Teachers").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listTeachers();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
  describe("events", function(){
    describe("childview:teacher:show", function(){
      it("triggers 'teacher:show' with proper username", sinon.test(function(){
        Cecilia._configureRegions();
        var controller = Cecilia.UserApp.ListTeachers.Controller;
        this.stub(Cecilia.regions.main, "show");
        
        var model = new Cecilia.Entities.Teacher({username: 'blah'});
        this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
        var view = new Cecilia.UserApp.ListTeachers.Teachers({
          collection: new Cecilia.Entities.TeacherCollection()
        });
        this.stub(Cecilia.UserApp.ListTeachers, "Teachers").returns(view);
        this.stub(Cecilia, "trigger");
        controller.listTeachers();
        var args = {model: model};
        view.trigger("childview:teacher:show", args);
        expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
        
      }));
    });
  });
});

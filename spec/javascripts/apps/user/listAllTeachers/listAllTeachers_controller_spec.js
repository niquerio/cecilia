describe("UserApp.listAllTeachers.Controller", function(){
  describe("listAllTeachers",function(){
    it("displays the complete teacher list in the main region", sinon.test(function(){
      var controller = Cecilia.UserApp.ListAllTeachers.Controller;
      this.stub(Cecilia, "request").withArgs("user:entities:teachers:all").returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.UserApp.ListAllTeachers, "Teachers").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.listAllTeachers();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;
      
    }));
  });
  describe("events", function(){
    describe("childview:teacher:show", function(){
      it("triggers 'teacher:show' with proper username", sinon.test(function(){
        Cecilia._configureRegions();
        var controller = Cecilia.UserApp.ListAllTeachers.Controller;
        this.stub(Cecilia.regions.main, "show");
        
        var model = new Cecilia.Entities.Teacher({username: 'blah'});
        this.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
        var view = new Cecilia.UserApp.ListAllTeachers.Teachers({
          collection: new Cecilia.Entities.TeacherCollection()
        });
        this.stub(Cecilia.UserApp.ListAllTeachers, "Teachers").returns(view);
        this.stub(Cecilia, "trigger");
        controller.listAllTeachers();
        var args = {model: model};
        view.trigger("childview:teacher:show", args);
        expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;
        
      }));
    });
  });
});

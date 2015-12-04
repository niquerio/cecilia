describe("UserApp.listTeachers.Controller", function(){
  describe("listTeachers",function(){
    var self = this;
    var setup = function(){
      Cecilia._configureRegions();
      self.controller = Cecilia.UserApp.ListTeachers.Controller;
      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia, "request").withArgs("user:entities:teachers").returns({});
      sinon.stub(Cecilia.UserApp.ListTeachers, "Teachers").returns(self.view);
      sinon.stub(Cecilia.regions.main, "show");
    };
    var cleanup = function(){
      delete self.controller
      delete self.view
      Cecilia.request.restore();
      Cecilia.UserApp.ListTeachers.Teachers.restore();
      Cecilia.regions.main.show.restore();
    };
    it("displays the teacher list in the main region", sinon.test(function(){
      setup();

      self.controller.listTeachers();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup(); 
    }));
    describe("events", function(){
      describe("childview:teacher:show", function(){
        it("triggers 'teacher:show' with proper username", sinon.test(function(){
          setup();
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Teacher({username: 'blah'});

          self.controller.listTeachers();
          self.view.trigger("childview:teacher:show", {model:model});
          expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;

          cleanup(); 
        }));
      });
      describe("childview:childview:activity:show", function(){
        it("triggers 'activity:show' with proper id" ,sinon.test(function(){
          setup();
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Activity({id: '3'});

          self.controller.listTeachers();
          self.view.trigger("childview:childview:activity:show", undefined, {model:model});
          expect(Cecilia.trigger).to.have.been.calledWith("activity:show", model.get('id')).once;
          cleanup();
        }));
      });
    });
  });
});

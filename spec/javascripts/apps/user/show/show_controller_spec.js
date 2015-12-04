describe("UserApp.Show.Controller", function(){
  describe("showTeacher",function(){
    var self = this;
    var setup = function(){
      Cecilia._configureRegions();
      self.controller = Cecilia.UserApp.Show.Controller;
      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia, "request").withArgs("teacher:entity",'blah').returns({});
      sinon.stub(Cecilia.UserApp.Show, "Teacher").returns(self.view);
      sinon.stub(Cecilia.regions.main, "show");
    };
    var cleanup = function(){
      delete self.controller;
      delete self.view;
      Cecilia.request.restore();
      Cecilia.UserApp.Show.Teacher.restore();
      Cecilia.regions.main.show.restore();
    };
    it("displays the teacher info in the main region", sinon.test(function(){
      setup();

      self.controller.showTeacher();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;
      
      cleanup();
    }));
    describe("events", function(){
      describe("childview:activity:show", function(){
        it("triggers 'activity:show' with proper id" ,sinon.test(function(){
          setup();
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Activity({id: '3'});

          self.controller.showTeacher();
          self.view.trigger("childview:activity:show", {model: model});
          expect(Cecilia.trigger).to.have.been.calledWith("activity:show", model.get('id')).once;
          cleanup();
        }));
      });
    });
  });
});

describe("UserApp.Show.Controller", function(){
  describe("showTeacher",function(){
    var self = this;
    var setup = function(){
      Cecilia._configureRegions();
      self.controller = Cecilia.UserApp.Show.Controller;
      self.view = _.extend({}, Backbone.Events);
      self.request = sinon.stub(Cecilia, "request").withArgs("teacher:entity",'blah').returns({});
      sinon.stub(Cecilia.UserApp.Show, "Teacher").returns(self.view);
      self.loadingView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.Common.Views, "Loading").returns(self.loadingView);
      sinon.stub(Cecilia.regions.main, "show");
    };
    var cleanup = function(){
      delete self.controller;
      delete self.view;
      delete self.loadingView;
      delete self.request;
      Cecilia.Common.Views.Loading.restore();
      Cecilia.request.restore();
      Cecilia.UserApp.Show.Teacher.restore();
      Cecilia.regions.main.show.restore();
    };
    it("displays loading view in the main region", sinon.test(function(){
      setup();
      self.controller.showTeacher('blah');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.loadingView).once;
      cleanup();
    }));
    it("displays missing view in main region when no teacher is returned", sinon.test(function(){
      setup();
      var missingView = _.extend({}, Backbone.Events);
      this.stub(Cecilia.Common.Views, "Missing").returns(missingView);
      self.request.withArgs('notateacher').returns();
      
      self.controller.showTeacher('notateacher');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(missingView).once;
      cleanup();
    }));
    it("displays the teacher info in the main region", sinon.test(function(){
      setup();

      self.controller.showTeacher('blah');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;
      
      cleanup();
    }));
    describe("events", function(){
      describe("childview:activity:show", function(){
        it("triggers 'activity:show' with proper id" ,sinon.test(function(){
          setup();
          this.stub(Cecilia, "trigger");
          var model = new Cecilia.Entities.Activity({id: '3'});

          self.controller.showTeacher('blah');
          self.view.trigger("childview:activity:show", {model: model});
          expect(Cecilia.trigger).to.have.been.calledWith("activity:show", model.get('id')).once;
          cleanup();
        }));
      });
    });
  });
});

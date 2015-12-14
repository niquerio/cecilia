describe("AdminAdminClassroomApp.List.Controller", function(){
  describe("listClassrooms",function(){
    var self = this;
    var setup = function(){
      self.controller = Cecilia.AdminClassroomApp.List.Controller;
      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia, "request").withArgs("classroom:entities").returns({});
      sinon.stub(Cecilia.AdminClassroomApp.List, "Classrooms").returns(self.view);
      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
    };

    var cleanup = function(){
     delete self.controller;
     delete self.view;
     Cecilia.request.restore();
     Cecilia.AdminClassroomApp.List.Classrooms.restore();
     Cecilia.regions.main.show.restore();
    };

    it("displays the classroom list in the main region", sinon.test(function(){
      setup();
      self.controller.listClassrooms();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
      
    }));
    describe("events", function(){
      //describe("childview:childview:teacher:show", function(){
      //  it("triggers 'teacher:show' with proper username", sinon.test(function(){
      //    setup(); 
      //    this.stub(Cecilia, "trigger");
      //    var model = new Cecilia.Entities.Teacher({username: 'blah'});

      //    self.controller.listClassrooms();
      //    self.view.trigger("childview:childview:teacher:show", undefined, {model:model});

      //    expect(Cecilia.trigger).to.have.been.calledWith("teacher:show", model.get('username')).once;

      //    cleanup();
      //  }));
      //});
    });
  });
});

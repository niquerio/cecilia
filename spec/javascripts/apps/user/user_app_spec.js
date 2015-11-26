describe("UserApp", function(){
  it("instantiates a router when started", sinon.test(function(){
    this.stub(Cecilia.UserApp, "Router");

    Cecilia.UserApp.start();
    expect(Cecilia.UserApp.Router).to.have.been.calledWithNew.once;

    Cecilia.UserApp.stop();    
  }));

  describe("API", function(){
    describe("listTeachers",function(){
      it("executes UserApp.ListTeachers.Controller.listTeachers", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp.ListTeachers.Controller, "listTeachers");

        Cecilia.UserApp._API.listTeachers();
        expect(Cecilia.UserApp.ListTeachers.Controller.listTeachers).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.UserApp.ListTeachers.Controller.listTeachers.restore();
      });
    });
    describe("listStaff",function(){
      it("executes UserApp.ListStaff.Controller.listStaff", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp.ListStaff.Controller, "listStaff");

        Cecilia.UserApp._API.listStaff();
        expect(Cecilia.UserApp.ListStaff.Controller.listStaff).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.UserApp.ListStaff.Controller.listStaff.restore();
      });
    });
    describe("listAllTeachers",function(){
      it("executes UserApp.ListAllTeachers.Controller.listAllTeachers", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp.ListAllTeachers.Controller, "listAllTeachers");

        Cecilia.UserApp._API.listAllTeachers();
        expect(Cecilia.UserApp.ListAllTeachers.Controller.listAllTeachers).to.have.been.called.once;

        Cecilia.navigate.restore();
        Cecilia.UserApp.ListAllTeachers.Controller.listAllTeachers.restore();
      });
    });
  });

  describe("routing", function(){
    it("executes the API's listTeachers", sinon.test(function(){
      this.stub(Cecilia.UserApp._API, "listTeachers");
      Cecilia.UserApp.start();
      Backbone.history.start();

      Cecilia.navigate("teachers", {trigger:true});
      expect(Cecilia.UserApp._API.listTeachers).to.have.been.called.once;

      Cecilia.UserApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
    it("executes the API's listStaff", sinon.test(function(){
      this.stub(Cecilia.UserApp._API, "listStaff");
      Cecilia.UserApp.start();
      Backbone.history.start();

      Cecilia.navigate("staff", {trigger:true});
      expect(Cecilia.UserApp._API.listStaff).to.have.been.called.once;

      Cecilia.UserApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
    it("executes the API's listAllTeachers", sinon.test(function(){
      this.stub(Cecilia.UserApp._API, "listAllTeachers");
      Cecilia.UserApp.start();
      Backbone.history.start();

      Cecilia.navigate("all_teachers", {trigger:true});
      expect(Cecilia.UserApp._API.listAllTeachers).to.have.been.called.once;

      Cecilia.UserApp.stop();
      Backbone.history.navigate("");
      Backbone.history.stop();
    }));
  });
  describe("triggers", function(){
    describe("'user:teachers:list'", function(){
      it("navigates to teacher list", sinon.test(function(){
        Cecilia.UserApp.start();
        this.stub(Cecilia, "navigate");
        this.stub(Cecilia.UserApp._API, "listTeachers");
        

        Cecilia.trigger("user:teachers:list");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.UserApp.stop();
      }));
      it("executes the API's listTeachers", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp._API, "listTeachers");
        Cecilia.UserApp.start();
      
        Cecilia.trigger("user:teachers:list");
        expect(Cecilia.UserApp._API.listTeachers).to.have.been.called.once;

        Cecilia.UserApp.stop();
        Cecilia.navigate.restore();
        Cecilia.UserApp._API.listTeachers.restore();
      });

    });
    describe("'user:teachers:list:all'", function(){
      it("navigates to complete teacher list", sinon.test(function(){
        Cecilia.UserApp.start();
        this.stub(Cecilia, "navigate");
        this.stub(Cecilia.UserApp._API, "listAllTeachers");
        

        Cecilia.trigger("user:teachers:list:all");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.UserApp.stop();
      }));
      it("executes the API's listAllTeachers", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp._API, "listAllTeachers");
        Cecilia.UserApp.start();
      
        Cecilia.trigger("user:teachers:list:all");
        expect(Cecilia.UserApp._API.listAllTeachers).to.have.been.called.once;

        Cecilia.UserApp.stop();
        Cecilia.navigate.restore();
        Cecilia.UserApp._API.listAllTeachers.restore();
      });

    });
    describe("'user:staff:list'", function(){
      it("navigates to staff list", function(){
        Cecilia.UserApp.start();
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp._API, "listStaff");
        

        Cecilia.trigger("user:staff:list");
        expect(Cecilia.navigate).to.have.been.called.once;


        Cecilia.UserApp.stop();
        Cecilia.navigate.restore();
        Cecilia.UserApp._API.listStaff.restore();
      });
      it("executes the API's listStaff", function(){
        sinon.stub(Cecilia, "navigate");
        sinon.stub(Cecilia.UserApp._API, "listStaff");
        Cecilia.UserApp.start();
      
        Cecilia.trigger("user:staff:list");
        expect(Cecilia.UserApp._API.listStaff).to.have.been.called.once;

        Cecilia.UserApp.stop();
        Cecilia.navigate.restore();
        Cecilia.UserApp._API.listStaff.restore();
      });

    });
  });
});

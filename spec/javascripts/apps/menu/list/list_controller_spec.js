describe("MenuApp.List.Controller", function(){
  describe("listMenu", function(){
    it("displays the menu in the header region", function(){
      Cecilia._configureRegions();
      var controller = Cecilia.MenuApp.List.Controller;
      sinon.stub(Cecilia.regions.header, "show");
      var menuView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.MenuApp.List, "Menu").returns(menuView);

      controller.listMenu();
      expect(Cecilia.regions.header.show).to.have.been.calledWith(menuView).once;

      Cecilia.MenuApp.List.Menu.restore();
      Cecilia.regions.header.show.restore();
    });
    describe("triggers", function(){
      it("triggers page:show by default when view triggers 'childview:navigate'", function(){

        Cecilia._configureRegions();
        var controller = Cecilia.MenuApp.List.Controller;
        var menuView = _.extend({}, Backbone.Events);
        sinon.stub(Cecilia.regions.header, "show");
        sinon.stub(Cecilia.MenuApp.List, "Menu").returns(menuView);
        sinon.stub(Cecilia, "trigger");
        var menuItem = {model: new Backbone.Model({url: 'blah'})};

        controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        menuView.trigger("childview:navigate", menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('page:show');

        Cecilia.trigger.restore();
        Cecilia.MenuApp.List.Menu.restore();
        Cecilia.regions.header.show.restore();        
      });
      it("triggers non-pages before pages when view triggers 'childview:navigate'", function(){
        Cecilia._configureRegions();
        var controller = Cecilia.MenuApp.List.Controller;
        var menuView = _.extend({}, Backbone.Events);
        sinon.stub(Cecilia.regions.header, "show");
        sinon.stub(Cecilia.MenuApp.List, "Menu").returns(menuView);
        sinon.stub(Cecilia, "trigger");
        var menuItem = {model: new Backbone.Model({url: 'classes'})};

        controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        menuView.trigger("childview:navigate", menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('activity:list');

        Cecilia.trigger.restore();
        Cecilia.MenuApp.List.Menu.restore();
        Cecilia.regions.header.show.restore();        
      });
      it("triggers page:show by default when view triggers 'childview:childview:navigate'", function(){
        Cecilia._configureRegions();
        var controller = Cecilia.MenuApp.List.Controller;
        var menuView = _.extend({}, Backbone.Events);
        sinon.stub(Cecilia.regions.header, "show");
        sinon.stub(Cecilia.MenuApp.List, "Menu").returns(menuView);
        sinon.stub(Cecilia, "trigger");
        var menuItem = {model: new Backbone.Model({url: 'blah'})};

        controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        menuView.trigger("childview:childview:navigate", undefined, menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('page:show');

        Cecilia.trigger.restore();
        Cecilia.MenuApp.List.Menu.restore();
        Cecilia.regions.header.show.restore();        
      });
    });
  });
});

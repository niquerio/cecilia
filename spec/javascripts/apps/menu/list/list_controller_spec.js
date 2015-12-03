describe("MenuApp.List.Controller", function(){
  describe("listMenu", function(){
    var self = this;
    var setup = function(){
      Cecilia._configureRegions();
      self.controller = Cecilia.MenuApp.List.Controller;
      sinon.stub(Cecilia.regions.header, "show");
      sinon.stub(Cecilia.regions.mobile, "show");
      self.menuView = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.MenuApp.List, "Menu").returns(self.menuView);
      sinon.stub(Cecilia.MenuApp.List, "MobileNav").returns(self.menuView);
    }
    var cleanup = function(){
      delete self.controller;
      delete self.menuView;
      Cecilia.MenuApp.List.Menu.restore();
      Cecilia.MenuApp.List.MobileNav.restore();
      Cecilia.regions.header.show.restore();
    }
    it("displays the menu in the header region", function(){

      setup();
      self.controller.listMenu();
      expect(Cecilia.regions.header.show).to.have.been.calledWith(self.menuView).once;
      cleanup();

    });
    describe("triggers", function(){
      var setup_triggers = function(){
        sinon.stub(Cecilia, "trigger");
      }
      var cleanup_triggers = function(){
        Cecilia.trigger.restore();
      }
      it("triggers page:show by default when view triggers 'childview:navigate'", function(){

        setup();
        setup_triggers();
        var menuItem = {model: new Backbone.Model({url: 'blah'})};

        self.controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        self.menuView.trigger("childview:navigate", menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('page:show');

        cleanup_triggers();
        cleanup();
      });
      it("triggers non-pages before pages when view triggers 'childview:navigate'", function(){
        setup();
        setup_triggers();
        var menuItem = {model: new Backbone.Model({url: 'classes'})};

        self.controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        self.menuView.trigger("childview:navigate", menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('activity:list');

        cleanup_triggers();
        cleanup();
      });
      it("triggers page:show by default when view triggers 'childview:childview:navigate'", function(){
        setup();
        setup_triggers();
        var menuItem = {model: new Backbone.Model({url: 'blah'})};

        self.controller.listMenu();
        expect(Cecilia.trigger).to.not.have.been.called;
        self.menuView.trigger("childview:childview:navigate", undefined, menuItem);
        expect(Cecilia.trigger).to.have.been.calledWith('page:show');

        cleanup_triggers();
        cleanup();
      });
    });
  });
});

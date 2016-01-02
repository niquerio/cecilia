describe("AdminPageApp.List.Controller", function(){
  describe("listPages",function(){
    var self = this;
    var setup = function(){
      self.controller = Cecilia.AdminPageApp.List.Controller;
      self.view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia, "request").withArgs("page:entities").returns({});
      sinon.stub(Cecilia.AdminPageApp.List, "Pages").returns(self.view);
      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
    };

    var cleanup = function(){
     delete self.controller;
     delete self.view;
     Cecilia.request.restore();
     Cecilia.AdminPageApp.List.Pages.restore();
     Cecilia.regions.main.show.restore();
    };

    it("displays the page list in the main region", sinon.test(function(){
      setup();
      self.controller.listPages();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
      
    }));
    describe("events", function(){
      describe("childview:classroom:show", function(){

        it("triggers 'page:show' with proper slug", function(){
          setup();
          sinon.stub(Cecilia, "trigger")
          var showModel = new Cecilia.Entities.Page({slug: 'blah'});
          self.controller.listPages();
          self.view.trigger("childview:page:show", null, {model: showModel});
          expect(Cecilia.trigger).to.have.been.calledWith("page:show", showModel.get('slug')).conce;
          Cecilia.trigger.restore();
          cleanup();
        });
      });
      describe("childview:classrom:edit", function(){
        it("triggers admin:page:edit with proper id", function(){
          setup();
          sinon.stub(Cecilia, "trigger")
          var editModel = new Cecilia.Entities.AdminPage({id: 3});

          self.controller.listPages();
          self.view.trigger("childview:page:edit", null, {model: editModel});
          expect(Cecilia.trigger).to.have.been.calledWith("admin:page:edit", editModel.get('id')).once; 

          Cecilia.trigger.restore();
          cleanup();
        });
      });
    });
  });
});

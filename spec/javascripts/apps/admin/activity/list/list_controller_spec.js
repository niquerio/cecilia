describe("AdminActivityApp.List.Controller", function(){
  describe("listActivities",function(){
    var self = this;
    var setup = function(){
      self.controller = Cecilia.AdminActivityApp.List.Controller;
      self.view = _.extend({}, Backbone.Events);
      self.request = sinon.stub(Cecilia, "request").withArgs("admin:activity:entities").returns({});
      sinon.stub(Cecilia.AdminActivityApp.List, "Activities").returns(self.view);
      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
    };

    var cleanup = function(){
     delete self.controller;
     delete self.view;
     Cecilia.request.restore();
     Cecilia.AdminActivityApp.List.Activities.restore();
     Cecilia.regions.main.show.restore();
     delete self.request;
    };
    it("displays the activities list in the main region", function(){
      setup();
      self.controller.listActivities();
      expect(Cecilia.regions.main.show).to.have.been.calledWith(self.view).once;

      cleanup();
    });
    describe("events",function(){
      describe("activity:new", function(){
        var activity_new_setup = function(){
          self.newModel = {save: sinon.stub() }; 
          self.newView = _.extend({model: self.newModel}, Backbone.Events);
          sinon.stub(Cecilia.AdminActivityApp.List, "NewModal").returns(self.newView);
          sinon.stub(Cecilia.regions.dialog, "show");
        }
        var activity_new_cleanup = function(){
          Cecilia.AdminActivityApp.List.NewModal.restore();
          Cecilia.regions.dialog.show.restore();
          delete self.newModel
          delete self.newView
        }
        it("displays a new activity view in the dialog region", function(){
          setup();
          activity_new_setup();
          self.controller.listActivities();
          self.view.trigger("activity:new");
          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.newView).once; 
          activity_new_cleanup();
          cleanup();
        });
        describe("successful save of new activity", function(){
          it("adds the new activity to the activity collection", sinon.test(function(){
            Cecilia._configureRegions();
            var controller = Cecilia.AdminActivityApp.List.Controller;
            var view = _.extend({}, Backbone.Events);
            this.stub(Cecilia.AdminActivityApp.List, "Activities").returns(view);
            this.stub(Cecilia.regions.main, "show");
            activity_new_setup();
            
            var collection = new Backbone.Collection();
            this.stub(collection, "add");
            this.stub(Cecilia, "request").withArgs("admin:activity:entities").returns(collection);

            controller.listActivities();
            view.trigger("activity:new");
            self.newView.trigger("activity:created", self.newModel);
            expect(collection.add).to.have.been.calledWith(self.newModel).once; 

            activity_new_cleanup();
          }));
        });
      });
      describe("childview:activity:edit", function(){
        var activity_edit_setup = function(){
          self.editModel = _.extend({save: sinon.stub(), initialize: sinon.stub() },Backbone.Events); 
          self.editView = _.extend({model: self.editModel}, Backbone.Events);
          sinon.stub(Cecilia.AdminActivityApp.List, "EditModal").returns(self.editView);
          sinon.stub(Cecilia.regions.dialog, "show");
          self.request.withArgs("user:entities").returns({});
          self.request.withArgs("difficulty:entities").returns({});
          self.request.withArgs("activity_type:entities").returns({});
          self.request.withArgs("activity_subtype:entities").returns({});
        }
        var activity_edit_cleanup = function(){
          //Cecilia.request restored in setup
          Cecilia.AdminActivityApp.List.EditModal.restore();
          Cecilia.regions.dialog.show.restore();
          delete self.editModel
          delete self.editView
        }
        it("is displayed in the dialog region", function(){
          setup();
          activity_edit_setup();

          self.controller.listActivities();
          self.view.trigger("childview:activity:edit", null, {model: self.editModel});
          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.editView).once; 

          activity_edit_cleanup();
          cleanup();
        });
        describe("successful save of updated activity", function(){
          it("rerenders the childview", sinon.test(function(){
            setup();
            activity_edit_setup();
            var childView = { render: sinon.stub() };
            

            self.controller.listActivities();
            self.view.trigger("childview:activity:edit", null, {model: self.editModel, view: childView});
            self.editView.trigger("activity:updated");
            expect(childView.render).to.have.been.called.once;

            activity_edit_cleanup();
            cleanup();
          }));
        });
      });
      describe("childview:activity:delete", function(){
        var activity_delete_setup = function(){
          self.model = new Backbone.Model;
          self.confirmView = _.extend({},Backbone.Events);
          sinon.stub(Cecilia.AdminActivityApp.List, "ConfirmModal").returns(self.confirmView);
          sinon.stub(Cecilia.regions.dialog, "show");
        }
        var activity_delete_cleanup = function(){
          Cecilia.AdminActivityApp.List.ConfirmModal.restore();
          Cecilia.regions.dialog.show.restore();
          delete self.confirmView
          delete self.model;
        }
        it("shows 'do you really mean to delete this' in dialog region", function(){
          setup();
          activity_delete_setup();

          self.controller.listActivities();
          self.view.trigger("childview:activity:delete", null, {model: self.model});
          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.confirmView).once; 

          activity_delete_cleanup();
          cleanup();
        });
        describe("confirmation for delete", function(){
          it("removes activity from activity collections", sinon.test(function(){
            setup();
            activity_delete_setup();
            this.stub(self.model, "destroy")


            self.controller.listActivities();
            self.view.trigger("childview:activity:delete", null,{model: self.model});
            self.confirmView.trigger("confirm:delete")
            expect(self.model.destroy).to.have.been.calledWith().once; 

            activity_delete_cleanup();
            cleanup();
          }));
        });
      });
    });
  });
});

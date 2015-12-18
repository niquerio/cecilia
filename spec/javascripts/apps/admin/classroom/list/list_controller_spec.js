describe("AdminClassroomApp.List.Controller", function(){
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
      describe("classroom:new", function(){
        var classroom_new_setup = function(){
          self.newModel = {save: sinon.stub() }; 
          self.newView = _.extend({model: self.newModel}, Backbone.Events);
          sinon.stub(Cecilia.AdminClassroomApp.List, "NewModal").returns(self.newView);
          sinon.stub(Cecilia.regions.dialog, "show");
        }
        var classroom_new_cleanup = function(){
          Cecilia.AdminClassroomApp.List.NewModal.restore();
          Cecilia.regions.dialog.show.restore();
          delete self.newModel
          delete self.newView
        }
        it("displays a new classroom view in the dialog region", function(){
          setup();
          classroom_new_setup();
          self.controller.listClassrooms();
          self.view.trigger("classroom:new");
          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.newView).once; 
          classroom_new_cleanup();
          cleanup();
        });
        describe("successful save of new classroom", function(){
          it("adds the new classroom to the classroom collection", sinon.test(function(){
            Cecilia._configureRegions();
            var controller = Cecilia.AdminClassroomApp.List.Controller;
            var view = _.extend({}, Backbone.Events);
            this.stub(Cecilia.AdminClassroomApp.List, "Classrooms").returns(view);
            this.stub(Cecilia.regions.main, "show");
            classroom_new_setup();
            
            var collection = new Backbone.Collection();
            this.stub(collection, "add");
            this.stub(Cecilia, "request").withArgs("classroom:entities").returns(collection);

            controller.listClassrooms();
            view.trigger("classroom:new");
            self.newView.trigger("classroom:created", self.newModel);
            expect(collection.add).to.have.been.calledWith(self.newModel).once; 

            classroom_new_cleanup();
          }));
        });
      });

      describe("childview:classrom:edit", function(){
        var classroom_edit_setup = function(){
          self.editModel = {save: sinon.stub() }; 
          self.editView = _.extend({model: self.editModel}, Backbone.Events);
          sinon.stub(Cecilia.AdminClassroomApp.List, "EditModal").returns(self.editView);
          sinon.stub(Cecilia.regions.dialog, "show");
        }
        var classroom_edit_cleanup = function(){
          Cecilia.AdminClassroomApp.List.EditModal.restore();
          Cecilia.regions.dialog.show.restore();
          delete self.editModel
          delete self.editView
        }
        it("is displayed in the dialog region", function(){
          setup();
          classroom_edit_setup();

          self.controller.listClassrooms();
          self.view.trigger("childview:classroom:edit", null, {model: self.editModel});
          expect(Cecilia.regions.dialog.show).to.have.been.calledWith(self.editView).once; 

          classroom_edit_cleanup();
          cleanup();
        });
        describe("successful save of updated classroom", function(){
          it("rerenders the childview", function(){
            setup();
            classroom_edit_setup();
            var childView = { render: sinon.stub() };
            

            self.controller.listClassrooms();
            self.view.trigger("childview:classroom:edit", null, {model: self.editModel, view: childView});
            self.editView.trigger("classroom:updated");
            expect(childView.render).to.have.been.called.once;

            classroom_edit_cleanup();
            cleanup();
            
          });
        });
     });
    });
  });
});

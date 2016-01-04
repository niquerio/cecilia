describe("AdminActivityApp.Common.Views.Form", function(){
  it("triggers 'form:submit' with the form data when the submit button is clicked", function(done){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var modelData = {
        'title': 'Activity Title',
        'description': 'Activity Description',
        'activity_type_id': null,
        'difficulty_id': null,
        'activity_subtype_id': null,
        'duration': '60',
        'users': null
      }
      var view = new Cecilia.AdminActivityApp.Common.Views.Form({
        el: '#fixture',
        model: new Cecilia.Entities.Activity(modelData), 
        templateHelpers: function(){
          return {
            'modal_title': '',
            'difficulties': new Backbone.Collection(),
            'activity_types': new Backbone.Collection(),
            'activity_subtypes': new Backbone.Collection(),
            'users': new Backbone.Collection(),
          }
        }
      });

      var submitSpy = sinon.spy();
      view.on("form:submit", submitSpy);
      view.once("attach", function(){
        expect(submitSpy.called).to.be.false;
        modelData.title = "New Activity Title";

        $("#activity-title").val(modelData.title);
        view.ui.submitButton.click();
        expect(submitSpy.calledOnce).to.be.true;
        expect(submitSpy.firstCall.args[0]).to.deep.equal(modelData);
        done();
      });

      view.render();
      view.onAttach();
      view.trigger('attach');
  });
  describe("error display",function(){
    var self = this;
    var error_setup = function(){
      self.fixture = fixture.set("<div id='fixture'></div>")
      self.view = new Cecilia.AdminActivityApp.Common.Views.Form({
        el: '#fixture',
        model: new Cecilia.Entities.Activity({duration: null}), 
        templateHelpers: function(){
          return {
            'modal_title': '',
            'difficulties': new Backbone.Collection(),
            'activity_types': new Backbone.Collection(),
            'activity_subtypes': new Backbone.Collection(),
            'users': new Backbone.Collection(),
          }
        }
      });
      self.getErrorText = function(attribute){ 
        return  self.view.$el.find("#activity-" + attribute).parent().find(".error").text(); 
      }
    };
    var error_cleanup = function(){
      self.fixture = null
      self.view = null
      self.getErrorText = null;
    };
    it("displays form errors on 'form:data:invalid' event", function(done){ 
      error_setup();
      self.view.once("render", function(){
        expect(self.getErrorText("title")).to.equal('');
        this.triggerMethod("form:data:invalid", {
          title: "title error message",
          users: "users error message"
        });

        expect(self.getErrorText("title")).to.equal("title error message");
        expect(self.getErrorText("users")).to.equal("users error message");
        done();
      }); 
      self.view.render();
      error_cleanup();
    });
    it("clears the displayed errors before displaying new error messages", function(done){
      error_setup();
      self.view.once("render", function(){
        this.triggerMethod("form:data:invalid", {
          title: "title error message",
          users: "users error message"
        });

        expect(self.getErrorText("title")).to.equal("title error message");
        expect(self.getErrorText("users")).to.equal("users error message");

        this.triggerMethod("form:data:invalid", {
          title: "new title error message",
        });
        expect(self.getErrorText("title")).to.equal("new title error message");
        expect(self.getErrorText("users")).to.equal("");
        done();
      }); 
      self.view.render();
      error_cleanup();
    });
  });
});

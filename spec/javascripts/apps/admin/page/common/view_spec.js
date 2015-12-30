describe("AdminPage.Common.Views.Form", function(){
  it("triggers 'form:submit' with the form data when the submit button is clicked", function(done){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var modelData = {
        'body': 'Page Body',
      }
      var view = new Cecilia.AdminPageApp.Common.Views.Form({
        el: '#fixture',
        model: new Cecilia.Entities.AdminPage(modelData), 
        templateHelpers:  function(){
          return {title: 'Page Title'}
        },
      });

      var submitSpy = sinon.spy();
      view.on("form:submit", submitSpy);
      view.once("render", function(){
        expect(submitSpy.called).to.be.false;
        modelData.body = "New Body";

        $("#page-body").val(modelData.body);
        view.ui.submitButton.click();
        expect(submitSpy.calledOnce).to.be.true;
        expect(submitSpy.firstCall.args[0]).to.deep.equal(modelData);
        done();
      });

      view.render();
  });
  describe("error display", function(){
    var self = this;
    var error_setup = function(){
      self.fixture = fixture.set("<div id='fixture'></div>")
      self.view = new Cecilia.AdminPageApp.Common.Views.Form({
        el: '#fixture',
        model: new Cecilia.Entities.Page(), 
        templateHelpers:  function(){
          return {title: 'Page Title', body: 'Page Body'}
        },
      });
      self.getErrorText = function(attribute){ 
        return  self.view.$el.find("#page-" + attribute).next(".error").text(); 
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
        expect(self.getErrorText("body")).to.equal('');
        this.triggerMethod("form:data:invalid", {
          body: "body error message"
        });

        expect(self.getErrorText("body")).to.equal("body error message");
        done();
      }); 
      self.view.render();
      error_cleanup();
    });
    it("clears the displayed errors before displaying new error messages", function(done){
      error_setup();
      self.view.once("render", function(){
        this.triggerMethod("form:data:invalid", { body: "body error message" });
        expect(self.getErrorText("body")).to.equal("body error message");
        
        this.triggerMethod("form:data:invalid", { body: "new body error message" });
        expect(self.getErrorText("body")).to.equal("new body error message");
        done();
      }); 
      self.view.render();
      error_cleanup();
    });
  });
});

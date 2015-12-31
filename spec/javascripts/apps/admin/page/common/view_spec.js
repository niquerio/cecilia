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
      view.once("attach", function(){
        expect(submitSpy.called).to.be.false;
        modelData.body = "New Body";

        //$("#page-body").val(modelData.body);
        view.simplemde.value(modelData.body);
        view.ui.submitButton.click();
        expect(submitSpy.calledOnce).to.be.true;
        expect(submitSpy.firstCall.args[0]).to.deep.equal(modelData);
        done();
      });

      view.render();
      view.onAttach();
      view.trigger('attach')
  });
});

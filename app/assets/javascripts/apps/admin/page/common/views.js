Cecilia.module("AdminPageApp.Common.Views", function(Views, Cecilia, Backbone, Marionette, $, _){

  Views.Form = Marionette.ItemView.extend({
    template: "admin/page/form",
    events: {
      "click @ui.submitButton": "submitClicked"
    },
    ui: {
      submitButton: "button.js-submit",
    },

    submitClicked: function(e){
      e.preventDefault();
      this.trigger("form:submit", {body: this.simplemde.value()});
    },
    onAttach: function(){
      this.simplemde = new SimpleMDE({ element: this.$el.find('#page-body')[0]});
    },
    
    onFormDataInvalid: function(errors){
      console.log(errors);
    },
    
  });
});

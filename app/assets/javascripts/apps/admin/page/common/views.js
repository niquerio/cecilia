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
      var $view = this.$el

      var clearFormErrors = function(){
        var $form = $view.find("form");
        $form.find(".help-inline.error").each(function(){
          $(this).remove();
        });
        $form.find(".control-group.error").each(function(){
          $(this).removeClass("error");
        });
      }

      var markErrors = function(value, key){
        var $controlGroup = $view.find("#page-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    },
    
  });
});

Cecilia.module("AdminActivityApp.Common.Views", function(Views, Cecilia, Backbone, Marionette, $, _){

  Views.Form = Marionette.ItemView.extend({
    template: "admin/activity/form",
    templateHelpers: function(){
      return { modal_title: '' }
    },
    events: {
      "click @ui.submitButton": "submitClicked"
    },
    ui: {
      submitButton: "button.js-submit",
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
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
        var $controlGroup = $view.find("#activity-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    },
    
  });
});

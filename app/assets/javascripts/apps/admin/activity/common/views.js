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

    onRender: function(){
      this.$el.find('#activity-users').select2({theme: "bootstrap"});
    },
    
    onFormDataInvalid: function(errors){
      var $view = this.$el

      var clearFormErrors = function(){
        var $form = $view.find("form");
        $form.find(".help-inline.error").each(function(){
          $(this).remove();
        });
        $form.find(".form-group.error").each(function(){
          $(this).removeClass("error");
          $(this).removeClass("text-danger");
        });
      }

      var markErrors = function(value, key){
        var $controlGroup = $view.find("#activity-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("error text-danger");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    },
    
  });
});

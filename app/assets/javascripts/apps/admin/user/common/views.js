Cecilia.module("AdminUserApp.Common.Views", function(Views, Cecilia, Backbone, Marionette, $, _){

  Views.Form = Marionette.ItemView.extend({
    template: "admin/user/form",
    templateHelpers: function(){
      return { title: '', 
        titles: new Backbone.Collection, 
        modal_title: '', 
        button_text: '' }
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
      data['bio'] = this.simplemde.value();
      this.trigger("form:submit", data);
    },
    
    onRender: function(){
      this.$el.find('#user-title').select2({theme: "bootstrap"});
    },
    onAttach: function(){
      this.simplemde = new SimpleMDE({ 
        element: this.$el.find('#user-bio')[0],
      });
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
        var $controlGroup = $view.find("#user-" + key).parent();
        var $errorEl = $("<span>", {class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    },
    
  });
});

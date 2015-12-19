Cecilia.module("AdminActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Activity = Marionette.ItemView.extend({
    template: "admin/activity/list_item",
    tagName: "tr",
    triggers: {
      "click button.js-edit": "activity:edit"
    },
  });
  List.Activities = Marionette.CompositeView.extend({
    template: "admin/activity/list",
    childView: List.Activity,
    childViewContainer: "tbody",
    triggers: {
      "click button.js-new": "activity:new"
    },
  });

  var processFormSubmit = function(data, triggerName){
    if(this.model.save(data)){
      this.$el.modal('hide');
      this.trigger(triggerName, this.model);
    }
    else{
      this.triggerMethod("form:data:invalid", this.model.validationError);
    }
  }
  List.NewModal = Cecilia.AdminActivityApp.New.Activity.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "activity:created");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });

  List.EditModal = Cecilia.AdminActivityApp.Edit.Activity.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "activity:updated");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });
});

Cecilia.module("AdminUserApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.User = Marionette.ItemView.extend({
    template: "admin/user/list_item",
    tagName: "tr",
    triggers: {
      "click button.js-edit": "user:edit",
      "click a.js-show": "user:show"
    },
  });
  List.Users = Marionette.CompositeView.extend({
    template: "admin/user/list",
    childView: List.User,
    childViewContainer: "tbody",
    triggers: {
      "click button.js-new": "user:new"
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
  List.NewModal = Cecilia.AdminUserApp.New.User.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "user:created");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });

  List.EditModal = Cecilia.AdminUserApp.Edit.User.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "user:updated");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });
});

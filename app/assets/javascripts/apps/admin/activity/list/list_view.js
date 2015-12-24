Cecilia.module("AdminActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Activity = Marionette.ItemView.extend({
    template: "admin/activity/list_item",
    tagName: "tr",
    triggers: {
      "click button.js-edit": "activity:edit",
      "click button.js-delete": "activity:delete"
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
      var tplHelpers = this.options.templateHelpers();
      this.model.set('difficulty', tplHelpers.difficulties.get(data.difficulty_id).get('level'))
      this.model.set('activity_type', tplHelpers.activity_types.get(data.activity_type_id).get('name'))
      this.model.set('activity_subtype', tplHelpers.activity_subtypes.get(data.activity_subtype_id).get('name'))
      if(this.model.attributes.teachers){
        this.model.attributes.teachers.reset();
      }else{
        this.model.set('teachers',new Cecilia.Entities.TeacherCollection);
      }
      for(var i = 0; i < data.users.length; i++){
        this.model.attributes.teachers.add(tplHelpers.users.get(data.users[i]));
      }
      this.model.trigger("change:teachers")
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

  List.ConfirmModal = Marionette.ItemView.extend({
    className: "modal fade",
    template: "admin/activity/confirm",
    triggers: {
      "click button.js-delete": "confirm:delete",
    },
    initialize: function(options){
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });
});

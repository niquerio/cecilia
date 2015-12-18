Cecilia.module("AdminClassroomApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Classroom = Marionette.ItemView.extend({
    template: "admin/classroom/list_item",
    tagName: "tr",
    triggers: {
      "click button.js-edit": "classroom:edit"
    },
  });
  List.Classrooms = Marionette.CompositeView.extend({
    template: "admin/classroom/list",
    childView: List.Classroom,
    childViewContainer: "tbody",
    triggers: {
      "click button.js-new": "classroom:new"
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
  List.NewModal = Cecilia.AdminClassroomApp.New.Classroom.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "classroom:created");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });

  List.EditModal = Cecilia.AdminClassroomApp.Edit.Classroom.extend({
    initialize: function(options){
      this.on("form:submit", function(data){
        processFormSubmit.call(this, data, "classroom:updated");
      });
      this.on("show", function(){
        this.$el.modal();
      });
    },
  });
});

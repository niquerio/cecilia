Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  
  ListTeachers.Activity = Marionette.ItemView.extend({
    template: "user/listTeachers_activity",
    tagName: "li",
    className: "activity_list_item",
    triggers: {
      "click a" : "activity:show",
      "click button.js-edit" : "activity:edit",
    },
  });
  ListTeachers.Teacher = Marionette.CompositeView.extend({
    template: "user/listTeachers_teacher",
    tagName: "li",
    childView: ListTeachers.Activity,
    childViewContainer: "ul",
    triggers: {
      "click a" : "teacher:show",
    },
    initialize: function(){
      this.collection = this.model.get('activities');
    },
  });
  ListTeachers.Teachers = Marionette.CompositeView.extend({
    template: "user/listTeachers",
    childView: ListTeachers.Teacher,
    childViewContainer: "ul",
  });
});

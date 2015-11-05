Cecilia.module("UserApp.ListTeachers", function(ListTeachers, Cecilia, Backbone, Marionette, $, _){
  
  ListTeachers.Activity = Marionette.ItemView.extend({
    template: "user/listTeachers_activity",
    tagName: "li",
  });
  ListTeachers.Teacher = Marionette.CompositeView.extend({
    template: "user/listTeachers_teacher",
    tagName: "li",
    childView: ListTeachers.Activity,
    childViewContainer: "ul",
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

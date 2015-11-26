Cecilia.module("UserApp.ListAllTeachers", function(ListAllTeachers, Cecilia, Backbone, Marionette, $, _){
  
  ListAllTeachers.Teacher = Marionette.ItemView.extend({
    template: "user/listAllTeachers_teacher",
    tagName: "li",
  });
  ListAllTeachers.Teachers = Marionette.CompositeView.extend({
    template: "user/listAllTeachers",
    childView: ListAllTeachers.Teacher,
    childViewContainer: "ul",
  });
});

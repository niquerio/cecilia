Cecilia.module("AdminClassroomApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Classroom = Marionette.ItemView.extend({
    template: "admin/classroom/list_item",
    tagName: "tr",
    triggers: {
      "click a.js-edit": "classroom:edit"
    },
  });
  List.Classrooms = Marionette.CompositeView.extend({
    template: "admin/classroom/list",
    childView: List.Classroom,
    childViewContainer: "tbody",
  });
});

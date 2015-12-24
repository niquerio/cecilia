Cecilia.module("AdminClassroomApp.New", function(New, Cecilia, Backbone, Marionette, $, _){
  New.Classroom = Cecilia.AdminClassroomApp.Common.Views.Form.extend({
    className: "modal fade",
    templateHelpers: function(){
      return { title: "New Classroom",  button_text: "Create"}
    },
  });
});

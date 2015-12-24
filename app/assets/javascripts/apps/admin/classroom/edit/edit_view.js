Cecilia.module("AdminClassroomApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Classroom = Cecilia.AdminClassroomApp.Common.Views.Form.extend({
    className: "modal fade",
    templateHelpers: function(){
      return { title: "Edit Classroom", button_text: "Update"}
    },
  });
});

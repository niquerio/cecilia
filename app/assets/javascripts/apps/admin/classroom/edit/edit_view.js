Cecilia.module("AdminClassroomApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Classroom = Cecilia.AdminClassroomApp.Common.Views.Form.extend({
    initialize: function(){
      this.title = "Edit Classroom"
    }
  });
  Edit.ClassroomModal = Cecilia.AdminClassroomApp.Common.Views.Form.extend({
    className: "modal fade",
    template: "admin/classroom/form_modal",
    templateHelpers: function(){
      return { title: "Edit Classroom", }
    },
  });
});

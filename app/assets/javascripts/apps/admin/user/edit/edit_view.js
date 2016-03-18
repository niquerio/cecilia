Cecilia.module("AdminUserApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.User = Cecilia.AdminUserApp.Common.Views.Form.extend({
    className: "modal fade",
    templateHelpers: function(){
      return { title: "Edit User", button_text: "Update"}
    },
  });
});

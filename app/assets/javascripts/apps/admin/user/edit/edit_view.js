Cecilia.module("AdminUserApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.User = Cecilia.AdminUserApp.Common.Views.Form.extend({
    template: "admin/user/form_modal",
    className: "modal fade",
    templateHelpers: function(){
      return { title: "Edit User", button_text: "Update"}
    },
  });
  Edit.UserPage = Cecilia.AdminUserApp.Common.Views.Form.extend({
  });
});

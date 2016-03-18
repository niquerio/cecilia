Cecilia.module("AdminUserApp.New", function(New, Cecilia, Backbone, Marionette, $, _){
  New.User = Cecilia.AdminUserApp.Common.Views.Form.extend({
    template: "admin/user/form_modal",
    className: "modal fade",
    templateHelpers: function(){
      return { title: "New User",  button_text: "Create"}
    },
  });
});

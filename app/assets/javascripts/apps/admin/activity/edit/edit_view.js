Cecilia.module("AdminActivityApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Activity = Cecilia.AdminActivityApp.Common.Views.Form.extend({
    className: "modal fade",
    templateHelpers: function(){
      return { modal_title: "Edit Activity", }
    },
  });
});

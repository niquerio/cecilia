Cecilia.module("AdminActivityApp.New", function(New, Cecilia, Backbone, Marionette, $, _){
  New.Activity = Cecilia.AdminActivityApp.Common.Views.Form.extend({
    className: "modal fade",
    templateHelpers: function(){
      return { modal_title: "New Activity", }
    },
  });
});

Cecilia.module("AdminPageApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Page = Marionette.ItemView.extend({
    template: "admin/page/list_item",
    tagName: "tr",
    triggers: {
      "click button.js-edit": "page:edit"
    },
  });
  List.Pages = Marionette.CompositeView.extend({
    template: "admin/page/list",
    childView: List.Page,
    childViewContainer: "tbody",
  });

});

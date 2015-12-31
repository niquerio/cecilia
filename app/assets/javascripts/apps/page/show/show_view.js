Cecilia.module("PageApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.MissingPage = Marionette.ItemView.extend({
    template: "page/missing",
  });
  Show.Page = Marionette.ItemView.extend({
    template: "page/show",
    triggers: {
      "click button.js-edit": "page:edit"
    },
  });
});

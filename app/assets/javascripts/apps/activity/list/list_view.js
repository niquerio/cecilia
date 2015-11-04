Cecilia.module("ActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Activity = Marionette.ItemView.extend({
    template: "activity/list_item",
    tagName: "li",
  });
  List.Activities = Marionette.CompositeView.extend({
    template: "activity/list",
    childView: List.Activity,
    childViewContainer: "ul",
  });
});

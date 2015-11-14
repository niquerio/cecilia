Cecilia.module("ActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Teacher = Marionette.ItemView.extend({
    template: "activity/teacher",
    tagName: "span",
  });
  List.Activity = Marionette.CompositeView.extend({
    template: "activity/list_item",
    tagName: "li",
    className: "activity_list_item",
    childView: List.Teacher,
    childViewContainer: ".teachers",
    initialize: function(){
      this.collection = this.model.get('teachers');
    },
    onRender: function(){
      var last_entry = this.$('.teachers').children().last().html();
      this.$('.teachers').children().last().html(last_entry.replace(/,\s*$/,''));
    },
  });
  List.Activities = Marionette.CompositeView.extend({
    template: "activity/list",
    childView: List.Activity,
    childViewContainer: "ul",
  });
});

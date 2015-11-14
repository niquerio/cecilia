Cecilia.module("ActivityApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Teacher = Marionette.ItemView.extend({
    template: "activity/teacher",
    tagName: "span",
  });
  Show.Activity = Marionette.CompositeView.extend({
    template: "activity/show_item",
    className: "modal fade",
    childView: Show.Teacher,
    childViewContainer: ".teachers",
    initialize: function(){
      this.collection = this.model.get('teachers');
    },
    onRender: function(){
      var last_entry = this.$('.teachers').children().last().html();
      this.$('.teachers').children().last().html(last_entry.replace(/,\s*$/,''));
    },
  });
});

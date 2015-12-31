Cecilia.module("ActivityApp.ListAll", function(ListAll, Cecilia, Backbone, Marionette, $, _){
  ListAll.Teacher = Marionette.ItemView.extend({
    template: "activity/teacher",
    tagName: "span",
    triggers: {
      "click" : "teacher:show",
    },
  });
  ListAll.Activity = Marionette.CompositeView.extend({
    template: "activity/complete_list_item",
    tagName: "tr",
    className: "activity_list_item",
    childView: ListAll.Teacher,
    childViewContainer: ".teachers",
    triggers: {
      "click a" : "activity:show",
    },
    initialize: function(){
      this.collection = this.model.get('teachers');
    },
    onRender: function(){
      var last_entry = this.$('.teachers').children().last().html();
      this.$('.teachers').children().last().html(last_entry.replace(/,\s*$/,''));
    },
  });
  ListAll.Activities = Marionette.CompositeView.extend({
    template: "activity/complete_list",
    childView: ListAll.Activity,
    childViewContainer: "tbody",
    onRender: function(){
      this.$('.table').DataTable({
        "order": [[0, "desc"]],
      });
    },
  });
});

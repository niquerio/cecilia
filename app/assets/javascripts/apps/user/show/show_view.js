Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Activity = Marionette.ItemView.extend({
    tagName: "tr",
    template: "user/show_activity",
    triggers: {
      "click a" : "activity:show",
    },
  });

  Show.Teacher = Marionette.CompositeView.extend({
    template: "user/show_teacher",
    triggers: {
      "click button.js-edit" : "user:edit",
    },
    initialize: function(){
      this.collection = this.model.get('activities');
    },
    childView: Show.Activity,
    childViewContainer: "tbody",
  });
});

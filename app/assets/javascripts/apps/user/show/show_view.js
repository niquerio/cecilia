Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Activity = Marionette.ItemView.extend({
    tagName: "tr",
    template: "user/show_activity",
  });

  Show.Teacher = Marionette.CompositeView.extend({
    template: "user/show_teacher",
    initialize: function(){
      this.collection = this.model.get('activities');
    },
    childView: Show.Activity,
    childViewContainer: "tbody",
  });
});

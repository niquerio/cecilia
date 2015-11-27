Cecilia.module("UserApp.Show", function(Show, Cecilia, Backbone, Marionette, $, _){
  Show.Teacher = Marionette.CompositeView.extend({
    template: "user/show_teacher",
    initialize: function(){
      this.collection = this.model.get('activities');
    },
    childView: Show.Activity,
    childViewContainer: "tbody",
  });
  Show.Activity = Marionette.ItemView.extend({
    template: "activity/show_activity",
    tagname: "tr",
  });
});

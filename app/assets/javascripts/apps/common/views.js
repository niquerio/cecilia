Cecilia.module("Common.Views", function(Views, Cecilia, Backbone, Marionette, $, _){
  Views.Loading = Marionette.ItemView.extend({
    template: 'common/loading',
    title: "Loading Data",
    message: "Please wait, data is loading.",
    templateHelpers: function(){
      return{
        title: Marionette.getOption(this, "title"),
        message: Marionette.getOption(this, "message"),
      }
    },
    onRender: function(){
      this.$el.find('#spinner').spin('show')
    },
  });
});

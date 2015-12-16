Cecilia.module("AdminClassroomApp.Common.Views", function(Views, Cecilia, Backbone, Marionette, $, _){

  Views.Form = Marionette.ItemView.extend({
    template: "admin/classroom/form",
    events: {
      "click button.js-submit": "submitClicked"
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },

    onRender: function(){
      if(! this.options.asModal){
        var $title = $("<h1>", { text: this.title});
        this.$el.prepend($title);
      }
    },

    
  });
});

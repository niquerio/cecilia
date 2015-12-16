Cecilia.module("AdminClassroomApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listClassrooms: function(){
      var fetchingClassrooms = Cecilia.request("classroom:entities");
      $.when(fetchingClassrooms).done(function(classrooms){
        var classroomsView = new List.Classrooms({collection:classrooms});
        
        classroomsView.on("childview:classroom:edit", function(parentArgs, args){
          var view = new Cecilia.AdminClassroomApp.Edit.ClassroomModal({
            model: args.model,
            asModal: true
          });
          view.on("form:submit", function(data){
            if(args.model.save(data)){
              args.view.render();
              this.$el.modal('hide');
            }else{
              console.log('error in form submit via modal');
            }
          });
          view.on("show", function(){
            this.$el.modal();
          });
          Cecilia.regions.dialog.show(view);
        });

        Cecilia.regions.main.show(classroomsView);
      });
    },
  };
});

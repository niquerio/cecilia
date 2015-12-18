Cecilia.module("AdminClassroomApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listClassrooms: function(){
      var fetchingClassrooms = Cecilia.request("classroom:entities");
      $.when(fetchingClassrooms).done(function(classrooms){
        var classroomsView = new List.Classrooms({collection:classrooms});


        classroomsView.on("classroom:new", function(){
          var newClassroom = new Cecilia.Entities.Classroom({
            event_id: Cecilia.Constants.current_event_id,
            name: "",
            id: null,
          });
          var view = new List.NewModal({
            model: newClassroom
          })

          this.listenTo(view, "classroom:created", function(newClassroom){
            classrooms.add(newClassroom);
          });

          Cecilia.regions.dialog.show(view);
        });
        
        classroomsView.on("childview:classroom:edit", function(parentArgs, args){
          var view = new List.EditModal({
            model: args.model,
          });

          this.listenTo(view, "classroom:updated", function(){
            args.view.render();
          });

          Cecilia.regions.dialog.show(view);
        });

        Cecilia.regions.main.show(classroomsView);
      });
    },
  };
});

Cecilia.module("AdminClassroomApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listClassrooms: function(){
      var fetchingClassrooms = Cecilia.request("classroom:entities");
      $.when(fetchingClassrooms).done(function(classrooms){
        var classroomsView = new List.Classrooms({collection:classrooms});

        Cecilia.regions.main.show(classroomsView);
      });
    },
  };
});

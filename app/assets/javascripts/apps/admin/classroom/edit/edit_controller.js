Cecilia.module("AdminClassroomApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Controller = {
    editClassroom: function(id){
      var fetchingClassroom = Cecilia.request("classroom:entity", id);
      $.when(fetchingClassroom).done(function(classroom){
        var classroomView = new Edit.Classroom({model:classroom});

        classroomView.on("form:submit", function(data){
          classroom.save(data);
          Cecilia.trigger("admin:classroom:list");
        });
        Cecilia.regions.main.show(classroomView);
      });
    },
  };
});

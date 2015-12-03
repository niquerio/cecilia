describe("ActivityApp.List.Teacher", function(){
  describe("Triggers", function(){
    it("triggers 'teacher:show' when teacher link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Teacher({
        "username": 'blah',
        "title": 'Lord',
        "sca_first_name": 'Mundungus',
        "sca_last_name": 'Smith',
      });
      var view = new Cecilia.ActivityApp.List.Teacher({
        el: '#fixture',
        model: model, 
      });
      sinon.spy(view, "trigger");
      view.once("render", function(){
        $('#fixture').find("a").click();
        expect(view.trigger).to.have.been.calledWith("teacher:show").once;
      }); 

      view.render();
    });
  });
});
describe("ActivityApp.List.Activity", function(){
  describe("Triggers", function(){
    it("triggers 'activity:show' when activity link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Activity({
        id: 2,
        title: 'Class Title',
        description: 'Class Description',
        difficulty: 2,
        activity_type: 'Lecture',
        activity_subtype: 'Vocal and Instrumental',
        start_time: "2013-05-18T19:00:00.000-04:00",
        end_time: "2013-05-18T20:00:00.000-04:00",
        classroom: "Youth Room",
        teachers: [
          {
            title: 'Lord', 
            sca_first_name: 'Mundungus', 
            sca_last_name: 'Smith', 
            username: 'mundy', 
          }
        ]
      });

      var view = new Cecilia.ActivityApp.List.Activity({
        el: '#fixture',
        model: model,
      });
      sinon.spy(view, "trigger");
      view.once("render", function(){
        $('#fixture').find(".activity-title").click();
        expect(view.trigger).to.have.been.calledWith("activity:show").once;
      }); 

      view.render();
    });
  });
});

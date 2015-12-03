describe("ActivityApp.ListAll.Teacher", function(){
  describe("Triggers", function(){
    it("triggers 'teacher:show' when teacher link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Teacher({
        "username": 'blah',
        "title": 'Lord',
        "sca_first_name": 'Mundungus',
        "sca_last_name": 'Smith',
      });
      var view = new Cecilia.ActivityApp.ListAll.Teacher({
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
describe("ActivityApp.ListAll.Activity", function(){
  describe("Triggers", function(){
    it("triggers 'activity:show' when activity link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Activity({
        "title": "Class Title",
        "id": "3",
        "year": "2014",
        "teachers": [
          {
            "username": 'blah',
            "title": 'Lord',
            "sca_first_name": 'Mundungus',
            "sca_last_name": 'Smith',
          }
        ],
        "difficulty": '2',
        "activity_type": "Lecture",
        "activity_subtype": "Vocal",
      });
      var view = new Cecilia.ActivityApp.ListAll.Activity({
        el: '#fixture',
        model: model, 
      });
      sinon.spy(view, "trigger");
      view.once("render", function(){
        $('#fixture').find("a").click();
        expect(view.trigger).to.have.been.calledWith("activity:show").once;
      }); 

      view.render();
    });
  });
});

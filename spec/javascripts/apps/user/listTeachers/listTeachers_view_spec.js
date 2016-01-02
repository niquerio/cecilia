describe("UserApp.ListTeachers.Teacher", function(){
  describe("Triggers", function(){
    it("triggers 'teacher:show' when teacher link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Teacher({
        "username": 'blah',
        "title": 'Lord',
        "sca_first_name": 'Mundungus',
        "sca_last_name": 'Smith',
      });
      var view = new Cecilia.UserApp.ListTeachers.Teacher({
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
describe("UserApp.ListTeachers.Activity", function(){
  var self = this;
  var activity_setup = function(){
      self.fixture = fixture.set("<div id='fixture'></div>")
      self.model = new Cecilia.Entities.Teacher({
        id: 2,
        title: 'Class Title',
        description: 'Class Description',
        difficulty: 2,
        activity_type: 'Lecture',
        activity_subtype: 'Vocal and Instrumental',
        start_time: "2013-05-18T19:00:00.000-04:00",
        end_time: "2013-05-18T20:00:00.000-04:00",
        classroom: "Youth Room",
      });
      self.view = new Cecilia.UserApp.ListTeachers.Activity({
        el: '#fixture',
        model: self.model, 
      });
  }
  var activity_cleanup = function(){
    delete self.fixture
    delete self.model
    delete self.view
  }
  describe("Edit Activity Button", function(){
    it("is shown when user is logged in", function(){
      activity_setup();
      Cecilia.currentUser = new Cecilia.Entities.Teacher(); 
      self.view.render();
      expect(self.view.$el.find('.js-edit').text()).to.equal(' Edit');
      Cecilia.currentUser = null;
      activity_cleanup();
    });
    it("is not shown when user is not logged in", function(){
      activity_setup();
      self.view.render();
      expect(self.view.$el.find('.js-edit').text()).to.equal('');
      activity_cleanup();
    });
  });
  describe("Triggers", function(){
    it("triggers 'activity:edit' when edit button is clicked", function(){
      activity_setup();
      sinon.spy(self.view, "trigger");
      Cecilia.currentUser = new Cecilia.Entities.Teacher(); 
      self.view.once("render", function(){
        $('#fixture').find(".js-edit").click();
        expect(self.view.trigger).to.have.been.calledWith("activity:edit").once;
      }); 

      self.view.render();
      Cecilia.currentUser = null;
      activity_cleanup();
    });
    it("triggers 'activity:show' when activity link is clicked", function(){
      activity_setup();
      sinon.spy(self.view, "trigger");
      self.view.once("render", function(){
        $('#fixture').find("a").click();
        expect(self.view.trigger).to.have.been.calledWith("activity:show").once;
      }); 

      self.view.render();
      activity_cleanup();
    });
  });
});

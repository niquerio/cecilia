describe("ActivityApp.Show.Activity", function(){
  var self = this;
  var activity_setup = function(){
    self.fixture = fixture.set("<div id='fixture'></div>")
    self.model = new Cecilia.Entities.Activity({ 
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
    self.view = new Cecilia.ActivityApp.Show.Activity({
      el: '#fixture',
      model: self.model, 
    });
  }
  var activity_cleanup = function(){
    delete self.fixture
    delete self.model
    delete self.view
  }
  it("displays the info about activity", function(done){
    activity_setup();

    self.view.once("render", function(){
      expect($('#fixture').find("h1").text()).to.contain("Class Title");
      expect($('#fixture').text()).to.contain("Class Description");
      done();
    }); 

    self.view.render();
    activity_cleanup();
  });
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
  });
});
describe("ActivityApp.Show.Teacher", function(){
  describe("Triggers", function(){
    it("triggers 'teacher:show' when teacher link is clicked", function(){
      this.fixture = fixture.set("<div id='fixture'></div>")
      var model = new Cecilia.Entities.Teacher({
        "username": 'blah',
        "title": 'Lord',
        "sca_first_name": 'Mundungus',
        "sca_last_name": 'Smith',
      });
      var view = new Cecilia.ActivityApp.Show.Teacher({
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
describe("ActivityApp.Show.ActivityModal", function(){
  describe("Triggers", function(){
    it("triggers 'activity:show' when title is clicked", function(){
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
      var view = new Cecilia.ActivityApp.Show.ActivityModal({
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

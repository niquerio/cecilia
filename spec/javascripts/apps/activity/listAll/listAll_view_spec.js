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
  var self = this;
  activity_setup = function(){
      self.fixture = fixture.set("<div id='fixture'></div>")
      self.model = new Cecilia.Entities.Activity({
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
      self.view = new Cecilia.ActivityApp.ListAll.Activity({
        el: '#fixture',
        model: self.model, 
      });
  }
  activity_cleanup = function(){
    delete self.fixture;
    delete self.model;
    delete self.view;
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

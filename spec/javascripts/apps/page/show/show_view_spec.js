describe("PageApp.Show.Page", function(){
  var self = this;
  var setup = function(){
    self.fixture = fixture.set("<div id='fixture'></div>")
    self.model = new Cecilia.Entities.Page({ title: 'Title', body: 'Body of page' });
    self.view = new Cecilia.PageApp.Show.Page({
      el: '#fixture',
      model: self.model, 
    });
  }
  var cleanup = function(){
    delete self.fixture;
    delete self.model;
    delete self.view;

  }
  it("displays the title and the page body", function(done){
    setup();
    self.view.once("render", function(){
      expect($('#fixture').find("h1").text()).to.equal("Title");
      expect($('#fixture').text()).to.contain("Body of page");
      done();
    }); 

    self.view.render();
    cleanup();
  });
  describe("Edit Page Button", function(){
    it("is shown when user is logged in", function(){
      setup();
      Cecilia.currentUser = new Cecilia.Entities.Teacher(); 
      self.view.render();
      expect(self.view.$el.find('.js-edit').text()).to.equal(' Edit Page');
      Cecilia.currentUser = null;
      cleanup();
    });
    it("is not shown when user is not logged in", function(){
      setup();
      self.view.render();
      expect(self.view.$el.find('.js-edit').text()).to.equal('');
      cleanup();
    });
  });
  describe("Triggers", function(){
    it("triggers 'activity:edit' when edit button is clicked", function(){
      setup();
      sinon.spy(self.view, "trigger");
      Cecilia.currentUser = new Cecilia.Entities.Teacher(); 

      self.view.once("render", function(){
        $('#fixture').find(".js-edit").click();
        expect(self.view.trigger).to.have.been.calledWith("page:edit").once;
      }); 

      self.view.render();
      Cecilia.currentUser = null;
      cleanup();
    });
  });
});

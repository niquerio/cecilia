describe("AdminActivityApp.EditSchedule.Layout", function(){
  var self = this;
  setup = function(){
    self.view = new Cecilia.AdminActivityApp.EditSchedule.Layout();
     
  }
  cleanup = function(){
    delete self.view;
  }
  it("has a scheduled region", function(){
    setup();
    expect(self.view.scheduledRegion).to.be.ok;
    cleanup();
  });
  it("has an unscheduled region", function(){
    setup();
    expect(self.view.unscheduledRegion).to.be.ok;
    cleanup();
  });

  describe("'show' event", function(){
    var show_setup = function(){
      sinon.stub(self.view.scheduledRegion, "show");
      sinon.stub(self.view.unscheduledRegion, "show");
    }
    var show_cleanup = function(){
      self.view.scheduledRegion.show.restore();
      self.view.unscheduledRegion.show.restore();
    }
    it("displays the 'unscheduledView' in the 'unscheduledRegion'", function(){
      setup();
      show_setup();

      var unscheduled = {};      
      self.view.unscheduledView = unscheduled;

      self.view.trigger("show");
      expect(self.view.unscheduledRegion.show).to.have.been.calledWith(unscheduled);


      show_cleanup();
      cleanup();
    })
    it("displays the 'scheduledView' in the 'scheduledRegion'", function(){
      setup();
      show_setup();

      var scheduled = {};      
      self.view.scheduledView = scheduled;

      self.view.trigger("show");
      expect(self.view.scheduledRegion.show).to.have.been.calledWith(scheduled);


      show_cleanup();
      cleanup();
    })
  });
});

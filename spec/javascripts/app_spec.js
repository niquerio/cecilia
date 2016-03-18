describe("App", function(){
  var setup = function(){
    sinon.stub(Cecilia.PageApp, "start");
    sinon.stub(Cecilia.MenuApp, "start");
    sinon.stub(Cecilia.ActivityApp, "start");
    sinon.stub(Cecilia.UserApp, "start");
    sinon.stub(Cecilia.AdminUserApp, "start");
    sinon.stub(Cecilia.AdminClassroomApp, "start");
    sinon.stub(Cecilia.AdminActivityApp, "start");
    sinon.stub(Cecilia.AdminPageApp, "start");
    sinon.stub(Backbone.history, "start");
  };
  var cleanup = function(){
    Cecilia.PageApp.start.restore();
    Cecilia.MenuApp.start.restore();
    Cecilia.ActivityApp.start.restore();
    Cecilia.UserApp.start.restore();
    Cecilia.AdminUserApp.start.restore();
    Cecilia.AdminClassroomApp.start.restore();
    Cecilia.AdminActivityApp.start.restore();
    Cecilia.AdminPageApp.start.restore();
    Backbone.history.start.restore(); 
  }
  it("starts admin apps when user is logged in", function(){
    setup();

    Cecilia.currentUser = new Cecilia.Entities.Teacher();
    Cecilia.trigger("start");
    expect(Cecilia.AdminClassroomApp.start).to.have.been.called.once;
   
    cleanup(); 
  });
  it("does not start admin apps when user is not logged in", function(){
    setup();

    Cecilia.currentUser = null
    Cecilia.trigger("start");
    expect(Cecilia.AdminClassroomApp.start).to.not.have.been.called.once;
   
    cleanup(); 
  });
});

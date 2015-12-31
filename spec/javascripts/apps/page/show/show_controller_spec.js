describe("PageApp.Show.Controller", function(){
  describe("showPage", function(){

    it("displays loading view in the main region", sinon.test(function(){
      var controller = Cecilia.PageApp.Show.Controller;
      this.stub(Cecilia, "request").withArgs("page:entity", 'page_slug').returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.PageApp.Show, "Page").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      var loadingView = _.extend({}, Backbone.Events);
      this.stub(Cecilia.Common.Views, "Loading").returns(loadingView);

      controller.showPage('page_slug');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(loadingView).once;
    }));
    it("displays the 'page' view in the main region", sinon.test(function(){
      var controller = Cecilia.PageApp.Show.Controller;
      this.stub(Cecilia, "request").withArgs("page:entity", 'page_slug').returns({});
      var view = _.extend({}, Backbone.Events);
      this.stub(Cecilia.PageApp.Show, "Page").returns(view);
      Cecilia._configureRegions();
      this.stub(Cecilia.regions.main, "show");

      controller.showPage('page_slug');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;

    }));
  });
});

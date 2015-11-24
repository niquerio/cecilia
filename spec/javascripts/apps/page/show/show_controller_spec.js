describe("PageApp.Show.Controller", function(){
  describe("showPage", function(){
    it("displays the 'page' view in the main region", function(){
      var controller = Cecilia.PageApp.Show.Controller;
      sinon.stub(Cecilia, "request").withArgs("page:entity", 'page_slug').returns({});
      var view = _.extend({}, Backbone.Events);
      sinon.stub(Cecilia.PageApp.Show, "Page").returns(view);
      Cecilia._configureRegions();
      sinon.stub(Cecilia.regions.main, "show");
      controller.showPage('page_slug');
      expect(Cecilia.regions.main.show).to.have.been.calledWith(view).once;

      Cecilia.request.restore();
      Cecilia.PageApp.Show.Page.restore();
      Cecilia.regions.main.show.restore();
    });
  });
});

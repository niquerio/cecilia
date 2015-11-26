describe("Menu entity", function(){
  describe("Model", function(){
  });
  describe("Collection", function(){
    it("can be fetched with a 'menu:entities' request", sinon.test(function(){
      var fakeCollection = {}
      this.stub(Cecilia.Entities, "_menuInitialized").returns(false);
      this.stub(Cecilia.Entities, "_initializeMenuItems").returns(fakeCollection);

      var menu = Cecilia.request("menu:entities");
      expect(menu).to.equal(fakeCollection);
    }));
  });
});

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

    it("contains Admin column if user is logged in", function(){
      Cecilia.currentUser = new Cecilia.Entities.Teacher;
      var menu = Cecilia.Entities._initializeMenuItems();
      expect(menu.findWhere({name: 'Admin'})).to.exist 
    }); 
    it("does not contain Admin column if user is not logged in", function(){
      Cecilia.currentUser = null
      var menu = Cecilia.Entities._initializeMenuItems();
      expect(menu.findWhere({name: 'Admin'})).not.to.exist 
    }); 
  });
});

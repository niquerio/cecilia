describe("Common.Views.Loading", function(){

  describe("serializeData", function(){
    it("serializes default options properly", function(){
      var view = new Cecilia.Common.Views.Loading();
      var templateHelpers = view.templateHelpers();
      expect(templateHelpers.title).to.equal("Loading Data");
      expect(templateHelpers.message).to.equal("Please wait, data is loading.");

    });
    it("serializes provided options properly", function(){
      var options = {
        title: "Test title",
        message: "Test message"
      };
      var view = new Cecilia.Common.Views.Loading(options);
      var templateHelpers = view.templateHelpers();
      expect(templateHelpers.title).to.equal(options.title);
      expect(templateHelpers.message).to.equal(options.message);
    });
  });
});

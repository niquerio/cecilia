describe("Page entitity", function(){
  describe("Model", function(){
    describe("page:entity request", function(){
      it("should call Page with slug", function(done){
        this.page = new Cecilia.Entities.Page
        var self = this;
        sinon.stub(this.page, "fetch", function(options){
          return options.success(self.page);
        }); 
        sinon.stub(Cecilia.Entities, "Page").returns(this.page);

        var requestedSlug = 'directions';
        var promise = Cecilia.request("page:entity", requestedSlug); 
        expect(Cecilia.Entities.Page).to.have.been.calledWith({slug: requestedSlug}).once;

        $.when(promise).done(function(fetchedPage){
          expect(self.page.fetch).to.have.been.called.once;
          expect(fetchedPage).to.equal(self.page);
          done();
        });
        
        delete this.page;
        Cecilia.Entities.Page.restore(); 
      });
    });
  });
});

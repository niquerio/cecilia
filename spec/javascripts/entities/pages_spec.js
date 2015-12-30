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
    describe("admin:page:entity request", function(){
      it("should call Page with id", function(done){
        this.page = new Cecilia.Entities.AdminPage
        var self = this;
        sinon.stub(this.page, "fetch", function(options){
          return options.success(self.page);
        }); 
        sinon.stub(Cecilia.Entities, "AdminPage").returns(this.page);

        var id = 3;
        var promise = Cecilia.request("admin:page:entity", id); 
        expect(Cecilia.Entities.AdminPage).to.have.been.calledWith({id: id}).once;

        $.when(promise).done(function(fetchedPage){
          expect(self.page.fetch).to.have.been.called.once;
          expect(fetchedPage).to.equal(self.page);
          done();
        });
        
        delete this.page;
        Cecilia.Entities.AdminPage.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("admin:page:entities request", function(){
      it("should fetch pages", function(done){
        this.pages = new Cecilia.Entities.AdminPageCollection();
        var page = new Cecilia.Entities.AdminPage();
        this.pageArray = [page];
        var self = this;
        sinon.stub(this.pages, "fetch", function(options){
          return options.success(self.pageArray);
        }); 
        sinon.stub(Cecilia.Entities, "AdminPageCollection").returns(this.pages);

        var promise = Cecilia.request("admin:page:entities"); 

        $.when(promise).done(function(fetchedPages){
          expect(self.pages.fetch).to.have.been.called.once;
          expect(fetchedPages).to.equal(self.pageArray);
          done();
        });
        
        delete this.pages;
        delete this.pagesArray;
        Cecilia.Entities.AdminPageCollection.restore(); 
      });
    });
  });
});

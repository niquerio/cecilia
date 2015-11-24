describe("PageApp.Show", function(){
  it("displays the title and the page body", function(done){
    this.fixture = fixture.set("<div id='fixture'></div>")
    var model = new Cecilia.Entities.Page({ title: 'Title', body: 'Body of page' });
    var view = new Cecilia.PageApp.Show.Page({
      el: '#fixture',
      model: model, 
    });
    view.once("render", function(){
      expect($('#fixture').find("h1").text()).to.equal("Title");
      done();
    }); 

    view.render();
  });
});

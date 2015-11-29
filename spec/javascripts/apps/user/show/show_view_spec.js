describe.only("UserApp.Show Views", function(){
  it("displays the Name and other info about person", function(done){
    this.fixture = fixture.set("<div id='fixture'></div>")
    var model = new Cecilia.Entities.Teacher({ 
      title: 'Lord', 
      sca_first_name: 'Mundungus', 
      sca_last_name: 'Smith', 
      modern_first_name: 'John', 
      modern_last_name: 'Doe', 
      bio: 'I teach things', 
      activities: [
        {
          id: 2,
          year: '2015',
          title: 'Class Title',
          difficulty: 2,
          activity_type: 'Lecture',
          activity_subtype: 'Vocal and Instrumental',
        }
      ]
    });
    var view = new Cecilia.UserApp.Show.Teacher({
      el: '#fixture',
      model: model, 
    });
    view.once("render", function(){
      expect($('#fixture').find("h1").text()).to.contain("Lord Mundungus Smith");
      expect($('#fixture').text()).to.contain("I teach things");
      done();
    }); 

    view.render();
  });
});

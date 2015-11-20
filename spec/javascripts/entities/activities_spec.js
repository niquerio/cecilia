describe("Activity entitity", function(){
  describe("Model", function(){
    describe("activity:entity request", function(){
      it("should call Activity with id", function(done){
        this.activity = new Cecilia.Entities.Activity
        var self = this;
        sinon.stub(this.activity, "fetch", function(options){
          return options.success(self.activity);
        }); 
        sinon.stub(Cecilia.Entities, "Activity").returns(this.activity);

        var requestedId = 2;
        var promise = Cecilia.request("activity:entity", requestedId); 
        expect(Cecilia.Entities.Activity).to.have.been.calledWith({id: requestedId}).once;

        $.when(promise).done(function(fetchedActivity){
          expect(self.activity.fetch).to.have.been.called.once;
          expect(fetchedActivity).to.equal(self.activity);
          done();
        });
        
        delete this.activity;
        Cecilia.Entities.Activity.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("activity:entities request", function(){
      it("should fetch activities", function(done){
        this.activities = new Cecilia.Entities.ActivityCollection();
        var activity = new Cecilia.Entities.Activity();
        this.activityArray = [activity];
        var self = this;
        sinon.stub(this.activities, "fetch", function(options){
          return options.success(self.activityArray);
        }); 
        sinon.stub(Cecilia.Entities, "ActivityCollection").returns(this.activities);

        var promise = Cecilia.request("activity:entities"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.activities.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.activityArray);
          done();
        });
        
        delete this.activities;
        delete this.activitiesArray;
        Cecilia.Entities.ActivityCollection.restore(); 
      });
    });
    describe("activity:entities:schedule request", function(){
      it("should fetch schedule", function(done){
        this.activities = new Cecilia.Entities.ScheduleDayCollection();
        var activity = new Cecilia.Entities.Activity();
        this.activityArray = [activity];
        var self = this;
        sinon.stub(this.activities, "fetch", function(options){
          return options.success(self.activityArray);
        }); 
        sinon.stub(Cecilia.Entities, "ScheduleDayCollection").returns(this.activities);

        var promise = Cecilia.request("activity:entities:schedule"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.activities.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.activityArray);
          done();
        });
        
        delete this.activities;
        delete this.activitiesArray;
        Cecilia.Entities.ScheduleDayCollection.restore(); 
      });
    });
  });
});

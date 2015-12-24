describe("Admin Activity Entity", function(){
  describe("Model", function(){
    describe("Validations", function(){
      var self = this;
      var validation_setup = function(){
        self.activity = new Cecilia.Entities.AdminActivity({
          title: "Activity Title",
          description: "Activity Description",
          difficulty_id: 1,
          activity_type_id: 1,
          activity_subtype_id: 1,
          users: [2],
        }); 
      }
      var validation_cleanup = function(){
        delete self.activity;
      }
      it("accepts models with valid data", function(){
        validation_setup();
        expect(self.activity.isValid()).to.be.true;
        validation_cleanup();
      });

      it("refuses blank title", function(){
        validation_setup();
        self.activity.set("title", "");
        expect(self.activity.isValid()).to.be.false;
        validation_cleanup();
      });
      it("refuses empty users array", function(){
        validation_setup();
        self.activity.set("users", []);
        expect(self.activity.isValid()).to.be.false;
        validation_cleanup();
      });
    });
    describe("admin:activity:entity request", function(){
      it("should call Activity with id", function(done){
        //setup
        this.activity = new Cecilia.Entities.Activity
        var self = this;
        sinon.stub(this.activity, "fetch", function(options){
          return options.success(self.activity);
        }); 
        sinon.stub(Cecilia.Entities, "AdminActivity").returns(this.activity);

        var requestedId = 2;
        var promise = Cecilia.request("admin:activity:entity", requestedId); 
        expect(Cecilia.Entities.AdminActivity).to.have.been.calledWith({id: requestedId}).once;

        $.when(promise).done(function(fetchedActivity){
          expect(self.activity.fetch).to.have.been.called.once;
          expect(fetchedActivity).to.equal(self.activity);
          done();
        });
        
        delete this.activity;
        Cecilia.Entities.AdminActivity.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("admin:activity:entities request", function(){
      it("should fetch activities", function(done){
        this.activities = new Cecilia.Entities.AdminActivityCollection();
        var activity = new Cecilia.Entities.AdminActivity();
        this.activityArray = [activity];
        var self = this;
        sinon.stub(this.activities, "fetch", function(options){
          return options.success(self.activityArray);
        }); 
        sinon.stub(Cecilia.Entities, "AdminActivityCollection").returns(this.activities);

        var promise = Cecilia.request("admin:activity:entities"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.activities.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.activityArray);
          done();
        });
        
        delete this.activities;
        delete this.activitiesArray;
        Cecilia.Entities.AdminActivityCollection.restore(); 
      });
    });
  });
});
describe("Activity entitity", function(){
  describe("Model", function(){
    describe("activity:entity request", function(){
      it("should call Activity with id", function(done){
        //setup
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
    describe("activity:entities:all request", function(){
      it("should fetch complete list of classes", function(done){
        this.activities = new Cecilia.Entities.CompleteActivityCollection();
        var activity = new Cecilia.Entities.Activity();
        this.activityArray = [activity];
        var self = this;
        sinon.stub(this.activities, "fetch", function(options){
          return options.success(self.activityArray);
        }); 
        sinon.stub(Cecilia.Entities, "CompleteActivityCollection").returns(this.activities);

        var promise = Cecilia.request("activity:entities:all"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.activities.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.activityArray);
          done();
        });
        
        delete this.activities;
        delete this.activitiesArray;
        Cecilia.Entities.CompleteActivityCollection.restore(); 
      });
    });
  });
});

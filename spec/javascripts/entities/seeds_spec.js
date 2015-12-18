describe("Activity Types entitity", function(){
  describe("Collection", function(){
    describe("activity_type:entities request", function(){
      it("should fetch activity types", function(done){
        this.activityTypes = new Cecilia.Entities.ActivityTypeCollection();
        var activityType = new Cecilia.Entities.ActivityType();
        this.activityTypeArray = [activityType];
        var self = this;
        sinon.stub(this.activityTypes, "fetch", function(options){
          return options.success(self.activityTypeArray);
        }); 
        sinon.stub(Cecilia.Entities, "ActivityTypeCollection").returns(this.activityTypes);

        var promise = Cecilia.request("activity_type:entities"); 

        $.when(promise).done(function(fetchedActivityTypes){
          expect(self.activityTypes.fetch).to.have.been.called.once;
          expect(fetchedActivityTypes).to.equal(self.activityTypeArray);
          done();
        });
        
        delete this.activityTypes;
        delete this.activityTypeArray;
        Cecilia.Entities.ActivityTypeCollection.restore(); 
      });
    });
  });
});
describe("Activity Subtypes entitity", function(){
  describe("Collection", function(){
    describe("activity_subtype:entities request", function(){
      it("should fetch activity subtypes", function(done){
        this.activitySubtypes = new Cecilia.Entities.ActivitySubtypeCollection();
        var activitySubtype = new Cecilia.Entities.ActivitySubtype();
        this.activitySubtypeArray = [activitySubtype];
        var self = this;
        sinon.stub(this.activitySubtypes, "fetch", function(options){
          return options.success(self.activitySubtypeArray);
        }); 
        sinon.stub(Cecilia.Entities, "ActivitySubtypeCollection").returns(this.activitySubtypes);

        var promise = Cecilia.request("activity_subtype:entities"); 

        $.when(promise).done(function(fetchedActivitySubtypes){
          expect(self.activitySubtypes.fetch).to.have.been.called.once;
          expect(fetchedActivitySubtypes).to.equal(self.activitySubtypeArray);
          done();
        });
        
        delete this.activitySubtypes;
        delete this.activitySubtypeArray;
        Cecilia.Entities.ActivitySubtypeCollection.restore(); 
      });
    });
  });
});
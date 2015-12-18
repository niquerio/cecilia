describe("Classroom entitity", function(){
  describe("Model", function(){
    describe("Validations", function(){
      var self = this;
      var validation_setup = function(){
        self.classroom = new Cecilia.Entities.Classroom({
          name: "Classroom"
        }); 
      }
      var validation_cleanup = function(){
        delete self.classroom;
      }
      it("accepts models with valid data", function(){
        validation_setup();
        expect(self.classroom.isValid()).to.be.true;
        validation_cleanup();
      });

      it("refuses blank name", function(){
        validation_setup();
        self.classroom.set("name", "");
        expect(self.classroom.isValid()).to.be.false;
        validation_cleanup();
      });
    });
    describe("classroom:entity request", function(){
      it("should call classroom with id", function(done){
        //setup
        this.classroom = new Cecilia.Entities.Classroom
        var self = this;
        sinon.stub(this.classroom, "fetch", function(options){
          return options.success(self.classroom);
        }); 
        sinon.stub(Cecilia.Entities, "Classroom").returns(this.classroom);

        var requestedId = 2;
        var promise = Cecilia.request("classroom:entity", requestedId); 
        expect(Cecilia.Entities.Classroom).to.have.been.calledWith({id: requestedId}).once;

        $.when(promise).done(function(fetchedClassroom){
          expect(self.classroom.fetch).to.have.been.called.once;
          expect(fetchedClassroom).to.equal(self.classroom);
          done();
        });
        
        delete this.classroom;
        Cecilia.Entities.Classroom.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("classroom:entities request", function(){
      it("should fetch classrooms", function(done){
        this.classrooms = new Cecilia.Entities.ClassroomCollection();
        var classroom = new Cecilia.Entities.Classroom();
        this.classroomArray = [classroom];
        var self = this;
        sinon.stub(this.classrooms, "fetch", function(options){
          return options.success(self.classroomArray);
        }); 
        sinon.stub(Cecilia.Entities, "ClassroomCollection").returns(this.classrooms);

        var promise = Cecilia.request("classroom:entities"); 

        $.when(promise).done(function(fetchedClassrooms){
          expect(self.classrooms.fetch).to.have.been.called.once;
          expect(fetchedClassrooms).to.equal(self.classroomArray);
          done();
        });
        
        delete this.classrooms;
        delete this.classroomsArray;
        Cecilia.Entities.ClassroomCollection.restore(); 
      });
    });

  });
});

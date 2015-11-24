describe("Users entitity", function(){
  describe("Model", function(){
    describe("user:entity request", function(){
      it("should fetch User with id", function(done){
        //setup
        this.user = new Cecilia.Entities.User
        var self = this;
        sinon.stub(this.user, "fetch", function(options){
          return options.success(self.user);
        }); 
        sinon.stub(Cecilia.Entities, "User").returns(this.user);

        var requestedId = 2;
        var promise = Cecilia.request("user:entity", requestedId); 
        expect(Cecilia.Entities.User).to.have.been.calledWith({id: requestedId}).once;

        $.when(promise).done(function(fetchedUser){
          expect(self.user.fetch).to.have.been.called.once;
          expect(fetchedUser).to.equal(self.user);
          done();
        });
        
        delete this.user;
        Cecilia.Entities.User.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("user:entities:teachers request", function(){
      it("should fetch teachers", function(done){
        this.teachers = new Cecilia.Entities.TeacherCollection();
        var teacher = new Cecilia.Entities.Teacher();
        this.teacherArray = [teacher];
        var self = this;
        sinon.stub(this.teachers, "fetch", function(options){
          return options.success(self.teacherArray);
        }); 
        sinon.stub(Cecilia.Entities, "TeacherCollection").returns(this.teachers);

        var promise = Cecilia.request("user:entities:teachers"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.teachers.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.teacherArray);
          done();
        });
        
        delete this.teachers;
        delete this.teachersArray;
        Cecilia.Entities.TeacherCollection.restore(); 
      });
    });

    describe("user:entities:staff request", function(){
      it("should fetch staff", function(done){
        this.staff = new Cecilia.Entities.StaffMemberCollection();
        var staffMember = new Cecilia.Entities.StaffMember();
        this.staffMemberArray = [staffMember];
        var self = this;
        sinon.stub(this.staff, "fetch", function(options){
          return options.success(self.staffMemberArray);
        }); 
        sinon.stub(Cecilia.Entities, "StaffMemberCollection").returns(this.staff);

        var promise = Cecilia.request("user:entities:staff"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.staff.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.staffMemberArray);
          done();
        });
        
        //cleanup
        delete this.staff;
        delete this.staffMemberArray;
        Cecilia.Entities.StaffMemberCollection.restore(); 
      });
    });
  });
});

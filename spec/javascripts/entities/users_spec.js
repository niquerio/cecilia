describe("Users entitity", function(){
  describe("Model", function(){
    describe("teacher:entity request", function(){
      it("should fetch Teacher with id", function(done){
        //setup
        this.teacher = new Cecilia.Entities.Teacher
        var self = this;
        sinon.stub(this.teacher, "fetch", function(options){
          return options.success(self.teacher);
        }); 
        sinon.stub(Cecilia.Entities, "Teacher").returns(this.teacher);

        var username = 'blah';
        var promise = Cecilia.request("teacher:entity", username); 
        expect(Cecilia.Entities.Teacher).to.have.been.calledWith({username: username}).once;

        $.when(promise).done(function(fetchedTeacher){
          expect(self.teacher.fetch).to.have.been.called.once;
          expect(fetchedTeacher).to.equal(self.teacher);
          done();
        });
        
        delete this.teacher;
        Cecilia.Entities.Teacher.restore(); 
      });
    });
  });
  describe("Collection", function(){
    describe("user:entities request", function(){
      it("should fetch users", function(done){
        this.users = new Cecilia.Entities.UserCollection();
        var user = new Cecilia.Entities.User();
        this.userArray = [user];
        var self = this;
        sinon.stub(this.users, "fetch", function(options){
          return options.success(self.userArray);
        }); 
        sinon.stub(Cecilia.Entities, "UserCollection").returns(this.users);

        var promise = Cecilia.request("user:entities"); 

        $.when(promise).done(function(fetchedUsers){
          expect(self.users.fetch).to.have.been.called.once;
          expect(fetchedUsers).to.equal(self.userArray);
          done();
        });
        
        delete this.users;
        delete this.userArray;
        Cecilia.Entities.UserCollection.restore(); 
      });
    });
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

    describe("user:entities:teachers:all request", function(){
      it("should fetch all teachers", function(done){
        this.teachers = new Cecilia.Entities.CompleteTeacherCollection();
        var teacher = new Cecilia.Entities.Teacher();
        this.teacherArray = [teacher];
        var self = this;
        sinon.stub(this.teachers, "fetch", function(options){
          return options.success(self.teacherArray);
        }); 
        sinon.stub(Cecilia.Entities, "CompleteTeacherCollection").returns(this.teachers);

        var promise = Cecilia.request("user:entities:teachers:all"); 

        $.when(promise).done(function(fetchedActivities){
          expect(self.teachers.fetch).to.have.been.called.once;
          expect(fetchedActivities).to.equal(self.teacherArray);
          done();
        });
        
        delete this.teachers;
        delete this.teachersArray;
        Cecilia.Entities.CompleteTeacherCollection.restore(); 
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

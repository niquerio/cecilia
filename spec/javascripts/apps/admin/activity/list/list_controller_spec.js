xdescribe("AdminActivityApp.List.Controller", function(){
  describe("listActivities",function(){
    it("displays the activities list in the main region", function(){
    });
    describe("events",function(){
      describe("activity:new", function(){
        it("displays a new activity view in the dialog region", function(){
        });
        describe("successful save of new activity", function(){
          it("adds the new activity to the activity collection", sinon.test(function(){
          }));
        });
      });
      describe("childview:activity:edit", function(){
        it("is displayed in the dialog region", function(){
        });
        describe("successful save of updated activity", function(){
          it("rerenders the childview", sinon.test(function(){
          }));
        });
      });
    });
  });
});

var addTwo = function(a){
  return parseInt(a,10) + 2;
};

describe("addTwo", function(){
  it("should add Two to an integer", function(){
    expect(addTwo(3)).to.equal(5);
  });
  it("should cast strings to integers", function(){
    expect(addTwo('3')).to.equal(5);
  });
});

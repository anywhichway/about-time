var expect, Validator;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	Time = require('../index.js').Time;
	Duration = require('../index.js').Duration;
	TimeSpan = require('../index.js').TimeSpan;
}


describe('Time', function() {
  var name = TestObject.name;
  it('should revive', function(done) {
	  	var result = Time.revive({milliseconds:1});
		expect(result).to.be.instanceof(Time);
	  });
});
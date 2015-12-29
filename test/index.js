var expect, Validator;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	Time = require('../index.js').Time;
	Duration = require('../index.js').Duration;
	TimeSpan = require('../index.js').TimeSpan;
}


describe('Time', function() {
  it('should revive', function() {
	  	var result = Time.revive({milliseconds:1});
		expect(result).to.be.instanceof(Time);
	  });
});
describe('Duration', function() {
	  it('should revive', function() {
		  	var result = Duration.revive({length:1});
			expect(result).to.be.instanceof(Duration);
		  });
	});
describe('TimeSpan', function() {
	  it('should revive', function() {
		  	var result = TimeSpan.revive({starts:1,ends:2});
			expect(result).to.be.instanceof(TimeSpan);
		  });
	});
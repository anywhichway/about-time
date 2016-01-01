var expect, Validator;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	Time = require('../index.js').Time;
	Duration = require('../index.js').Duration;
	TimeSpan = require('../index.js').TimeSpan;
}

describe('Time', function() {
  describe('Construct', function() {
	  it('new Time() should default to now', function() {
		 var now = new Date();
		 var t1 = new Time();
		 var result = t1.milliseconds - now.getTime();
		 expect(result).to.be.within(0,1);
	  });
  });
  it('should revive', function() {
	  	var result = Time.revive({milliseconds:1});
		expect(result).to.be.instanceof(Time);
  });
  it('.revive should throw TypeError if argument is not an instanceof Object', function() {
	  var result;
	  try {
	  	result = Time.revive();
	  } catch(e) {
		  result = e;
	  }
	  expect(result).to.be.instanceof(TypeError);
  });
  it('.revive should throw TypeError if milliseconds is not a real number', function() {
	  var result;
	  try {
	  	result = Time.revive({milliseconds:NaN});
	  } catch(e) {
		  result = e;
	  }
	  expect(result).to.be.instanceof(TypeError);
  });
  it('should stringify', function() {
	  	var result = JSON.stringify(new Time(1));
		expect(result).to.equal('{"milliseconds":1,"precision":"ms"}');
  });
  it('new should support precision', function() {
	  	var result = new Time(1,"Y");
	  	expect(result).to.be.instanceof(Time);
  });
  it('.toPrecision and new should behave the same way', function() {
	  	var t1 = new Time(1,"Y");
	  	var t2 = new Time(1);
	  	t2.toPrecision("Y",true);
	  	expect(t1.milliseconds).to.be.equal(t2.milliseconds);
  });
  it('.toPrecision should validate precision argument', function() {
	  	var result, t1 = new Time(1);
	  	try {
	  		result = t1.toPrecision("y",true);
	  	} catch(e) {
	  		result = e;
	  	}
	  	expect(result).to.be.instanceof(RangeError);
  });
  it('.toPrecision("Y") should result in instance with zero seconds', function() {
	  	var t1 = new Time(1,"Y");
	  	expect(t1.getSeconds()).to.be.equal(0);
  });
  describe('Comparisons',function() {
	  it('.lt should return true if t1 is < t2', function() {
		  	var t1 = new Time(1), t2 = new Time(2);
		  	expect(t1.lt(t2)).to.be.true;
	  });
	  it('.lt should return false if t1 is not < t2', function() {
		  	var t1 = new Time(1), t2 = new Time(1);
		  	expect(t1.lt(t2)).to.be.false;
	  });
	  it('.lte should return true if t1 is <= t2', function() {
		  	var t1 = new Time(1), t2 = new Time(2);
		  	expect(t1.lte(t2)).to.be.true;
	  });
	  it('.lte should return false if t1 is not <= t2', function() {
		  	var t1 = new Time(1), t2 = new Time(0);
		  	expect(t1.lt(t2)).to.be.false;
	  });
	  it('.eq should return true if t1 == t1', function() {
		  	var t1 = new Time(1);
		  	expect(t1.eq(t1)).to.be.true;
	  });
	  it('.eq should return true if t1 == t2', function() {
		  	var t1 = new Time(1), t2 = new Time(1);
		  	expect(t1.eq(t2)).to.be.true;
	  });
	  it('.eq should return false if precisions differ', function() {
		  	var t1 = new Time(1,"Y"), t2 = new Time(1,"M");
		  	expect(t1.eq(t2)).to.be.false;
	  });
	  it('.gte should return true if t1 is >= t2', function() {
		  	var t2 = new Time(1), t1 = new Time(2);
		  	expect(t1.gte(t2)).to.be.true;
	  });
	  it('.gte should return false if t1 is not >= t2', function() {
		  	var t2 = new Time(1), t1 = new Time(0);
		  	expect(t1.gte(t2)).to.be.false;
	  });
	  it('.gt should return true if t1 is > t2', function() {
		  	var t2 = new Time(1), t1 = new Time(2);
		  	expect(t1.gt(t2)).to.be.true;
	  });
	  it('.gt should return false if t1 is not > t2', function() {
		  	var t2 = new Time(1), t1 = new Time(0);
		  	expect(t1.gt(t2)).to.be.false;
	  });
  });
});
describe('Duration', function() {
  describe('Construct', function() {
	  it('new Duration() should default to Infinity', function() {
			 var result = new Duration();
			 expect(result.length).to.be.equal(Infinity);
		  });
  });
  it('should revive', function() {
	  	var result = Duration.revive({length:1});
		expect(result).to.be.instanceof(Duration);
  });
  it('should stringify', function() {
	  	var result = JSON.stringify(new Duration(1));
		expect(result).to.equal('{"count":1,"period":"ms","range":0}');
  });
  describe('properties', function() {
	 var d = new Duration(1,"Y");
	 it('.years should be 1', function() {
		expect(d.years).to.equal(1); 
	 });
	 it('.quarters should be 4', function() {
			expect(d.quarters).to.equal(4); 
	 });
	 it('.months should be 12', function() {
			expect(d.months).to.equal(12); 
	 });
	 it('.weeks should be ' + ((31557600*1000)/(7 * 24 * 60 * 60 * 1000)), function() {
			expect(d.weeks).to.equal((31557600*1000)/(7 * 24 * 60 * 60 * 1000)); 
	 });
	 it('.days should be ' + ((31557600*1000)/(24 * 60 * 60 * 1000)), function() {
			expect(d.days).to.equal((31557600*1000)/(24 * 60 * 60 * 1000)); 
	 });
	 it('.hours should be ' + ((31557600*1000)/(60 * 60 * 1000)), function() {
			expect(d.hours).to.equal((31557600*1000)/(60 * 60 * 1000)); 
	 });
	 it('.minutes should be ' + ((31557600*1000)/(60 * 1000)), function() {
			expect(d.minutes).to.equal((31557600*1000)/(60 * 1000)); 
	 });
	 it('.seconds should be 31557600', function() {
			expect(d.seconds).to.equal(31557600); 
	 });
	 it('.milliseconds should be ' + (31557600*1000), function() {
			expect(d.milliseconds).to.equal(31557600*1000); 
	 });
  });
  describe('Comparisons',function() {
	  var d0 = new Duration(1,"Y");
	  it('.lt should return true if d1 is < d2', function() {
		  	var d1 = new Duration(1), d2 = new Duration(2);
		  	expect(d1.lt(d2)).to.be.true;
		  	expect(d1.lt(d2,"Y")).to.be.true;
		  	expect(d1.lt(d2,"Q")).to.be.true;
		  	expect(d1.lt(d2,"M")).to.be.true;
		  	expect(d1.lt(d2,"D")).to.be.true;
		  	expect(d1.lt(d2,"h")).to.be.true;
		  	expect(d1.lt(d2,"m")).to.be.true;
		  	expect(d1.lt(d2,"s")).to.be.true;
		  	expect(d1.lt(d2,"ms")).to.be.true;
	  });
	  it('.lt should return false if d1 is not < d2', function() {
		  	var d1 = new Duration(1), d2 = new Duration(1);
		  	expect(d1.lt(d2)).to.be.false;
	  });
	  it('.lte should return true if d1 is <= d2', function() {
		  	var d1 = new Duration(1), d2 = new Duration(2);
		  	expect(d1.lte(d2)).to.be.true;
	  });
	  it('.lte should return false if d1 is not <= d2', function() {
		  	var d1 = new Duration(1), d2 = new Duration(0);
		  	expect(d1.lt(d2)).to.be.false;
	  });
	  it('.eq should return true if d1 == d1', function() {
		  	var d1 = new Duration(1);
		  	expect(d1.eq(d1)).to.be.true;
	  });
	  it('.eq should return true if d1 == d2', function() {
		  	var d1 = new Duration(1), d2 = new Duration(1);
		  	expect(d1.eq(d2)).to.be.true;
	  });
	  it('.eq should return false if precisions differ', function() {
		  	var d1 = new Duration(1,"Y"), d2 = new Duration(1,"M");
		  	expect(d1.eq(d2)).to.be.false;
	  });
	  it('.gte should return true if d1 is >= d2', function() {
		  	var d2 = new Duration(1), d1 = new Duration(2);
		  	expect(d1.gte(d2)).to.be.true;
	  });
	  it('.gte should return false if d1 is not >= d2', function() {
		  	var d2 = new Duration(1), d1 = new Duration(0);
		  	expect(d1.gte(d2)).to.be.false;
	  });
	  it('.gt should return true if d1 is > d2', function() {
		  	var d2 = new Duration(1), d1 = new Duration(2);
		  	expect(d1.gt(d2)).to.be.true;
	  });
	  it('.gt should return false if d1 is not > d2', function() {
		  	var d2 = new Duration(1), d1 = new Duration(0);
		  	expect(d1.gt(d2)).to.be.false;
	  });
  });
  describe('Arithmetic', function() {
	 it('+ ',function() {
		var d1 = new Duration(1,"Y"), d2 = new Duration(1,"Y");
		var result = new Duration(d1 + d2);
		expect(result.years).to.be.equal(2);
		expect(result.months).to.be.equal(24);
	 });
	 it('- ',function() {
			var d1 = new Duration(1,"Y"), d2 = new Duration(1,"Y");
			var result = new Duration(d1 - d2);
			expect(result.years).to.be.equal(0);
			expect(result.months).to.be.equal(0);
	 });
	 it('/ ',function() {
			var d1 = new Duration(1,"Y"), d2 = new Duration(6,"M");
			var result = d1 / d2;
			expect(result).to.be.equal(2);
	 });
  });
});
describe('TimeSpan', function() {
 describe('Construct', function() {
	  it('defaults to starts=-Infinity and ends=Infinity', function() {
			 var ts = new TimeSpan();
			 expect(ts.starts).to.be.equal(-Infinity);
			 expect(ts.ends).to.be.equal(Infinity);
	  });
	  it('combines starts and ends', function() {
			 var ts = new TimeSpan(new TimeSpan(-Infinity,new Date()),new TimeSpan(new Date(),Infinity));
			 expect(ts.starts).to.be.equal(-Infinity);
			 expect(ts.ends).to.be.equal(Infinity);
	  });
  });
  it('should revive', function() {
	  	var result = TimeSpan.revive({starts:1,ends:2});
		expect(result).to.be.instanceof(TimeSpan);
  });
  it('.revive should throw TypeError if starts is not a real number', function() {
	  var result;
	  try {
	  	result = TimeSpan.revive({starts:NaN,ends:2});
	  } catch(e) {
		  result = e;
	  }
	  expect(result).to.be.instanceof(TypeError);
  });
  it('.revive should throw TypeError if ends is not a real number', function() {
	  var result;
	  try {
	  	result = TimeSpan.revive({starts:1,ends:NaN});
	  } catch(e) {
		  result = e;
	  }
	  expect(result).to.be.instanceof(TypeError);
  });
  it('should stringify', function() {
	  	var result = JSON.stringify(new TimeSpan(1,2));
		expect(result).to.equal('{"starts":1,"ends":2}');
  });
  describe('Comparisons', function() {
	it('ts1 is adjacentBefore ts2',function() {
			 var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0)), ts2 = new TimeSpan((new Date(2016,0,1,0,0,0,0)).getTime()+1,new Date(2017,0,1,0,0,0,0));
			 expect(ts1.adjacentBefore(ts2)).to.be.true;
	});
	it('ts1 is before ts2',function() {
			 var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0)), ts2 = new TimeSpan((new Date(2016,0,1,0,0,0,0)).getTime()+1,new Date(2017,0,1,0,0,0,0));
			 expect(ts1.adjacent(ts2)).to.equal(-1);
	});
	it('ts1 and ts2 are not adjacent',function() {
		 var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0)), ts2 = new TimeSpan(new Date(2018,0,1,0,0,0,0),new Date(2019,0,1,0,0,0,0));
		 expect(ts1.adjacent(ts2)).to.equal(0);
	});
	it('ts1 is adjacent after ts2 at year level',function() {
		 var ts1 = new TimeSpan(new Date(2017,0,1,0,0,0,0)), ts2 = new TimeSpan(null,new Date(2016,0,1,0,0,0,0));
		 expect(ts1.adjacent(ts2,"Y")).to.equal(1);
	});
	it('ts1 is after ts2',function() {
		 var ts1 = new TimeSpan((new Date(2017,0,1,0,0,0,0)).getTime()+1), ts2 = new TimeSpan(null,new Date(2017,0,1,0,0,0,0));
		 expect(ts1.adjacent(ts2)).to.equal(1);
	});
	it('ts1 is adjacentAfter ts2',function() {
		 var ts1 = new TimeSpan(new Date(2018,0,1,0,0,0,0)), ts2 = new TimeSpan(null,new Date(2017,0,1,0,0,0,0));
		 expect(ts1.adjacentAfter(ts2,"Y")).to.be.true;
	});
	it('ts1 contains ts2', function() {
		var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2018,0,1,0,0,0,0)), ts2 = new TimeSpan(new Date(2016,0,1,0,0,0,0),new Date(2017,0,1,0,0,0,0));
		expect(ts1.contains(ts2)).to.be.true;
	});
	it('ts1 intersects ts2', function() {
		var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2017,0,1,0,0,0,0)), ts2 = new TimeSpan(new Date(2016,0,1,0,0,0,0),new Date(2018,0,1,0,0,0,0));
		expect(ts1.intersects(ts2)).to.be.true;
	});
	it('ts1 disjoint ts2', function() {
		var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0)), ts2 = new TimeSpan(new Date(2017,0,1,0,0,0,0),new Date(2018,0,1,0,0,0,0));
		expect(ts1.disjoint(ts2)).to.be.true;
	});
	it('ts1 coincident ts2', function() {
		var ts1 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0)), ts2 = new TimeSpan(new Date(2015,0,1,0,0,0,0),new Date(2016,0,1,0,0,0,0));
		expect(ts1.coincident(ts2)).to.be.true;
	});
  });
});
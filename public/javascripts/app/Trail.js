define([], function (){
	var Trail = function( loc, color, trailLength ){
    this.color = color;//toxi.color.TColor.newRandom();
    //this.color.setSaturation(0.5);
    this.points = [];
    this.trailLength = trailLength;
    this.points.push(loc);
  };

  Trail.prototype = {
    updateTo: function(location){
      //step locations
      this.points.unshift(location);
      while(this.points.length > this.trailLength){
        this.points.pop();
      }
    }
  };
  return Trail;
});
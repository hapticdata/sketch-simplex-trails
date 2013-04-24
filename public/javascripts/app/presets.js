define([
	'toxi/geom/Vec3D',
	'toxi/color/TColor'
],function ( Vec3D, TColor ){
	return [{
		trailLength: 90,
		lineWidth: 1.25,
		sphereRadius: 50,
		noiseScalar: {
			x: 10,
			y: 0.05,
			z: 0.025
		},
		noiseStep: 0.05,
		rotationSpeed: new Vec3D({
			x: 0.001,
			y: 0.002,
			z: 0.0005
		}),
		bg: TColor.newHex("0B252C"),
		colors: [
			TColor.newHex("852D2E"),
			TColor.newHex("72603B"),
			TColor.newHex("49866B"),
			TColor.newHex("83302F")
		]
	},{
		trailLength: 90,
		lineWidth: 1.25,
		sphereRadius: 300,
		noiseScalar: {
			x: 10,
			y: 0.05,
			z: 0.025
		},
		noiseStep: 0.05,
		rotationSpeed: new Vec3D({
			x: 0.001,
			y: 0.002,
			z: 0.0005
		}),
		bg: TColor.newRGBA(15/255,12/255,31/255,1.0),
		colors: [
			TColor.newRGBA(248/255,237/255,50/255,1.0),
			TColor.newRGBA(125/255,194/255,66/255,1.0),
			TColor.newRGBA(112/255,202/255,222/255,1.0)
		]
	},{
		trailLength: 11,
		lineWidth: 0.5,
		sphereRadius: 200,
		noiseScalar: {
			x: 100,
			y: 0.305,
			z: 0.175
		},
		noiseStep: 0.05,
		rotationSpeed: new Vec3D({
			x: 0.001,
			y: 0.0085,
			z: 0.005
		}),
		bg: TColor.newRGBA(15/255,12/255,31/255,1.0),
		colors: [
			TColor.newRGBA(248/255,237/255,50/255,1.0),
			TColor.newRGBA(125/255,194/255,66/255,1.0),
			TColor.newRGBA(112/255,202/255,222/255,1.0)
		]
	},{
		trailLength: 55,
		lineWidth: 0.25,
		sphereRadius: 275,
		noiseScalar: {
			x: 7.92,
			y: 0.305,
			z: 0.175
		},
		noiseStep: 0.05,
		rotationSpeed: new Vec3D({
			x: 0.001,
			y: 0.0085,
			z: 0.005
		}),
		bg: TColor.newRGBA(15/255,12/255,31/255,1.0),
		colors: [
			TColor.newRGBA(248/255,237/255,50/255,1.0),
			TColor.newRGBA(125/255,194/255,66/255,1.0),
			TColor.newRGBA(112/255,202/255,222/255,1.0)
		]
	},{
		trailLength: 11,
		lineWidth: 1,
		sphereRadius: 210,
		noiseStep: 0.06944444444444445
	}];
});
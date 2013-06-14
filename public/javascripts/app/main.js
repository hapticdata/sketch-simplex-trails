define([
	'jquery',
	'dat/gui/GUI',
	'toxi/geom/Vec3D',
	'toxi/geom/Sphere',
	'toxi/geom/mesh/SurfaceMeshBuilder',
	'toxi/geom/mesh/TriangleMesh',
	'toxi/math/noise/simplexNoise',
	'toxi/processing/ToxiclibsSupport',
	'Processing',
	'./presets',
	'./Trail'
], function( $, datGUI, Vec3D, Sphere, SurfaceMeshBuilder, TriangleMesh, SimplexNoise, ToxiclibsSupport, Processing, presets, Trail ){
	
	var instance,
		options = {
		selectedPreset: 0,
		randomizePreset: function(){
			var i = (Math.floor(Math.random()*presets.length));
			applyPreset(presets[i]);
			return i;
		},
		saveImage: function(){
			window.location.href = g.domElement.toDataURL("image/png");
		},
		toString: function(){
			var output = '{\n';
			for(var prop in this){
				if(typeof this[prop] == 'object' ){
					output += toString.apply(this[prop],[]);
				} else {
					output += '\t'+prop+':\t'+this[prop]+',\n';
				}
			}
			output += '}';
			return output;
		}
	};
	
	function applyPreset(preset){
		for(var prop in preset){
			options[prop] = preset[prop];
		}
	}

	function sketch( p5 ){

		var gui = new datGUI();
		//gui.remember(options);
		gui.add(options,"selectedPreset").options({"one": 0, "two": 1, "three": 2, "four": 3, "five": 4, "six": 5, "seven": 6}).listen().onChange(function(){
			applyPreset(presets[options.selectedPreset]);
            setTrailColors();
		});
		gui.add(options,"trailLength",5,300).step(1).name("Trail Length");
		gui.add(options,"lineWidth",0.25,5).name("Trail Width");
		gui.add(options,"sphereRadius",10,400).name("Sphere Radius");
		var f1 = gui.addFolder('Noise');
		f1.add(options.noiseScalar,"x",1,100).name("Radius");
		f1.add(options.noiseScalar,"y",0,0.5).name("Azimuth");
		f1.add(options.noiseScalar,"z",0,0.5).name("Zenith");
		f1.add(options,"noiseStep",0,0.25).name("Step");
		f1.open();
		var f2 = gui.addFolder('Rotation Speed');
		f2.add(options.rotationSpeed,"x",0,0.05).name("X");
		f2.add(options.rotationSpeed,"y",0,0.05).name("Y");
		f2.add(options.rotationSpeed,"z",0,0.05).name("Z");
		var trails = [],
			gfx = new ToxiclibsSupport(p5),
			rotation = new Vec3D(),
			noiseOffset = 100;
		
		var initTrails = function(){
			//starting shape is based off a sphere
			var sphere = new Sphere(options.sphereRadius);
			var mesh = sphere.toMesh({
				mesh: new TriangleMesh('sphere'),
				resolution: 10
			});

			var i = 0,
				len = mesh.vertices.length;
			for(i = 0; i < len; i++){
				var color = options.colors[Math.floor(Math.random()*options.colors.length)];
				trails.push( new Trail(mesh.vertices[i],color, options.trailLength) );
			}
		};

        var setTrailColors = function(){
            trails.forEach(function(trail){
                trail.color = options.colors[Math.floor(Math.random()*options.colors.length)];
            });
        };

        var setSize = function(){	
		    p5.size(Math.max(700,window.innerWidth),Math.max(700,window.innerHeight),p5.OPENGL);
		};
        setSize();
        $(window).on('resize', setSize);
        p5.colorMode(p5.RGB,1);
		p5.background(options.bg.red(),options.bg.green(),options.bg.blue());
		p5.noFill();
		p5.stroke(1,0.25);
		//p5.noStroke();

		initTrails();

		p5.draw = function(){
			p5.strokeWeight(options.lineWidth);
			var i = 0,
				len = trails.length;
			p5.pushMatrix();
			p5.translate(p5.width/2,p5.height/2);
			p5.rotateX(rotation.x);
			p5.rotateY(rotation.y);
			p5.rotateZ(rotation.z);
			p5.colorMode(p5.RGB,1);
			p5.background(options.bg.red(),options.bg.green(),options.bg.blue());
			
			for(i = 0; i < len; i++){
				var t = trails[i];
				p5.stroke(t.color.red(),t.color.green(),t.color.blue(),0.8);
				//var p = trails[i].points[0];
				//p5.point(p.x,p.y,p.z);
				gfx.lineStrip3D(t.points);
				//gfx.lineStrip3D(window.points);
				var v = t.points[0].copy();
				v.toSpherical();
				v.x =  options.sphereRadius + SimplexNoise.noise(0,p5.frameCount * 0.01, i * options.noiseStep + noiseOffset) * options.noiseScalar.x;
				v.z += SimplexNoise.noise(i * options.noiseStep + noiseOffset, p5.frameCount * 0.01) * options.noiseScalar.z;
				v.y += SimplexNoise.noise(0,p5.frameCount * 0.01, i * options.noiseStep + noiseOffset) * options.noiseScalar.y;
				v.toCartesian();
				trails[i].trailLength = options.trailLength;
				trails[i].updateTo(v);
			}
			rotation.addSelf(options.rotationSpeed,false);
			noiseOffset += options.noiseStep / 2;
			p5.popMatrix();
		};
		
		p5.mousePressed = function(){
			var selected = options.selectedPreset;
			while(selected == options.selectedPreset){
				selected = Math.floor(Math.random()*presets.length);
			}
			options.selectedPreset = selected;
			//gui.preset = 'Preset '+selected;
			applyPreset(presets[selected]);
            setTrailColors();
		};
	}

	return function app( container ){

		applyPreset(presets[0]);
		var canvas = document.createElement('canvas');
		container.appendChild( canvas );
		instance = new Processing( canvas, sketch );
		instance.externals.context.antialias = true;
		//var gl = canvas.getContext('experimental-webgl');
		//gl.preserveDrawingBuffer = true;
	};
});

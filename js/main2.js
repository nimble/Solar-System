/* CP411 Solar System Project
1. User controlled 3D Rendering [10](no)
2. Texture mapping [10] (yes)
3. User controlled Lighting [10] (yes)
4. User controlled Animations [10] (no)
5. User controlled navigation [10] (yes)
6. User controlled display of relevant information for the user [10] (no)
7. Easy of use [10] (yes)
8. Aesthetically pleasing [10] (yes)
9. Additional features for teaching [20] (idk)*/

// Standard Variables / To be changed later.
var scene, camera, renderer
var W, H;
var delta = 1.; //Math.delta;
var check1 = true;
var check2 = true;

W = parseInt(window.innerWidth);
H = parseInt(window.innerHeight);

// Camera Position
camera = new THREE.PerspectiveCamera(45, W / H, 1, 100000000);

camera.position.z = 80000;
camera.position.y = 120000;
camera.position.x = 80000;


scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(W, H);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


document.body.appendChild(renderer.domElement);

// Adding Stars.
var starsGeometry = new THREE.Geometry();
var starsMaterial = new THREE.PointsMaterial({
    color: 0xbbbbbbb,
    opacity: 0.6,
    size: 1,
    sizeAttenuation: false
});
var stars;

// Adding stars to the Scene.
for (var i = 0; i < 1000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(15000);
    starsGeometry.vertices.push(vertex);
}

stars = new THREE.Points(starsGeometry, starsMaterial);
stars.scale.set(50, 50, 50);
scene.add(stars);


// ------------------------------------------------------------
var starsGeometry2 = new THREE.Geometry();
var starsMaterial2 = new THREE.PointsMaterial({
    color: 0xbbbbbbb,
    opacity: 1,
    size: 1,
    sizeAttenuation: false
});
var stars2;

// Adding stars to the Scene.
for (var i = 0; i < 10000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(7000);
    starsGeometry2.vertices.push(vertex);
}

stars2 = new THREE.Points(starsGeometry2, starsMaterial2);
stars2.scale.set(70, 150, 100);
scene.add(stars2);

var intensity = 0.2;
lights1 = new THREE.AmbientLight(0xffffff,intensity);
lights2 = new THREE.PointLight(0xffffff,0.8,1000000,0.25);
lights2.shadow.mapSize.width = 512;  // default
lights2.shadow.mapSize.height = 512; // default
lights2.shadow.camera.near = 0.5;       // default
lights2.shadow.camera.far = 500
lights2.position.set = (0,0,0); // Center of the sun.
scene.add(lights1);
scene.add(lights2);
// Solar System Models Added Here.
// ---------------------------------------------------------
const loader = new THREE.TextureLoader();
//Sun
var sun_geom = new THREE.SphereGeometry(8000, 80, 80);
var sun_material = new THREE.MeshPhongMaterial({
    emissiveMap: loader.load('images/sun.jpg'),
    emissive: 0xffffff
});
var sun = new THREE.Mesh(sun_geom, sun_material);
// SUN GLOW
var spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.ImageUtils.loadTexture("images/sunlight3.png"),
    useScreenCoordinates: false,
    color: 0xffffee,
    transparent: false,
    blending: THREE.AdditiveBlending
});
var sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(29000, 29000, 29000);
sun.add(sprite); // This centers the glow at the sun.

var spriteMaterial2 = new THREE.SpriteMaterial({
    map: new THREE.ImageUtils.loadTexture("images/sunlight2.jpg"),
    useScreenCoordinates: false,
    color: 0xffffee,
    transparent: false,
    blending: THREE.AdditiveBlending
});
var sprite2 = new THREE.Sprite(spriteMaterial2);
sprite2.scale.set(26000, 26000, 26000);
sun.add(sprite2); // This centers the glow at the sun.

scene.add(sun);

//Mercury
var mercury_geom = new THREE.SphereGeometry(400, 80, 80);
var mercury_material = new THREE.MeshPhongMaterial({
  /*emissive: 0xffffff,
  emissiveMap: loader.load('images/mercurymap.jpg'),
  bumpMap: loader.load('images/mercurybump.jpg'),
  bumpScale: 0.005,*/
  map	: THREE.ImageUtils.loadTexture('images/mercurymap.jpg'),
	bumpMap	: THREE.ImageUtils.loadTexture('images/mercurybump.jpg'),
	bumpScale: 0.005,
});
var mercury = new THREE.Mesh(mercury_geom, mercury_material);
mercury.position.set(3500, 0, 0);
scene.add(mercury);

//Mercury Orbit
var m_geometry = new THREE.TorusGeometry( 10000, 40, 16, 100 );
var m_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var mer_torus = new THREE.Mesh( m_geometry, m_material );
mer_torus.rotation.x = Math.PI / 2;
scene.add(mer_torus);

// Venus
var venus_geom = new THREE.SphereGeometry(800, 80, 80);
var venus_material = new THREE.MeshPhongMaterial({
  /*emissive: 0xffffff,
  emissiveMap: loader.load('images/venusmap.jpg'),
  bumpMap: loader.load('images/venusbump.jpg'),
  bumpScale: 0.005,*/
  map	: THREE.ImageUtils.loadTexture('images/venusmap.jpg'),
	bumpMap	: THREE.ImageUtils.loadTexture('images/venusbump.jpg'),
	bumpScale: 0.005,
});
var venus = new THREE.Mesh(venus_geom, venus_material);
venus.position.set(6000, 0, 0);
scene.add(venus);

//Venus Orbit
var v_geometry = new THREE.TorusGeometry( 14000, 40, 16, 100 );
var v_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var v_torus = new THREE.Mesh( v_geometry, v_material );
v_torus.rotation.x = Math.PI / 2;
scene.add(v_torus);

// MOON
var moon = new THREE.Mesh(
    new THREE.SphereGeometry(250, 80, 80),
    new THREE.MeshPhongMaterial({
      /*
        emissiveMap: loader.load('images/moonmap4k.jpg'),
        emissive: 0xffffff,
        bumpMap: loader.load('images/moonbump4k.jpg'),
        bumpScale: 0.005,*/
        map	: THREE.ImageUtils.loadTexture('images/moonmap4k.jpg'),
    		bumpMap	: THREE.ImageUtils.loadTexture('images/moonbump4k.jpg'),
    		bumpScale: 0.002,

    })
);

scene.add(moon)


// Earth.
var earth_geom = new THREE.SphereGeometry(900, 80, 80);
var earth_material = new THREE.MeshPhongMaterial({
  /*
    emissive: 0xffffff,
    shading: THREE.FlatShading,
    emissiveMap: loader.load('images/earthmap1k.jpg')*/
    map		: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
	//	bumpMap		: THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
	//	bumpScale	: 0.05,
    shading: THREE.FlatShading,
	//	specularMap	: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
		//specular	: new THREE.Color('grey'),
});
var earth = new THREE.Mesh(earth_geom, earth_material);
/*earth.position.set(8500, 0, 0);
// EARTH CLOUDS
function createClouds() {
    return new THREE.Mesh(
        new THREE.SphereGeometry(800, 80, 80),
        new THREE.MeshPhongMaterial({
            map: loader.load('images/fair_clouds_8k.jpg'),
            transparent: true,
        })
    );
}
earth.position.set(8500, 0, 0);
earth.add(createClouds());*/
scene.add(earth);

//Earth Orbit
var e_geometry = new THREE.TorusGeometry( 19000, 40, 16, 100 );
var e_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var e_torus = new THREE.Mesh( e_geometry, e_material );
e_torus.rotation.x = Math.PI / 2;
scene.add(e_torus);

// Mars
var mars_geom = new THREE.SphereGeometry(750, 80, 80);
var mars_material = new THREE.MeshPhongMaterial({
  /*
  emissive: 0xffffff,
  emissiveMap: loader.load('images/marsmap1k.jpg'),
  bumpMap: loader.load('images/marsbump1k.jpg'),
  bumpScale: 0.005,*/
  map	: THREE.ImageUtils.loadTexture('images/marsmap1k.jpg'),
	bumpMap	: THREE.ImageUtils.loadTexture('images/marsbump1k.jpg'),
	bumpScale: 0.05,
});
var mars = new THREE.Mesh(mars_geom, mars_material);
mars.position.set(11000, 0, 0);
scene.add(mars);

//Mars Orbit
var m_geometry = new THREE.TorusGeometry( 23000, 40, 16, 100 );
var m_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var m_torus = new THREE.Mesh( m_geometry, m_material );
m_torus.rotation.x = Math.PI / 2;
scene.add(m_torus);

// Jupiter
var jupiter_geom = new THREE.SphereGeometry(2500, 80, 80);
/*
var jupiter_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    flatShading: true,
    emissiveMap: loader.load('images/jupitermap.jpg')
});*/
  var texture	= THREE.ImageUtils.loadTexture('images/jupitermap.jpg')
	var jupiter_material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.02,
	})
var jupiter = new THREE.Mesh(jupiter_geom, jupiter_material);
jupiter.position.set(13500, 0, 0);
scene.add(jupiter);

//Jupiter Orbit
var j_geometry = new THREE.TorusGeometry( 31000, 40, 16, 100 );
var j_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var j_torus = new THREE.Mesh( j_geometry, j_material );
j_torus.rotation.x = Math.PI / 2;
scene.add(j_torus);

// Saturn
var saturn_geom = new THREE.SphereGeometry(2000, 80, 80);
/*
var saturn_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/saturnmap.jpg')
});*/
var texture	= THREE.ImageUtils.loadTexture('images/saturnmap.jpg')
	var saturn_material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
var saturn = new THREE.Mesh(saturn_geom, saturn_material);
saturn.position.set(16000, 0, 0);
scene.add(saturn);

//Saturn Orbit
var s_geometry = new THREE.TorusGeometry( 40000, 40, 16, 100 );
var s_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var s_torus = new THREE.Mesh( s_geometry, s_material );
s_torus.rotation.x = Math.PI / 2;
scene.add(s_torus);

//Saturn Ring
var radius = 2000;
var segments = 100;
function createSaturnRings(radius, segments) {
    return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2),
    new THREE.MeshBasicMaterial({
        map: loader.load('images/saturn-rings-2.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    }));
}
var saturnRing = createSaturnRings(radius,segments);
saturnRing.position.set(6000, 0, 0);
scene.add(saturnRing);

// Uranus
var uranus_geom = new THREE.SphereGeometry(1800, 80, 80);
/*var uranus_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/uranusmap.jpg')
});*/
var texture	= THREE.ImageUtils.loadTexture('images/uranusmap.jpg')
var uranus_material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
var uranus = new THREE.Mesh(uranus_geom, uranus_material);
uranus.position.set(18500, 0, 0);
scene.add(uranus);

//Uranus Orbit
var u_geometry = new THREE.TorusGeometry( 50000, 40, 16, 100 );
var u_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var u_torus = new THREE.Mesh( u_geometry, u_material );
u_torus.rotation.x = Math.PI / 2;
scene.add(u_torus);

// URANUS RING
var radius1 = 1800;
var segments1 = 100;
function createUranusRings(radius1, segments1) {
    return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius1, 2 * radius1, 2 * segments1, 5, 0, Math.PI * 2),
    new THREE.MeshBasicMaterial({
        map: loader.load('images/uranusringcolour.jpg'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    }));
}
var uranusRing = createUranusRings(radius1,segments1);
uranusRing.position.set(22000, 0, 0);
scene.add(uranusRing);

// Neptune
var neptune_geom = new THREE.SphereGeometry(900, 80, 80);
/*var neptune_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/neptunemap.jpg')
});*/
var texture	= THREE.ImageUtils.loadTexture('images/neptunemap.jpg')
var neptune_material	= new THREE.MeshPhongMaterial({
	map	: texture,
	bumpMap	: texture,
	bumpScale: 0.05,
})
var neptune = new THREE.Mesh(neptune_geom, neptune_material);
neptune.position.set(21000, 0, 0);
scene.add(neptune);

//Neptune Orbit
var n_geometry = new THREE.TorusGeometry( 60000, 40, 16, 100 );
var n_material = new THREE.MeshBasicMaterial( { color: 0xA8A8A8 } );
var n_torus = new THREE.Mesh( n_geometry, n_material );
n_torus.rotation.x = Math.PI / 2;
scene.add(n_torus);

//----------------------------------------------------------------
var t = 0;
var yx = 0;
setupGui();
//Gui
function setupAmb(check1)
{
  if (check1 == false)
  {
    lights1.visible = false;
  }
  else
  {
    lights1.visible = true;
  }
}

function setupPnt(check2)
{
  if (check2 == false)
  {
    lights2.visible = false;
  }
  else
  {
    lights2.visible = true;
  }
}
function setupGui() {
  gui = new dat.GUI;
  controllers = [];

  var menu = {
    'NoAmbientLight': false,
    'NoPointLight': false,
  }

  controllers[0] = gui
    .add(menu, 'NoAmbientLight')
    .listen()
    .onFinishChange(
        function(value) {
            check1 = !check1;
            setupAmb(check1)
        }
      );
    controllers[0] = gui
      .add(menu, 'NoPointLight')
      .listen()
      .onFinishChange(
          function(value) {
              check2 = !check2;
              setupPnt(check2)
          }
    );
}
function render() {
  renderer.render(scene, camera);
}

controls = new THREE.OrbitControls(camera, renderer.domElement);

animate();

function animate() {
    requestAnimationFrame(animate);

    // Sun remains centered while rest of the planets rotate.
    sun.rotation.y += 0.001;

    mercury.rotation.y += 0.002;
    mercury.position.x = Math.sin(t * 1) * 10000;
    mercury.position.z = Math.cos(t * 1) * 10000;

    venus.rotation.y += 0.002;
    venus.position.x = Math.sin(t * 0.8) * 14000;
    venus.position.z = Math.cos(t * 0.8) * 14000;

    earth.rotation.y += 0.002;
    earth.position.x = Math.sin(t * 0.59) * 19000;
    earth.position.z = Math.cos(t * 0.59) * 19000;

    // Moon Rotation
    moon.rotation.y += 0.002;
    moon.position.x = Math.sin(t * 0.58) * 19000;
    moon.position.z = Math.cos(t * 0.58) * 19000;

    mars.rotation.y += 0.002;
    mars.position.x = Math.sin(t * 0.5) * 23000;
    mars.position.z = Math.cos(t * 0.5) * 23000;

    jupiter.rotation.y += 0.002;
    jupiter.position.x = Math.sin(t * 0.3) * 31000;
    jupiter.position.z = Math.cos(t * 0.3) * 31000;

    saturn.rotation.y += 0.002;
    saturn.position.x = Math.sin(t * 0.2) * 40000;
    saturn.position.z = Math.cos(t * 0.2) * 40000;

    // Saturn Ring Rotation
    saturnRing.rotation.y += 0.002;
    saturnRing.position.x = Math.sin(t * 0.2) * 40000;
    saturnRing.position.z = Math.cos(t * 0.2) * 40000;

    uranus.rotation.y += 0.002;
    uranus.position.x = Math.sin(t * 0.13) * 50000;
    uranus.position.z = Math.cos(t * 0.13) * 50000;

    // Uranus Ring Rotation
    uranusRing.rotation.y += 0.002;
    uranusRing.position.x = Math.sin(t * 0.13) * 50000;
    uranusRing.position.z = Math.cos(t * 0.13) * 50000;

    neptune.rotation.y += 0.002;
    neptune.position.x = Math.sin(t * 0.1) * 60000;
    neptune.position.z = Math.cos(t * 0.1) * 60000;

    t += Math.PI / 180 * 2;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    controls.update();
}
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

// SUN INTERACTION
domEvents.addEventListener(sun, 'click', event=>{
    window.alert("Sun");
})

// MERCURY INTERACTION
domEvents.addEventListener(mercury, 'click', event=>{
    window.alert("Mercury");
})

// MARS INTERACTION
domEvents.addEventListener(mars, 'click', event=>{
    window.alert("Mars");
})

// EARTH INTERACTION
domEvents.addEventListener(earth, 'click', event=>{
    window.alert("Earth");
})

// MOON INTERACTION
domEvents.addEventListener(moon, 'click', event=>{
    window.alert("Moon");
})


// VENUS INTERACTION
domEvents.addEventListener(venus, 'click', event=>{
    window.alert("Venus");
})


// JUPITER INTERACTION
domEvents.addEventListener(jupiter, 'click', event=>{
    window.alert("Jupiter");
})

// SATURN INTERACTION
domEvents.addEventListener(saturn, 'click', event=>{
    window.alert("Saturn");
})

// URANUS INTERACTION
domEvents.addEventListener(uranus, 'click', event=>{
    window.alert("Uranus");
})

// NEPTUNE INTERACTION
domEvents.addEventListener(neptune, 'click', event=>{
    window.alert("Neptune");
})

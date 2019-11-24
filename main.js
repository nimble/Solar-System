// Standard Variables / To be changed later.
var scene, camera, renderer 
var W, H;
var delta = 1.; //Math.delta;

W = parseInt(window.innerWidth);
H = parseInt(window.innerHeight);

// Camera Position
camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000000);
camera.position.z = 36300;
scene = new THREE.Scene();

// renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(W, H);
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
for (var i = 0; i < 45000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(7000);
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

// Ambient light to the Scene.
var ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);


// Solar System Models Added Here.
// ---------------------------------------------------------
const loader = new THREE.TextureLoader();

//Sun
var sun_geom = new THREE.SphereGeometry(2300, 80, 80);
var sun_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/sun.jpg'),
});
var sun = new THREE.Mesh(sun_geom, sun_material);

scene.add(sun);


// Earth.
var earth_geom = new THREE.SphereGeometry(1000, 80, 80);
var earth_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/earthmap1k.jpg')
});
var earth = new THREE.Mesh(earth_geom, earth_material);
earth.position.set(8500, 0, 0);

scene.add(earth);


// Moon 
var moon_geom = new THREE.SphereGeometry(500, 50, 50);
var moon_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/moonmap1k.jpg')
});
var moon = new THREE.Mesh(moon_geom, moon_material);
moon.position.set(10000, 5000, 0);

scene.add(moon);

// Mercury
var mercury_geom = new THREE.SphereGeometry(1000,80,80);
var mercury_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/mercurymap.jpg')
});
var mercury = new THREE.Mesh(mercury_geom, mercury_material);
mercury.position.set(3500, 0, 0);

scene.add(mercury);


// Venus
var venus_geom = new THREE.SphereGeometry(1000,80,80);
var venus_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/venusmap.jpg')
});
var venus = new THREE.Mesh(venus_geom, venus_material);
venus.position.set(6000, 0, 0);

scene.add(venus);

// Mars
var mars_geom = new THREE.SphereGeometry(1000,80,80);
var mars_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/mars_1k_color.jpg')
});
var mars = new THREE.Mesh(mars_geom, mars_material);
mars.position.set(11000, 0, 0);

scene.add(mars);

// Jupiter
var jupiter_geom = new THREE.SphereGeometry(1000,80,80);
var jupiter_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/jupitermap.jpg')
});
var jupiter = new THREE.Mesh(jupiter_geom, jupiter_material);
jupiter.position.set(13500, 0, 0);

scene.add(jupiter);


// Saturn
var saturn_geom = new THREE.SphereGeometry(1000,80,80);
var saturn_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/saturnmap.jpg')
});
var saturn = new THREE.Mesh(saturn_geom, saturn_material);
saturn.position.set(16000, 0, 0);

scene.add(saturn);

// Saturn Ring
/*
var ring_geo = new THREE.RingGeometry(1000,5,32);
var ring_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/saturnringcolor.jpg'),
    side: THREE.DoubleSide
});
var saturnRing = new THREE.Mesh(ring_geo, ring_material);
saturnRing.position.set(20000, 0, 0);

scene.add(saturnRing);
*/

// Uranus
var uranus_geom = new THREE.SphereGeometry(1000,80,80);
var uranus_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/uranusmap.jpg')
});
var uranus = new THREE.Mesh(uranus_geom, uranus_material);
uranus.position.set(18500, 0, 0);

scene.add(uranus);

// Neptune
var neptune_geom = new THREE.SphereGeometry(1000,80,80);
var neptune_material = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/neptunemap.jpg')
});
var neptune = new THREE.Mesh(neptune_geom, neptune_material);
neptune.position.set(21000, 0, 0);

scene.add(neptune);



//----------------------------------------------------------------

var t = 0;
var yx = 0;

document.addEventListener('mousemove', function (event) {
    yx = parseInt(event.offsetY);

});

// Call Animate function within load function.

animate();

function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.001;
    earth.rotation.y += 0.002;
    moon.rotation.y += 0.002;
    mercury.rotation.y+= 0.002;
    venus.rotation.y+=0.002;
    mars.rotation.y +=0.002;
    jupiter.rotation.y +=0.002;
    saturn.rotation.y +=0.002;
    uranus.rotation.y +=0.002;
    neptune.rotation.y +=0.002;


    //earth.rotation.y += 1 / 16 * delta;

    // Uncomment to move screen with cursor.
    //camera.position.y = yx * 5;

    //t += Math.PI / 180 * 2;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

// everything now within `onload`
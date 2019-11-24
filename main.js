// Standard Variables / To be changed later.
var scene, camera, renderer //, container;
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




// ------------------------------------------------------------
const loader = new THREE.TextureLoader();


//Sun
var sun, gun_geom, sun_mat;
sun_geom = new THREE.SphereGeometry(2300, 80, 80);
sun_mat = new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('sunmap.jpg'),
});
sun = new THREE.Mesh(sun_geom, sun_mat);
scene.add(sun);


var geometry = new THREE.SphereGeometry(2300, 80, 80);
var texture2 = loader.load('https://i.imgur.com/BpldqPj.jpg');

var material = new THREE.MeshPhongMaterial({
    emissiveMap: texture2,
    emissive: 0xffffff,
});
var earth = new THREE.Mesh(geometry, material);
earth.position.set(5000, 0, 0);

scene.add(earth);

var t = 0;



document.addEventListener('mousemove', function (event) {
    y = parseInt(event.offsetY);

});

// Call Animate function within load function.

animate();

function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.001;
    earth.rotation.y += 1 / 16 * delta;

    //camera.position.y = y * 5;
    camera.lookAt(scene.position);


    t += Math.PI / 180 * 2;

    renderer.render(scene, camera);
}

// everything now within `onload`
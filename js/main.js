/* CP411 Solar System Project
1. User controlled 3D Rendering [10]
2. Texture mapping [10]
3. User controlled Lighting [10]
4. User controlled Animations [10]
5. User controlled navigation [10]
6. User controlled display of relevant information for the user [10]
7. Easy of use [10]
8. Aesthetically pleasing [10]
9. Additional features for teaching [20] */

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



// ---------------------------------------------------------
// PLANET LIGHTNING CHECK DONE HERE.
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
// ---------------------------------------------------------
// SOLAR SYSTEM PLANETS IMPLEMENTED HERE

const loader = new THREE.TextureLoader();

// SUN
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

// SUN GLOW 2
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


// MOON 
var moon = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        map	: THREE.ImageUtils.loadTexture('images/moonmap4k.jpg'),
        bumpMap	: THREE.ImageUtils.loadTexture('images/moonbump4k.jpg'),
        bumpScale: 0.005,
    })
);
moon.position.set(10000, 0, 0)
scene.add(moon)


// EARTH.

var earth = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
        bumpMap: new THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
        bumpScale: 0.05,
        specularMap: new THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
        specular: new THREE.Color('grey'),
    })
);


// EARTH CLOUDS
var earthClouds = new THREE.Mesh(
        new THREE.SphereGeometry(1000, 80, 80),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/earthcloudmap.jpg'),
            transparent: true,
        })
    
);
//scene.add(earthClouds);
scene.add(earth);


// EARTH ORBIT
var e_geometry = new THREE.TorusGeometry(19000, 40, 16, 100);
var e_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var e_torus = new THREE.Mesh(e_geometry, e_material);
e_torus.rotation.x = Math.PI / 2;
scene.add(e_torus);


// MERCURY

var mercury = new THREE.Mesh(
    new THREE.SphereGeometry(400, 80, 80),
    new THREE.MeshPhongMaterial({
        map	: THREE.ImageUtils.loadTexture('images/mercurymap.jpg'),
        bumpMap	: THREE.ImageUtils.loadTexture('images/mercurybump.jpg'),
        bumpScale: 0.005,
    })
);

mercury.position.set(3500, 0, 0);

scene.add(mercury);

// MERCURY ORBIT

var m_geometry = new THREE.TorusGeometry(10000, 40, 16, 100);
var m_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var mer_torus = new THREE.Mesh(m_geometry, m_material);
mer_torus.rotation.x = Math.PI / 2;
scene.add(mer_torus);


// VENUS

var venus = new THREE.Mesh(
    new THREE.SphereGeometry(800, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/venusmap.jpg'),
        bumpMap: new THREE.ImageUtils.loadTexture('images/venusbump.jpg'),
        bumpScale: 0.005,
    })
);
venus.position.set(6000, 0, 0);
scene.add(venus);

// VENUS ORBIT
var v_geometry = new THREE.TorusGeometry(14000, 40, 16, 100);
var v_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var v_torus = new THREE.Mesh(v_geometry, v_material);
v_torus.rotation.x = Math.PI / 2;
scene.add(v_torus);



// MARS

var mars = new THREE.Mesh(
    new THREE.SphereGeometry(750, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/marsmap1k.jpg'),
        bumpMap: new THREE.ImageUtils.loadTexture('images/marsbump1k.jpg'),
        bumpScale: 0.005,
    })
);

mars.position.set(11000, 0, 0);
scene.add(mars);


// MARS ORBIT
var m_geometry = new THREE.TorusGeometry(23000, 40, 16, 100);
var m_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var m_torus = new THREE.Mesh(m_geometry, m_material);
m_torus.rotation.x = Math.PI / 2;
scene.add(m_torus);



// JUPITER 
var jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(2500, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/jupitermap.jpg')
    })
);

jupiter.position.set(13500, 0, 0);
scene.add(jupiter);


// JUPITER ORBIT
var j_geometry = new THREE.TorusGeometry(31000, 40, 16, 100);
var j_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var j_torus = new THREE.Mesh(j_geometry, j_material);
j_torus.rotation.x = Math.PI / 2;
scene.add(j_torus);



// SATURN
var saturn = new THREE.Mesh(
    new THREE.SphereGeometry(2000, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/saturnmap.jpg')
    })
);
saturn.position.set(16000, 0, 0);
scene.add(saturn);

// SATURN ORBIT
var s_geometry = new THREE.TorusGeometry(40000, 40, 16, 100);
var s_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var s_torus = new THREE.Mesh(s_geometry, s_material);
s_torus.rotation.x = Math.PI / 2;
scene.add(s_torus);


// SATURN RING

var radius = 2000;
var segments = 100;

function createSaturnRings(radius, segments) {
    return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2),
        new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('images/saturn-rings-2.png'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6
        }));
}
var saturnRing = createSaturnRings(radius, segments);
saturnRing.position.set(6000, 0, 0);

scene.add(saturnRing);


// URANUS
var uranus = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture('images/uranusmap.jpg')
    })
);
uranus.position.set(18500, 0, 0);
scene.add(uranus);


// URANUS RING

var radius1 = 800;
var segments1 = 100;

function createUranusRings(radius1, segments1) {
    return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius1, 2 * radius1, 2 * segments1, 5, 0, Math.PI * 2),
        new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('images/uranusringcolour.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6
        }));
}
var uranusRing = createUranusRings(radius1, segments1);

uranusRing.position.set(22000, 0, 0);
scene.add(uranusRing);



// URANUS ORBIT
var u_geometry = new THREE.TorusGeometry(50000, 40, 16, 100);
var u_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var u_torus = new THREE.Mesh(u_geometry, u_material);
u_torus.rotation.x = Math.PI / 2;
scene.add(u_torus);



// NEPTUNE
var neptune = new THREE.Mesh(
    new THREE.SphereGeometry(900, 80, 80),
    new THREE.MeshPhongMaterial({
        emissiveMap: new THREE.ImageUtils.loadTexture('images/neptunemap.jpg')
    })
);

neptune.position.set(21000, 0, 0);
scene.add(neptune);


// NEPTUNE ORBIT
var n_geometry = new THREE.TorusGeometry(60000, 40, 16, 100);
var n_material = new THREE.MeshBasicMaterial({
    color: 0xA8A8A8
});
var n_torus = new THREE.Mesh(n_geometry, n_material);
n_torus.rotation.x = Math.PI / 2;
scene.add(n_torus);

// ---------------------------------------------------------------
var t = 0;
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
//----------------------------------------------------------------


// Controls using Mouse and Keys.
controls = new THREE.OrbitControls(camera, renderer.domElement);

animate();

function animate() {
    requestAnimationFrame(animate);

    // Sun remains centered while rest of the planets rotate.
    sun.rotation.y += 0.001;

    // Mercury
    mercury.rotation.y += 0.002;
    mercury.position.x = Math.sin(t * 1) * 10000;
    mercury.position.z = Math.cos(t * 1) * 10000;

    // Venus
    venus.rotation.y += 0.002;
    venus.position.x = Math.sin(t * 0.8) * 14000;
    venus.position.z = Math.cos(t * 0.8) * 14000;

    // Earth 
    earth.rotation.y += 0.002;
    earth.position.x = Math.sin(t * 0.59) * 19000;
    earth.position.z = Math.cos(t * 0.59) * 19000;

    // Earth Clouds
    earthClouds.rotation.y += 0.002;
    earthClouds.position.x = Math.sin(t * 0.59) * 19000;
    earthClouds.position.z = Math.cos(t * 0.59) * 19000;

    // Moon Rotation
    moon.rotation.y += 0.002;
    moon.position.x =earth.position.x * Math.sin(t * 0.59) * 19000;
    moon.position.z =earth.position.z * Math.sin(t * 0.59) * 19000;

    // Mars Rotation
    mars.rotation.y += 0.002;
    mars.position.x = Math.sin(t * 0.5) * 23000;
    mars.position.z = Math.cos(t * 0.5) * 23000;

    // Jupiter
    jupiter.rotation.y += 0.002;
    jupiter.position.x = Math.sin(t * 0.3) * 31000;
    jupiter.position.z = Math.cos(t * 0.3) * 31000;

    // Saturn
    saturn.rotation.y += 0.002;
    saturn.position.x = Math.sin(t * 0.2) * 40000;
    saturn.position.z = Math.cos(t * 0.2) * 40000;

    // Saturn Ring Rotation
    saturnRing.rotation.y += 0.002;
    saturnRing.position.x = Math.sin(t * 0.2) * 40000;
    saturnRing.position.z = Math.cos(t * 0.2) * 40000;

    // Uranus 
    uranus.rotation.y += 0.002;
    uranus.position.x = Math.sin(t * 0.13) * 50000;
    uranus.position.z = Math.cos(t * 0.13) * 50000;

    // Uranus Ring Rotation
    uranusRing.rotation.y += 0.002;
    uranusRing.position.x = Math.sin(t * 0.13) * 50000;
    uranusRing.position.z = Math.cos(t * 0.13) * 50000;

    // Neptune
    neptune.rotation.y += 0.002;
    neptune.position.x = Math.sin(t * 0.1) * 60000;
    neptune.position.z = Math.cos(t * 0.1) * 60000;

    t += Math.PI / 180 * 2;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    controls.update();
}


// INTERACTING WITH MODELS
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

// SUN INTERACTION
domEvents.addEventListener(sun, 'click', event=>{
    Swal.fire({
        title: 'Sun',
        confirmButtonColor: '#FF5700',
        text: 'The Sun—the heart of our solar system—is a yellow dwarf star, a hot ball of glowing gases.',
        footer: '<a href="https://solarsystem.nasa.gov/solar-system/sun/overview/">Wanna learn more?</a>',
        imageUrl: 'img/sun.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      })
})


// MERCURY INTERACTION
domEvents.addEventListener(mercury, 'click', event=>{
    Swal.fire({
        title: 'Mercury',
        confirmButtonColor: '#FF5700',
        text: 'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earths Moon..',
        footer: '<a href="https://solarsystem.nasa.gov/planets/mercury/overview/">Wanna learn more?</a>',
        imageUrl: 'img/mercury.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      })
})

// MARS INTERACTION
domEvents.addEventListener(mars, 'click', event=>{
        Swal.fire({
        title: 'Mars',
        confirmButtonColor: '#FF5700',
        text: 'The fourth planet from the Sun, Mars is a dusty, cold, desert world with a very thin atmosphere.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/mars/overview/">Wanna learn more?</a>',
        imageUrl: 'img/mars.jpeg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      })
})


// EARTH INTERACTION
domEvents.addEventListener(earth, 'click', event=>{
    Swal.fire({
        title: 'Earth',
        confirmButtonColor: '#FF5700',
        text: 'Our home planet is the third planet from the Sun, and the only place we know of so far that’s inhabited by living things.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/earth/overview/">Wanna learn more?</a>',
        imageUrl: 'img/earth.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})

// MOON INTERACTION
domEvents.addEventListener(moon, 'click', event=>{
    Swal.fire({
        title: 'Moon',
        confirmButtonColor: '#FF5700',
        text: 'Earths Moon is the only place beyond Earth where humans have set foot.',
        footer: '<a href="https://solarsystem.nasa.gov/moons/earths-moon/overview/">Wanna learn more?</a>',
        imageUrl: 'img/moon.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})


// VENUS INTERACTION
domEvents.addEventListener(venus, 'click', event=>{
    Swal.fire({
        title: 'Venus',
        confirmButtonColor: '#FF5700',
        text: 'Second planet from the Sun and our closest planetary neighbor, Venus is similar in structure and size to Earth, but it is now a very different world.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/venus/overview/">Wanna learn more?</a>',
        imageUrl: 'img/venus.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})


// JUPITER INTERACTION
domEvents.addEventListener(jupiter, 'click', event=>{
    Swal.fire({
        title: 'Jupiter',
        confirmButtonColor: '#FF5700',
        text: 'Fifth in line from the Sun, Jupiter is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/jupiter/overview/">Wanna learn more?</a>',
        imageUrl: 'img/jupiter.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})

// SATURN INTERACTION
domEvents.addEventListener(saturn, 'click', event=>{
    Swal.fire({
        title: 'Saturn',
        confirmButtonColor: '#FF5700',
        text: 'Saturn is the sixth planet from the Sun and the second largest planet in our solar system.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/saturn/overview/">Wanna learn more?</a>',
        imageUrl: 'img/saturn.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})

// URANUS INTERACTION
domEvents.addEventListener(uranus, 'click', event=>{
    Swal.fire({
        title: 'Uranus',
        confirmButtonColor: '#FF5700',
        text: 'The seventh planet from the Sun with the third largest diameter in our solar system, Uranus is very cold and windy.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/uranus/overview/">Wanna learn more?</a>',
        imageUrl: 'img/uranus.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})

// NEPTUNE INTERACTION
domEvents.addEventListener(neptune, 'click', event=>{
    Swal.fire({
        title: 'Neptune',
        confirmButtonColor: '#FF5700',
        text: 'Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.',
        footer: '<a href="https://solarsystem.nasa.gov/planets/neptune/overview/">Wanna learn more?</a>',
        imageUrl: 'img/neptune.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: 'black',
      });
})


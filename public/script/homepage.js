

$(function(){

  // nonsense
  HOME.canvas.init();

});

var HOME = HOME || {};

$.extend(true, HOME, {
  canvas: {
    init() {

      var camera, scene, renderer, particles, particle, material, particleCount, points, texture;
      var xSpeed, ySpeed;
      xSpeed = 0.0005;
      ySpeed = 0.001;
      var winWidth, winHeight;
      winWidth = window.innerWidth;
      winHeight = window.innerHeight;

      init();
      animate();

      function init() {
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2('#222', 0.001);

        camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 1, 1000);
        camera.position.z = 500;

        particleCount = 8000;
        particles = new THREE.Geometry();

        for (var i = 0; i < particleCount; i++) {
          var px = Math.random() * 2000 - 1000;
          var py = Math.random() * 2000 - 1000;
          var pz = Math.random() * 2000 - 1000;
          particle = new THREE.Vector3(px, py, pz);
          particle.velocity = new THREE.Vector3(0, Math.random());
          particles.vertices.push(particle);
        }



        // vertex colors
        var colors = [];
        for( var i = 0; i < particles.vertices.length; i++ ) {

            // random color
            colors[i] = new THREE.Color();
            colors[i].setHSL( Math.random(), 1.0, 0.5 );
        }
        particles.colors = colors;

        // particle
        material = new THREE.PointsMaterial({
          vertexColors: THREE.VertexColors,
          size: 3,
          transparent: true,
          blending: THREE.AdditiveBlending
        });



        points = new THREE.Points(particles, material);
        points.sortParticles = true;
        scene.add(points);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(winWidth, winHeight);
        renderer.setClearColor('#222', 1);
        document.getElementById('canvas').appendChild(renderer.domElement);
      }

      function animate(){
        requestAnimationFrame(animate);

        scene.rotation.y += xSpeed;

        var i = particleCount;
        while(i--){
          var particle = particles.vertices[i];

          // y
          if(particle.y > 1000){
            particle.y = -1000;
            particle.velocity.y = Math.random();
          }
          particle.velocity.y += Math.random() * ySpeed;

          particle.add(particle.velocity);
        }
        points.geometry.verticesNeedUpdate = true;

        render();
      }

      function render(){
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }

      $(window).resize(function(){updateSize();resetBlendMode()})

      function updateSize() {
        winWidth = $(window).width(); winHeight = $(window).height();

        camera.aspect = winWidth/winHeight;
        camera.updateProjectionMatrix();
        // camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 1, 1000);
        // camera.position.z = 500;

        renderer.setSize(winWidth, winHeight);
      }

      updateCameraPosition();
      $(document).scroll(updateCameraPosition); //[camera.position.x, camera.position.y] = [e.clientX/(winWidth/100), e.clientY/(winHeight/100)] );

      function updateCameraPosition() {
        var percent = document.scrollingElement.scrollTop/document.scrollingElement.scrollHeight;
        camera.position.y = 480 - (480 * percent)
      }

      function resetBlendMode() { // weird safari orientation change blend messup glitch thing
        ($("#blend").css("mix-blend-mode") == "difference") ? $("#blend").css("mix-blend-mode", "exclusion") : $("#blend").css("mix-blend-mode", "difference") ;
      }

    }
  }
});

(function() {

  let formulario = document.querySelector('.contactForm');

  formulario.addEventListener('submit', function(e) {

    e.preventDefault();

    let valido = true;
    let mensaje = document.querySelector('.validation');
    let inputs = document.querySelectorAll('.form-control');

    inputs.forEach(function(input) {
      if(input.value === "") {
        valido = false;
      }
    });

    const data = new FormData(document.querySelector('.contactForm'));
    console.log(data)
    
    var object = {};
    
    data.forEach(function(value, key){
        object[key] = value;
    });
    
    var json = JSON.stringify(object);

    if(valido) {

      fetch("/cita", {
        method: 'POST',
        body: json
      })
      .then(function(response) {
        console.log(response);
      });

    } else {
      console.log('Algun campo está vacio');
    }
  });
})();
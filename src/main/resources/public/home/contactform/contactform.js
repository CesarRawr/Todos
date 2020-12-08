(function() {

  let formulario = document.querySelector('.contactForm');

  formulario.addEventListener('submit', function(e) {

    e.preventDefault();

    let valido = true;
    let mensaje = document.querySelector('.validation');
    let inputs = document.querySelectorAll('.form-control');

    let formContainer = document.querySelector('div.form');

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

      formContainer.innerHTML = plantillaLoader();

      fetch("/cita", {
        method: 'POST',
        body: json
      })
      .then(function(response) {
        if (response.ok) {
          formContainer.innerHTML = plantillaEnviado();
        }
        else {
          alert("Algo salio mal al enviar el formulario");
        }
      });

    } else {
      console.log('Algun campo está vacio');
    }
  });

  function plantillaLoader() {
    return `              
      <div class="loader">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    `;
  }

  function plantillaEnviado() {
    return ` 
      <div class="enviado">
        <span>Tu formulario se envió con exito</span>
      </div>
    `;
  }
})();
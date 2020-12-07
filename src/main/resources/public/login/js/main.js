window.addEventListener('load', function() {

	let botonEnviar = document.querySelector('.btn');

	botonEnviar.addEventListener('click', function(e) {

		e.preventDefault();

		let valido = true;
		let inputs = document.querySelectorAll(".login-field");

		inputs.forEach(function(input) {
	      if(input.value === "") {
	        valido = false;
	      }
	    });

	    if(valido) {

	    	let url = "/board?" + new URLSearchParams({
		        usuario: inputs[0].value,
		        password: inputs[1].value
		    });

		    fetch(url)
		    .then(function(response) {
		       	if(response.ok) {
		       		window.location = response.url;
		        }
		        else {
		        	console.log("Usuario o contraseña incorrectos");
		        }
		    });
	  	} 
	    else {
	      console.log('Algun campo está vacio');
	    }
	});
});
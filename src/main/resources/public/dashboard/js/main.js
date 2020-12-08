window.addEventListener('load', function() {

	let items = document.querySelector('.items');
	
	fetch("/cita")
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		
		let tarjetas = [];

		for(let i = 0; i < json.length; i++) {
			console.log(json[i]);
			tarjetas.push(tarjeta(json[i]));
		}

		items.innerHTML = tarjetas.join("");
	});

	function tarjeta(datos) {
		return `
			<div class="card">
				<div class="info">
					<div class="nombre data">
						<h2>${datos.nombre}</h2>
					</div>
					<div class="fecha data">${datos.fecha}</div>
					<div class="doctor data">Dr. ${datos.doctor}</div>
					<div class="pruebas data">${datos.pruebas}</div>
				</div>
				<div class="erase">
					<div class="erase-btn">
						<span class="material-icons md-40 md-light">delete</span>
					</div>
				</div>
			</div>
		`;
	}
});
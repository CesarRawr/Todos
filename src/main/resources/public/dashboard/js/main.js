window.addEventListener('load', function() {

	let items = document.querySelector('.items');

	cargarTarjetas();
	
	function cargarTarjetas() {
		fetch("/cita")
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			
			let tarjetas = [];

			for(let i = 0; i < json.length; i++) {
				tarjetas.push(tarjeta(json[i]));
			}

			items.innerHTML = tarjetas.join("");

			let eraseBtn = document.querySelectorAll('div.erase-btn > span');
			eraseBtn.forEach(function(elemento) {
				elemento.addEventListener('click', function(e) {
					let card = (e.target.parentNode.parentNode.parentNode);
					let nombre = card.querySelector('div.nombre > h2').textContent;
					
					e.target.parentNode.innerHTML = deleteLoader();

					fetch(`/cita/${nombre}`, {
						method: 'DELETE'
					})
					.then(function(response) {
						console.log(response);
						if(response.ok) {
							cargarTarjetas();
						}
						else {
							alert("Algo salio mal intentando borrar");
						}
					});
				});
			});
		});
	}

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

	function deleteLoader() {
		return `
			<div class="lds-dual-ring"></div>
		`;
	}
});
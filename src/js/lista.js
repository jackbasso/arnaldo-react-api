const baseUrl = "https://assets.breatheco.de/apis/fake/todos/user/";

const cargarLista = async (username) => {
	let resp = await fetch(`${baseUrl}${username}`);
	if (resp.ok) return await resp.json();
	return [];
};

const crearLista = async (username) => {
	let params = {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseUrl}${username}`, params);
	return resp.ok;
};

const actualizarLista = async (username, lista) => {
	let params = {
		method: "PUT",
		body: JSON.stringify(lista),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseUrl}${username}`, params);
	return resp.ok;
};

const eliminarLista = async (username) => {
	let params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseUrl}${username}`, params);
	return resp.ok;
};

export { cargarLista, crearLista, actualizarLista, eliminarLista };

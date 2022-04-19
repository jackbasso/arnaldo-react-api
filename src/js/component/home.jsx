import React, { useRef, useState } from "react";
import { eliminarLista, crearLista } from "../lista.js";

//include images into your bundle
import List from "./list.jsx";

//create your first component
const Home = () => {
	const listRef = useRef();
	const [usuario, setUsuario] = useState("");

	function submitForm(event) {
		// Previene el comportamiento por defecto, evitando que la pagina se recargue
		event.preventDefault();
		// Se crea un objeto "FormData" con los datos del formulario
		let data = new FormData(event.target);
		// Se obtiene el nuevo item del formulario
		if (usuario) {
			// Si hay un usuario, ingresa un nuevo item
			let newItem = data.get("newItem");
			listRef.current.newItem(newItem);
		} else {
			// Si no hay un usuario, valida la entrada como nombre de usuario
			let username = data.get("username");
			crearLista(username).then((ok) => {
				if (ok) {
					console.log("Nuevo usuario");
				} else {
					console.log("Usuario ya existente");
				}
				setUsuario(username);
				return;
			});
		}
		event.target.reset();
	}

	function cerrarLista() {
		setUsuario("");
	}

	function btnEliminarLista() {
		if (usuario) {
			eliminarLista(usuario).then((ok) => {
				if (ok) cerrarLista();
				return;
			});
		}
	}

	return (
		<div>
			<div className="card text-white bg-info mb-3">
				<div className="card-header">
					{usuario ? "ToDo List de " + usuario : "ToDo list"}
					{!!usuario && (
						<button
							onClick={cerrarLista}
							className="btn btn-warning">
							X
						</button>
					)}
				</div>
				<div className="card-body">
					<h5 className="card-title">
						<form onSubmit={submitForm}>
							<div className="form-group">
								<label
									htmlFor={usuario ? "newItem" : "username"}>
									{usuario
										? "Nueva tarea"
										: "Nombre de usuario"}
								</label>
								<input
									required
									id={usuario ? "newItem" : "username"}
									type="text"
									className="form-control"
									placeholder={
										usuario
											? "Nueva tarea"
											: "Ingrese un nombre de usuario"
									}
									name={
										usuario ? "newItem" : "username"
									}></input>
							</div>
						</form>
					</h5>
					{!!usuario && (
						<div className="card-text">
							<List ref={listRef} username={usuario} />
							<button
								onClick={btnEliminarLista}
								className="btn btn-danger btn-block card-link mt-3">
								Eliminar lista
							</button>
						</div>
					)}
				</div>
				<div className="card-footer text-muted">
					Made by{" "}
					<a href="http://www.4geeksacademy.com">4Geeks Academy</a>,
					with love!
				</div>
			</div>
		</div>
	);
};

export default Home;

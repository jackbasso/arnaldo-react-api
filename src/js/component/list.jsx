import React, { useState, forwardRef, useImperativeHandle } from "react";
import { cargarLista, actualizarLista } from "../lista.js";
import ListItem from "./listItem.jsx";

const List = forwardRef((props, ref) => {
	const [items, setItems] = useState([]);

	useImperativeHandle(ref, () => ({
		newItem: (itemText) => {
			const newArray = [...items, { label: itemText, done: false }];
			actualizarLista(props.username, newArray).then((ok) => {
				if (ok) setItems(newArray);
			});
		},
	}));
	cargarLista(props.username).then((data) => setItems(data));

	function deleteItem(id) {
		console.log("Eliminando el " + id);
		let itemsTmp = [...items];
		itemsTmp.splice(id, 1);
		// Actualizar la api
		actualizarLista(props.username, itemsTmp).then((actualizada) => {
			if (actualizada) setItems(itemsTmp);
		});
	}

	return (
		<ul className="list-group">
			{items.map((item, id) => (
				<ListItem
					itemValue={item.label}
					key={id}
					itemId={id}
					delete={deleteItem}
				/>
			))}
		</ul>
	);
});

export default List;

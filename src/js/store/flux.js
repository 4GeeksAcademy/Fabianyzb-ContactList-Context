const getState = ({ getStore, getActions, setStore }) => {

	let url = "https://playground.4geeks.com/apis/fake/contact/";
	
	function getContacts(){
		fetch(url+"agenda/pedro")
			.then( (response) => {
				return response.json();
			})
			.then( (data) => {
				const {contact} = getStore();
				setStore({contact:data});
				console.log("Contactos cargados");
			})
			.catch(function (err) {
				console.log('error: ' + err)
			});
	}

	function createUpdate(op, id, contactData){
		let theMethod="POST", theUrl = url;
		if (op == "u"){
			theMethod = "PUT";
			theUrl += id;
		}
		fetch(theUrl, {
			method: theMethod,
			body: JSON.stringify(contactData),
			headers: {"Content-Type": "application/json"}
			})
			.then( (response) => {
				return response.json();
			})
			.catch(function (err) {
				console.log('error: ' + err);
			});
	}
	
	function deleteContact(id) {
		console.log("El id es:" + id);
		fetch(url+id, {
		method: "DELETE",
		headers: {"Content-Type": "application/json"}
		})
		.then( (response) => {
			return response.json();
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
	}

	return {
		store: {
			contact: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadContacts: () => {
				console.log("cargando contactos");
				getContacts();
			},
			addContact: (newContact) => {
				const {contact} = getStore();
				setStore({contact:[...contact, newContact]});
				createUpdate("c", 0, newContact);
			},
			editContact: (index, contactData, id) => {
				const store = getStore();
				console.log("El id del edit es" + id);
				//updateContact(id, contactData);
				createUpdate("u", id, contactData);
				store.contact.splice(index, 1, contactData);
				setStore(store);
			},
			deleteContact: (index) => {
				const store = getStore();
				let id = store.contact[index].id;
				console.log("El id es: " + id);
				store.contact.splice(index, 1);
				setStore(store);
				deleteContact(id);
				alert("Contacto eliminado");
			}
		}
	};
};

export default getState;

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateContact = props => {

	const { store, actions } = useContext(Context);
	const params = useParams();
    const navigate = useNavigate();3
    const [data, setData] = useState({});
    
    useEffect(() => {
        cleanData();
    }, []);

    let id = "n";

    function cleanData (){
        let datos = {
            full_name: "",
            address: "",
            phone: "",
            email: "",
            agenda_slug: "pedro"
            };
        
        if (params.theparam != "a"){
            datos.full_name = store.contact[params.theparam].full_name;
            datos.address = store.contact[params.theparam].address;
            datos.phone = store.contact[params.theparam].phone;
            datos.email = store.contact[params.theparam].email;
        }
        console.log("El id de la carga es: " + id);
        setData(datos);
    }

    function submitForm (e) {
        e.preventDefault();
        let formData = new FormData(formElem);
        const formDataObj = {};
        for(let [name, value] of formData) {
            console.log(`${name} = ${value}`);
            if(value == ""){
                alert(`Campo ${name} no debe estar vacío`);
                document.getElementById(name).focus();
                console.log(name);
                return;
            }
            formDataObj[name] = value;
        }
        // agregar la agenda
        formDataObj["agenda_slug"] = "pedro";
        console.log("Id de submit: " + id);
        if (params.theparam == "a"){
            actions.addContact(formDataObj);
            alert("contacto agregado");
        } else {
            id = store.contact[params.theparam].id;
            actions.editContact(params.theparam, formDataObj, id);
            alert("contacto actualizado");
        }
        navigate("/");
    }
    
	return (
        <div id="container">
            <h1 className="text-center">{params.theparam=="a"? "Add a new contact":"Contact Details"}</h1>
            <form id="formElem" onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Full name</label>
                    <input type="text" id="nombre" className="form-control" defaultValue={data.full_name} name="full_name" placeholder="Full name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Email</label>
                    <input type="email" id="email" className="form-control" defaultValue={data.email} name="email" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput3">Phone</label>
                    <input type="text" id="telefono" className="form-control" defaultValue={data.phone} name="phone" placeholder="Enter phone"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput4">address</label>
                    <input type="text" id="direccion" className="form-control" defaultValue={data.address} name="address" placeholder="Enter address"></input>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <br />
                <Link to="/">
                    <small id="back" className="form-text text-muted">Or get back to contacts</small>
                </Link>
            </form>
        </div>
    );
};

UpdateContact.propTypes = {
	match: PropTypes.object
};
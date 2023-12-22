import React from "react";
import { Link } from "react-router-dom";

export const Formulario = () => {

    function submitForm (e) {
        e.preventDefault();
        let dataForm = new FormData(e.target);
        let data ={};
        for (const entrada of dataForm.entries()){
            data[entrada[0]] = entrada[1];
        }
    }

	return (
		<form onSubmit={submitForm}>
            <div className="form-group">
                <label for="formGroupExampleInput">Full name</label>
                <input type="text" className="form-control" name="nombre" placeholder="Full name"></input>
            </div>
            <div className="form-group">
                <label for="formGroupExampleInput2">Email</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email"></input>
            </div>
            <div className="form-group">
                <label for="formGroupExampleInput3">Phone</label>
                <input type="text" className="form-control" name="telefono" placeholder="Enter phone"></input>
            </div>
            <div className="form-group">
                <label for="formGroupExampleInput4">Address</label>
                <input type="text" className="form-control" name="direccion" placeholder="Enter address"></input>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <br />
            <Link to="/contact">
                <small id="back" className="form-text text-muted">Or get back to contacts</small>
			</Link>
        </form>
	);
};

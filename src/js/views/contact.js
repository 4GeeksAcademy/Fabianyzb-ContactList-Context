import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Contact = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadContacts();
	}, []);

	return (
		<div className="container w-50">
			<div className="d-flex flex-row justify-content-between align-items-center">
					<h1>Contact List</h1>
					<Link to="/updatecontact/a">
						<button className="btn btn-primary ml-auto p-2">Add new contact</button>
					</Link>
			</div>
			<ul className="list-group">
				{store.contact.map((item, index) => {
					return (
						<li	key={index}	className="list-group-item">
							<div className="card flex-row justify-content-between align-items-center" >
								<img className="rounded-circle img-fluid m-2 w-15" src="https://picsum.photos/id/237/120/120"/>
								<div className="card-body mx-5 w-70">
									<h5 className="card-title">{item.full_name}</h5>
									<p className="card-text">
										<i className="fa-solid fa-location-dot m-2"></i>{item.address}<br/>
										<i className="fa-solid fa-phone m-2"></i>{item.phone}<br/>
										<i className="fa-solid fa-envelope m-2"></i>{item.email}
									</p>
								</div>
								<div className="card-body w-15 align-self-start">
									<Link to={"/updatecontact/" + index}>
										<i className="pen fa-solid fa-pen mx-1"></i>
									</Link>
									<i className="delete fa-solid fa-trash-can mx-1" onClick={() => actions.deleteContact(index)}></i>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

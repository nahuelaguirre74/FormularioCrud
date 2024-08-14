import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import './Regristro.css';

const validationSchema = Yup.object({
    name: Yup.string().required('Requerido'),
    email: Yup.string().email('El email es invalido').required('Requerido'),
    password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
    // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'La contraseña no coincide con la ingresada anteriormente').required('Requerido'),
});

const Registro = () => {
    const [users, setUsers] = useState([]);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        // confirmPassword: '',
    };

   
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        axios.post('http://localhost:4000/api/registration', values)
            .then(response => {
                console.log(response.data);
                setUsers([...users, values]); 
                resetForm();
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const editUser = (values, { setState, editForm }) => {
        axios.post('http://localhost:4000/api/registration', values)
            .then(response => {
                console.log(response.data);
                setUsers([...users, values]); 
                editForm();
                
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setState(false);
            });
    };

   
         const removeUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id); 
        setUsers(updatedUsers); 

            axios.delete(`http://localhost:4000/api/registration/${id}`)
                .then(response => {
                    console.log("Usuario eliminado:", response.data);
                })
                .catch(error => {
                    console.error("Error al eliminar el usuario:", error);
                });
        };

  

    return (
        <div className="registro-container">
            <h2>Registro de Pacientes</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-control">
                            <label htmlFor="name">Nombre</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="email">Correo</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Contraseña</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>Registrar</button>
                    </Form>
                )}
            </Formik>

            <h2>Lista de Pacientes Registrados</h2>
            <div className="user-list">
                {users.map((user, index) => (
                    <div key={index} className="user-item">
                        <span>{user.name} - {user.email}</span>
                        <button onClick={()=>editUser(user.id)} className="edit-button">Edit</button>
                        <button onClick={()=>removeUser(user.id)} className="remove-todo-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Registro;
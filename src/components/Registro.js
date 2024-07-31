import React from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import './Regristro.css';
//import { response } from "express";

const validationSchema = Yup.object({
    name: Yup.string().required('Requerido'),
    email: Yup.string().email('Email invalido').required('Requerido'),
    password: Yup.string().min(6,'Debe tener al menos 6 caracteres').required('Requerido'),
    //confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Las contraseñas deben de coincidir').required('Requerido'),

});

const Registro = ()=>{
    const initialValues = {
        nombre: '',
        emal: '',
        password: '',
        confirmPassword: '', 
    };

    const onSubmit = (values,{setSubmitting, resetForm})=>{
        axios.post('http://localhost:4000/api/registration',values)
        .then(response =>{
            console.log(response.data);
            resetForm();
        })
        .catch(error =>{
            console.error(error);
        })
        .finally(()=>{
            setSubmitting(false);
        });
        
        
        //console.log('Formulario enviado');
        //console.log(values);
    };

    return (
        <div className="registro-container">
            <h2>Registro de Pacientes</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                    {({isSubmitting})=> (
                        <Form>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name"/>
                            <ErrorMessage name="name" component="div" className="error"/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="nombre">Email</label>
                            <Field type="email" id="email" name="email"/>
                            <ErrorMessage name="email" component="div" className="error"/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password"/>
                            <ErrorMessage name="password" component="div" className="error"/>
                        </div>
                        <button type="submit" disabled={isSubmitting}>Registrar</button>

                    </Form>
                    )}
                </Formik>
        </div>
    );
};

export default Registro;
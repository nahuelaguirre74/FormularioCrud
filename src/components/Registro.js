import React from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './Regristro.css';

const Registro = ()=>{
    const initialValues = {
        nombre: '',
        emal: '',
        password: '',
        confirmPassword: '', 
    };

    const validationSchema = Yup.object({
        nombre: Yup.string().required('Requerido'),
        email: Yup.string().email('Email invalido').required('Requerido'),
        password: Yup.string().min(6,'Debe tener al menos 6 caracteres').required('Requerido'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Las contraseñas deben de coincidir').required('Requerido'),

    });

    const onSubmit = (values)=>{
        console.log('Formulario enviado');
        console.log(values);
    };

    return (
        <div className="registro-container">
            <h2>Registro de Pacientes</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                    <Form>
                        <div className="form-control">
                            <label htmlFor="nombre">Nombre</label>
                            <Field type="text" id="nombre" name="nombre"/>
                            <ErrorMessage name="nombre" component="div" className="error"/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="nombre">Correo</label>
                            <Field type="email" id="email" name="email"/>
                            <ErrorMessage name="email" component="div" className="error"/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="password">Clave</label>
                            <Field type="password" id="password" name="password"/>
                            <ErrorMessage name="password" component="div" className="error"/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="confirmPassword">Confirmar</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword"/>
                            <ErrorMessage name="confirmPassword" component="div" className="error"/>
                        </div>
                        <button type="submit">Registrar</button>

                    </Form>
                </Formik>
        </div>
    );
};

export default Registro;
import React from 'react';
import { Field, useField } from 'formik';

const CampoFlutuante = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating">
      <Field {...field} {...props} className="form-control" placeholder={label}/>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback d-block mb-3">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default CampoFlutuante;
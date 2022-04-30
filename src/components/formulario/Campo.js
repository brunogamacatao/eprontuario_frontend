import React from 'react';
import { Field, useField } from 'formik';

const Campo = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">{label}</label>
      <Field {...field} {...props} className="form-control"/>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Campo;
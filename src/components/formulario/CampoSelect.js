import React from 'react';
import { Field, useField } from 'formik';

const CampoSelect = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">{label}</label>
      <Field as="select" {...field} {...props} className="form-control">
        {children}
      </Field>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default CampoSelect;
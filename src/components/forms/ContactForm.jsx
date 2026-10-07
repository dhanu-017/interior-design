import React, { useReducer, useState } from 'react';
import MagneticButton from '../ui/MagneticButton';

/**
 * Front-end only. No API, no transport — validation and success state are
 * entirely local. The copy says so honestly.
 */
const initialState = {
  name: '',
  email: '',
  projectType: '',
  message: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.projectType) errors.projectType = 'Please choose a project type.';
  if (values.message.trim().length < 12) {
    errors.message = 'Tell us a little more — at least a sentence.';
  }
  return errors;
}

const projectTypes = [
  'Residential — full interior',
  'Residential — single room',
  'Commercial — office',
  'Commercial — hospitality',
  'Commercial — retail',
  'Consultation only'
];

export default function ContactForm() {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | success

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'field', field: name, value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p className="eyebrow">Inquiry received</p>
        <h3 className="t-h2">Thank you — your inquiry is with us.</h3>
        <p className="t-body muted">
          A member of the studio team will reply within two working days to arrange a first
          consultation. We look forward to hearing the shape of your project.
        </p>
        <p className="t-micro muted" style={{ marginTop: '1.2rem' }}>
          Front-end preview — no message was transmitted.
        </p>
        <MagneticButton
          type="button"
          variant="ghost"
          icon="↺"
          onClick={() => {
            dispatch({ type: 'reset' });
            setStatus('idle');
          }}
        >
          Send another inquiry
        </MagneticButton>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className={`field ${errors.name ? 'has-error' : ''}`}>
          <label className="field__label t-micro" htmlFor="contact-name">
            Name
          </label>
          <input
            className="field__control"
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            placeholder="Your full name"
          />
          {errors.name ? (
            <p className="field__error t-micro" id="error-name">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={`field ${errors.email ? 'has-error' : ''}`}>
          <label className="field__label t-micro" htmlFor="contact-email">
            Email
          </label>
          <input
            className="field__control"
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            placeholder="you@studio.com"
          />
          {errors.email ? (
            <p className="field__error t-micro" id="error-email">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={`field ${errors.projectType ? 'has-error' : ''}`}>
        <label className="field__label t-micro" htmlFor="contact-type">
          Project type
        </label>
        <select
          className="field__control field__control--select"
          id="contact-type"
          name="projectType"
          value={values.projectType}
          onChange={handleChange}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? 'error-type' : undefined}
        >
          <option value="">Select an option</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <p className="field__error t-micro" id="error-type">
            {errors.projectType}
          </p>
        ) : null}
      </div>

      <div className={`field ${errors.message ? 'has-error' : ''}`}>
        <label className="field__label t-micro" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className="field__control field__control--area"
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          placeholder="Tell us about the space, the timeline and the feeling you want to create."
        />
        {errors.message ? (
          <p className="field__error t-micro" id="error-message">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="form__actions">
        <MagneticButton as="button" type="submit" variant="primary" icon="→">
          Prepare inquiry
        </MagneticButton>
        <p className="t-micro muted">
          Replies within two working days.
        </p>
      </div>
    </form>
  );
}

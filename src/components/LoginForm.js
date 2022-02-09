import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, invalidateField, validateForm } from '../reducers/loginFormSlice';
import { userLogin } from '../reducers/authSlice';

function LoginForm() {
  const { values, validation, validated, error } = useSelector((state) => state.loginForm);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(values, validation, validated, error, profile);

  const handleChange = (e) => {
    dispatch(changeField({ name: e.target.name, value: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.login.length) {
      dispatch(invalidateField('login'));
      return;
    }
    if (!values.password.length) {
      dispatch(invalidateField('password'));
      return;
    }

    dispatch(validateForm());
    dispatch(userLogin({ login: values.login, password: values.password }));
  }

  if (profile) {
    return null;
  }

  return (
    <div className="column">
      <form
        className={classNames('login__form', { 'is-invalid': error && validated })}
        onSubmit={handleSubmit}
      >
        <div className="column-login">
          <input
            className={classNames('form__control', { 'is-invalid': !validation.login })}
            type="text"
            name="login"
            onChange={handleChange}
            value={values.login}
            placeholder="Ваше имя"
          />
          <div className="invalid-feedback">Введите Имя</div>
        </div>
        <div className="column-password">
          <input
            className={classNames('form__control', { 'is-invalid': !validation.password })}
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Пароль"
          />
          <div className="invalid-feedback">Введите пароль</div>
        </div>
        <button className="btn btn__outline-success" type="submit">Войти</button>
      </form>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

export default LoginForm;

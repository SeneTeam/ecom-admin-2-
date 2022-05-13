import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ValueType } from '../../../../types';
import { ForgotPasswordInfo } from '../../../../types/services/auth.types';
import Input from '../../../Atoms/Form/Input';
import Button from '../../../Molecules/Button/Button';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [details, setDetails] = useState<ForgotPasswordInfo>({
    username: '',
  });

  const [error] = useState<string>('');

  const handleChange = (e: ValueType) => {
    console.log(e.name);
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // const res = await signin(details);
    // if (res.response?.data.status == 401) {
    //   setError('Invalid credentials');
    // } else {
    //   navigate('/dashboard');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-danger text-center"> {error ? error : null}</p>
      <div className="input-control mb-3">
        <Input
          placeholder={'Email'}
          name={'email'}
          handleChange={handleChange}
          value={details.username}
        />
      </div>
      <div className="mb-3">
        <div className="ml-auto col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <Link to={'/login'}>
            <a className="f-password">Remembered Now?</a>
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <Button type={'submit'}>Send Email</Button>
      </div>
    </form>
  );
}

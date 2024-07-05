import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { ILoginData } from '../interfaces/ILoginData';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const [inputFields, setInputFields] = useState<ILoginData>({
    username: '',
    password: '',
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void  => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  }

  const { loading, login } = useLogin();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputFields.username, inputFields.password);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
          <span className='text-green-500'>Talk Space</span>
        </h1>

        <form onSubmit={handleLogin}>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
              value={inputFields.username}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              autoComplete='on'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputFields.password}
              onChange={handleOnChange}
            />
          </div>
          <Link
            to='/signup'
            className='text-sm  hover:underline text-white hover:text-green-600 mt-2 inline-block'
          >
            Don't have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2'>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

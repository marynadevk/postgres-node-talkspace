import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { GenderCheckbox } from '../components/GenderCheckbox';
import { useSignup } from '../hooks/useSignup';
import { IUserData } from '../interfaces/IUserData';

export const SignUp = () => {
  const [inputFields, setInputFields] = useState<IUserData>({
    fullName: '',
    username: '', 
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void  => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  }

  const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender: string) => {
		setInputFields({ ...inputFields, gender });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		signup(inputFields);
	};

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center'>
          Sign Up <span className='text-green-500'>Talk Space</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='fullName'
              placeholder='Enter your full name'
              className='w-full input input-bordered h-10'
              value={inputFields.fullName}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username'
              className='w-full input input-bordered h-10'
              value={inputFields.username}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'> Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputFields.password}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputFields.confirmPassword}
              onChange={handleOnChange}
            />
          </div>

					<GenderCheckbox selectedGender={inputFields.gender} onCheckboxChange={handleCheckboxChange} />

          <Link
            to={'/login'}
            className='text-sm hover:underline hover:text-green-400 mt-2 inline-block text-white'
          >
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-green-800'>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

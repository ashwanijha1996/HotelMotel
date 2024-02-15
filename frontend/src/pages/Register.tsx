import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-clients';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export type RegisterFormData = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
};

const Register = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const { showToast, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "registration successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: `${error.message}`, type: "ERROR" });
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className='font-bold text-sm text-gray-700 flex-1'>
          First Name
          <input className='border rounded w-full py-1 px-2 font-normal'
            {...register("firstName", { required: "This field is required" })}></input>
          {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
        </label>
        <label className='font-bold text-sm text-gray-700 flex-1'>
          Last Name
          <input className='border rounded w-full py-1 px-2 font-normal'
            {...register("lastName", { required: "This field is required" })}></input>
          {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
        </label>
      </div>
      <label className='font-bold text-sm text-gray-700 flex-1'>
        Email
        <input type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("email", { required: "This field is required" })}></input>
        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </label>
      <label className='font-bold text-sm text-gray-700 flex-1'>
        Password
        <input type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("password", {
            required: "This field is required", minLength: {
              value: 6,
              message: "Password should be 6 characters long"
            }
          })}></input>
        {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
      </label>
      <label className='font-bold text-sm text-gray-700 flex-1'>
        Confirm Password
        <input type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required"
              } else if (watch("password") !== val) {
                return "Your passwords did not match"
              }
            }
          })}></input>
        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
      </label>
      <span className="flex justify-between items-center">
        <span className="text-sm">
          Already Registered? <Link className='underline' to='/login'>Sign in here</Link>
        </span>
        <button type="submit" className='bg-blue-600 text-white p-2 hover:bg-blue-400'>Create Account</button>
      </span>
    </form>
  )
}
  ;
export default Register;
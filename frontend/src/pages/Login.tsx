import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-clients';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type SignInFormData = {
    email: string,
    password:string
}

const Login = () => {
    const {register,handleSubmit,reset,formState:{errors}} = useForm<SignInFormData>();
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const mutation = useMutation(apiClient.login,{
        onSuccess:async ()=>{
          showToast({message: "Logged in successfully",type: "SUCCESS"});
          await queryClient.invalidateQueries("validateToken");
          navigate('/');
        },
        onError:(error: Error) => {
          showToast({message: `${error.message}`,type: "ERROR"});
        }
      });
      
      const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
        reset();
      });
    
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
        <h2 className="text-3xl font-bold">
            Sign In
        </h2>
        <label className='font-bold text-sm text-gray-700 flex-1'>
          Email
          <input type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("email",{required:"This field is required"})}></input>
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
        </label>
        <label className='font-bold text-sm text-gray-700 flex-1'>
          Password
          <input type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("password",{required:"This field is required",minLength:{
            value: 6,
            message: "Password should be 6 characters long"
          }})}></input>
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </label>
        <span className="flex justify-between items-center">
        <span className="text-sm">
            Not a member? <Link className='underline' to='/register'>Create an account here</Link>
          </span>
          <button type="submit" className='bg-blue-600 text-white p-2 hover:bg-blue-400'>Sign In</button>
        </span>
    </form>
  )
}

export default Login;
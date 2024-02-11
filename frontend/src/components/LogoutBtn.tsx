import { useMutation } from "react-query";
import * as apiClient from '../api-clients';
import {useAppContext} from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const LogoutBtn = () => {
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.logout,{
        onSuccess: async () => {
            showToast({message: "Logged out successfully",type: 'SUCCESS'})
            await queryClient.invalidateQueries("validateToken");
            navigate('/login');
        },
        onError: (error: Error) => {
            showToast({message: error.message,type: 'ERROR'})
        }
    });
    
    const handleClick = () => {
        mutation.mutate()
    }
    
  return (
    <button onClick={handleClick} className='bg-gray-50 text-blue-600 px-3 font-bold cursor-pointer hover:bg-gray-400'>Sign Out</button>
  )
}

export default LogoutBtn;
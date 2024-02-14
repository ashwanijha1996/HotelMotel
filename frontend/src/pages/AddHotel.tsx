// import { useMutation } from 'react-query';
import ManageHotelForms from '../components/forms/manageHotelForms/ManageHotelForms';
// import * as apiClient from '../api-clients';
// import { useAppContext } from '../contexts/AppContext';

const AddHotel = () => {
  // const { showToast } = useAppContext();
  // const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
  //   onSuccess: () => {
  //     showToast({ message: 'Hotel saved successfully', type: 'SUCCESS' });
  //   },
  //   onError: () => {
  //     showToast({ message: 'Error while saving hotel', type: 'ERROR' });
  //   }
  // });

  return (
    <ManageHotelForms />
  )
}

export default AddHotel;
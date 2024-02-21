import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-clients';
import ManageHotelForms from "../components/forms/manageHotelForms/ManageHotelForms";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { data: hotel } = useQuery("fetchMyHotelById", () =>
        apiClient.fetchMyHotelById(hotelId ?? ''),
        {
            enabled: !!hotelId
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel updated successfully", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error occured while saving hotel", type: "ERROR" })
        }
    });

    const handleSave = (hotelFromData: FormData) => {
        mutate(hotelFromData);
    };

    return <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={isLoading} />
}

export default EditHotel;
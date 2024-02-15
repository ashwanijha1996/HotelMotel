import { useFormContext } from "react-hook-form";
import HotelFacilities from "../../../utils/hotelFacilities";
import { HotelFormData } from "./ManageHotelForms";

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className='text-2xl font-bold mb-3'>Type</h2>
            <div className="grid grid-cols-5 gap-3">
                {HotelFacilities.map((eachFacility) => {
                    return (<label key={eachFacility}
                        className='text-sm flex gap-1 text-gray-700'>
                        <input
                            type='checkbox'
                            value={eachFacility}
                            {...register("facilities", {
                                validate: () => {
                                    if (eachFacility && eachFacility.length > 0) {
                                        return true;
                                    } else {
                                        return "Atleast one facility  is required";
                                    }
                                }
                            })} />
                        <span>{eachFacility}</span>
                    </label>)
                })
                }
            </div>
            {errors.facilities && <span className='text-red-500'>{errors.facilities.message}</span>}
        </div>
    )
}

export default FacilitiesSection;
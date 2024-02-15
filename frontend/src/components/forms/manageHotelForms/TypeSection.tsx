import { useFormContext } from 'react-hook-form';
import HotelTypes from '../../../utils/hotelTypes';
import { HotelFormData } from './ManageHotelForms';

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (
        <div>
            <h2 className='text-2xl font-bold mb-3'>Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {HotelTypes.map((eachType) => {
                    return (<label key={eachType}
                        className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${typeWatch === eachType ? 'bg-blue-300' : 'bg-gray-300'}`}>
                        <input
                            type='radio'
                            value={eachType}
                            {...register("type", {
                                required: "This field is required",
                            })} className='hidden' />
                        <span>{eachType}</span>
                    </label>)
                })
                }
            </div>
            {errors.type && <span className='text-red-500'>{errors.type.message}</span>}
        </div>
    )
}

export default TypeSection;
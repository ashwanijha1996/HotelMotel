import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForms'

const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className='text-2xl font-bold mb-3'>Guests</h2>
            <div className="flex flex-col md:flex-row gap-5 bg-gray-300 py-6 px-3">
                <label className='font-bold text-sm text-gray-700 flex-1'>
                    Adults <input type='number' min={1} className='border rounded w-full py-1 px-2 font-normal'
                        {...register("adultCount", { required: "This field is required" })}></input>
                    {errors.adultCount && <span className='text-red-500'>{errors.adultCount.message}</span>}
                </label>
                <label className='font-bold text-sm text-gray-700 flex-1'>
                    Children <input type='number' min={0} className='border rounded w-full py-1 px-2 font-normal'
                        {...register("childCount", { required: "This field is required" })}></input>
                    {errors.childCount && <span className='text-red-500'>{errors.childCount.message}</span>}
                </label>
            </div>
        </div>
    )
}

export default GuestSection;
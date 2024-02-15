import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForms';
import countries from "../../../utils/countries";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label className='font-bold text-sm text-gray-700 flex-1'>
                Name <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "This field is required" })}></input>
                {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </label>
            <div className="flex flex-col md:flex-row gap-5">
                <label className='font-bold text-sm text-gray-700 flex-1'>
                    City <input className='border rounded w-full py-1 px-2 font-normal'
                        {...register("city", { required: "This field is required" })}></input>
                    {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
                </label>
                <label className='font-bold text-sm text-gray-700 flex-1'>
                    Country   <select className='border rounded w-full py-1 px-2 font-normal' {...register("country", { required: "This field is required" })}>
                        <option value=''>Select Country</option>
                        {countries.map((eachCountry) => {
                            return (
                                <option key={eachCountry.value} value={eachCountry.label}>{`${eachCountry.label} (${eachCountry.value})`}</option>
                            )
                        })}
                    </select>
                    {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
                </label>
            </div>
            <label className='font-bold text-sm text-gray-700 flex-1'>
                Description <textarea rows={10} className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "This field is required" })}></textarea>
                {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
            </label>
            <label className='font-bold text-sm text-gray-700 max-w-[50%]'>
                Price Per Night
                <input min={1} type='number' className="border rounded py-1 px-2 font-normal w-full"
                    {...register("pricePerNight", { required: "This field is required" })}></input>
                {errors.pricePerNight && <span className='text-red-500'>{errors.pricePerNight.message}</span>}
            </label>
            <label className='font-bold text-sm text-gray-700 max-w-[50%]'>
                Star Rating
                <select className="border rounded py-1 px-2 font-normal w-full"
                    {...register("starRating", { required: "This field is required" })}>
                    <option value=''>Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                {errors.starRating && <span className='text-red-500'>{errors.starRating.message}</span>}
            </label>
        </div>
    )
}

export default DetailsSection;
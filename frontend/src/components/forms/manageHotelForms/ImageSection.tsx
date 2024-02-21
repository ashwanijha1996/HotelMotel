import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForms';

const ImageSection = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext<HotelFormData>();
    const existingImageUrls = watch("imageUrls");

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl));
    }

    return (
        <div>
            <h2 className='text-2xl font-bold mb-3'>Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div key={url} className="relative group">
                                <img src={url} alt="Hotel" className='min-h-full object-cover' />
                                <button onClick={(e) => handleDelete(e, url)} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>Delete</button>
                            </div>
                        ))}
                    </div>
                )}

                <input type='file'
                    multiple
                    accept='image/*'
                    className='w-full text-gray-700 font-normal'
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + existingImageUrls?.length;
                            if (totalLength === 0) {
                                return "Atleast 1 image is required";
                            }
                            if (totalLength > 6) {
                                return "Atmost 6 images can be uploaded";
                            }
                            return true;
                        }
                    })} />
            </div>
            {errors.imageFiles && <span className='text-red-500'>{errors.imageFiles.message}</span>}
        </div>
    )
}

export default ImageSection;
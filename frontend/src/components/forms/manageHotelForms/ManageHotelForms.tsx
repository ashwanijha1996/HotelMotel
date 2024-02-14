import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
}

const ManageHotelForms = () => {
    const formMethods = useForm<HotelFormData>();

    const onSubmit = formMethods.handleSubmit((formData: HotelFormData) => {
        console.log(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={onSubmit} className="flex flex-col gap-10">
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImageSection />
                <span className="flex justify-end">
                    <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl" type="submit">Add Hotel</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForms;
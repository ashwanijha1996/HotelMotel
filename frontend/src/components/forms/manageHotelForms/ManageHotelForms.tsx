import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../api-clients";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    imageUrls: string[];
    adultCount: number;
    childCount: number;
}

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForms = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const navigate = useNavigate();

    useEffect(() => {
        formMethods.reset(hotel);
    }, [hotel, formMethods]);

    const onSubmit = formMethods.handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            })
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append('imageFiles', imageFile);
        });

        onSave(formData);
        formMethods.reset();
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={onSubmit} className="flex flex-col gap-10">
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImageSection />
                <span className="flex justify-end gap-2">
                    <button onClick={() => navigate("/my-hotels")} className="bg-gray-300 text-black p-3 font-bold hover:bg-gray-400 text-xl disabled:bg-gray-500">Back</button>
                    <button disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500" type="submit">{!hotel ? isLoading ? "Adding..." : "Add Hotel" : isLoading ? "Updating..." : "Update Hotel"}</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForms;
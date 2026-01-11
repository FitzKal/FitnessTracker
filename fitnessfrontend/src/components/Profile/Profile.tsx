import { useQuery } from "@tanstack/react-query";
import { UserStore } from "../../stores/UserStore.ts";
import { getUserProfile } from "../../services/UserProfileService.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateForm from "./UpdateForm.tsx";
import { useNavigate } from "react-router-dom";
import DeleteProfileForm from "./DeleteProfileForm.tsx";

export default function Profile() {
    const currentUser = UserStore.getState().user;
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["profile", currentUser?.username],
        queryFn: async () => {
            if (!currentUser?.accessToken) throw new Error("Could not authenticate");
            return await getUserProfile();
        },
        enabled: !!currentUser?.accessToken,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/CreateProfile");
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        },
    });

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    const missingProfile =
        isError && axios.isAxiosError(error) && error.response?.status === 404;

    const handleUpdating = () => setIsUpdating(!isUpdating);
    const handleDeleting = () => setIsDeleting(!isDeleting);

    if (isLoading && !missingProfile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-semibold text-blue-800">Loading Profile...</h1>
            </div>
        );
    }

    return (
        <div className=" ml-10 min-h-screen bg-gradient-to-b from-white to-blue-100 p-8">
            <UpdateForm isUpdating={isUpdating} updateHandler={handleUpdating} userData={data} />
            <DeleteProfileForm isDeleting={isDeleting} deleteHandler={handleDeleting} />

            <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">Your Profile</h1>

            <div className="flex flex-col lg:flex-row gap-10 justify-start">
                <div className="flex flex-col items-center">
                    <img
                        src={data?.profilePictureSrc}
                        alt={currentUser?.username}
                        className="55 h-100 object-cover rounded-2xl border-4 border-blue-300 shadow-lg mb-4"
                    />
                    <span className="text-2xl font-semibold">{currentUser?.username}</span>
                </div>

                    <div className={"sm:flex justify-center"}>
                        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white shadow-md border border-gray-200 w-full max-w-lg ">
                            {[
                                { label: "First Name", value: data?.firstName },
                                { label: "Last Name", value: data?.lastName },
                                { label: "Username", value: currentUser?.username },
                                { label: "Height", value: data?.height ? `${data.height} m` : "-" },
                                { label: "Weight", value: data?.weight ? `${data.weight} kg` : "-" },
                                { label: "Email", value: data?.email },
                                { label: "Gender", value: data?.gender },
                                { label: "Age", value: data?.age },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between text-lg font-medium">
                                    <p className="text-gray-700">{item.label}:</p>
                                    <span className="text-gray-900">{item.value || "-"}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 mt-10 lg:justify-start sm:justify-center">
                    <button
                        onClick={handleUpdating}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={handleDeleting}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                    >
                        Delete Profile
                    </button>
                </div>
        </div>
    );
}

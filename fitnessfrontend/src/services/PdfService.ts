//------------- ExportPdf -------------
import api from "./AxiosConfig.ts";

export const exportDetailsToPDF = async (profileId:number)=>{
    try {
        const response = await api.get(`/pdf/${profileId}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', `profile_${profileId}.pdf`);
        document.body.appendChild(link);
        link.click();


        link.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error.message);
        } else {
            throw error;
        }
    }
}
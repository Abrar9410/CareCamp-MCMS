import axios from "axios";


export const uploadImage = async imageData => {
    const formData = new FormData();
    formData.append('image', imageData);
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
    return data.data.display_url;
}

export const axiosPublic = axios.create({baseURL: import.meta.env.VITE_API_URL});

export const getMostVisitedDistrict = (data) => {
    const districtCount = {};

    data.forEach(entry => {
        const parts = entry.location.trim().split(","); // Split by comma
        const district = parts[parts.length - 1].trim(); // Get the last part (district)

        districtCount[district] = (districtCount[district] || 0) + 1;
    });

    return Object.entries(districtCount)
        .sort((a, b) => b[1] - a[1])[0][0]; // Get district with max count
};
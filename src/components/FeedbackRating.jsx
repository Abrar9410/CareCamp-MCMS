import Heading from "./shared/Heading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { axiosPublic } from "../utilities/utilities";
import { Rating } from "@smastrom/react-rating";


const FeedbackRating = () => {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axiosPublic('/feedbacks')
            .then(res => setFeedbacks(res.data))
    }, [])

    return (
        <>
            <Heading title="Feedback and Ratings"></Heading>
            <p className="text-center text-black/80 dark:text-white/80 w-11/12 min-[400px]:w-9/12 sm:w-2/3 mx-auto mt-3 mb-6">
                Listen to the words of the Participants about their experience.
            </p>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper mb-6">
                {
                    feedbacks?.map(feedback => 
                        <SwiperSlide key={feedback._id}>
                            <div className="flex flex-col items-center gap-2 py-6 bg-white dark:bg-black shadow-lg">
                                <div className="flex justify-center items-center gap-2">
                                    <div className="w-6 h-6 min-[300px]:w-8 min-[300px]:h-8 sm:w-10 sm:h-10 rounded-full">
                                        <img src={feedback.participant_Img} alt="user" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <h4 className="font-semibold sm:text-lg text-black dark:text-white">{feedback.participant_Name}</h4>
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl text-center text-black dark:text-white">{feedback.campName}</h3>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                                <p className="px-10 min-[400px]:px-14 sm:px-16 md:px-20 lg:px-24 text-black dark:text-white text-center">{feedback.detailFeedback}</p>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
};

export default FeedbackRating;
import sliderImg1 from '../assets/sliderImg1.jpg'
import sliderImg2 from '../assets/sliderImg2.jpg'
import sliderImg3 from '../assets/sliderImg3.jpeg'
import sliderImg4 from '../assets/sliderImg4.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='w-full h-[70vh] rounded-xl mt-10 mb-4'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative w-full rounded-xl h-[70vh]">
                        <img src={sliderImg1} alt="Slider Image 1" className='w-full h-full object-cover rounded-xl'/>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                            <p className="text-white bg-black bg-opacity-40 p-4 rounded-lg text-lg min-[500px]:text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
                                Transforming lives through essential healthcare services.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-xl h-[70vh]">
                        <img src={sliderImg2} alt="Slider Image 2" className='w-full h-full object-cover rounded-xl' />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                            <p className="text-white bg-black bg-opacity-40 p-4 rounded-lg text-lg min-[500px]:text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
                                Bringing medical care to the underserved.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-xl h-[70vh]">
                        <img src={sliderImg3} alt="Slider Image 3" className='w-full h-full object-cover rounded-xl' />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                            <p className="text-white bg-black bg-opacity-40 p-4 rounded-lg text-lg min-[500px]:text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
                                Working tirelessly for healthy future.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-xl h-[70vh]">
                        <img src={sliderImg4} alt="Slider Image 4" className='w-full h-full object-cover rounded-xl' />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                            <p className="text-white bg-black bg-opacity-40 p-4 rounded-lg text-lg min-[500px]:text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
                                Building healthy society through compassionate care.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;
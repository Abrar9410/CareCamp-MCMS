

const Heading = ({title}) => {
    return (
        <div className="font-bold font-poppins max-[215px]:pt-4 pt-6 min-[300px]:pt-8 min-[400px]:pt-10">
            <h2 className="text-center text-primary text-lg min-[300px]:text-xl min-[450px]:text-2xl sm:text-3xl lg:text-4xl">
                {title}
            </h2>
        </div>
    );
};

export default Heading;
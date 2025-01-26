

const Heading = ({title}) => {
    return (
        <div className="font-bold max-[215px]:py-4 py-6 min-[300px]:py-8 min-[400px]:py-10">
            <h2 className="text-center text-primary text-lg min-[300px]:text-xl min-[450px]:text-2xl sm:text-2xl md:text-3xl xl:text-4xl">
                {title}
            </h2>
        </div>
    );
};

export default Heading;
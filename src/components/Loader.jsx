
import React from "react";

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <img
                width={100}
                height={100}
                alt="Loading..."
                src="../assets/loader.svg"
            />
        </div>
    );
};

export default Loader;
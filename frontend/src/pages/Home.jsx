import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="relative h-[90vh] bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D')",
            }}
        >
            {/* Overlay to darken the background */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content Section */}
            <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Title */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
                        Welcome to PetCare
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
                        Your pet’s best care starts here. Join our loving community of pet lovers and take your furry friend to the next level.
                    </p>

                    {/* Shiny Text Effect */}
                    <span className="shiny-text text-lg sm:text-2xl md:text-3xl font-bold">
                        Caring for pets, one paw at a time.
                    </span>

                    {/* Get Started Button */}
                    <div className="mt-8">
                        <button
                            className="text-black text-base sm:text-lg md:text-xl bg-white hover:from-green-500 hover:to-blue-600 px-4 sm:px-6 py-2 sm:py-3 w-auto rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                            onClick={() => navigate("/products")}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

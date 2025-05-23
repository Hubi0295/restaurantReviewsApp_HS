import React, { useState } from "react";

export default function RestaurantImage({ src, alt }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Miniaturka */}
            <img
                src={src}
                alt={alt}
                className="w-20 h-14 object-cover rounded cursor-pointer"
                onClick={() => setIsOpen(true)}
            />
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-pointer"
                >
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
                        onClick={e => e.stopPropagation()} // kliknięcie na obraz nie zamknie modala
                    />
                </div>
            )}
        </>
    );
}

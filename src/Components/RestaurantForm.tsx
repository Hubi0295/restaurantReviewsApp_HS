import React, { useState } from "react";

export default function RestaurantForm() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [hasDelivery, setHasDelivery] = useState(false);

    async function handleSubmit  (e: React.FormEvent){
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("hasDelivery", String(hasDelivery));
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Restauracja dodana pomyślnie!");
                setName("");
                setAddress("");
                setDescription("");
                setType("");
                setImage(null);
                setHasDelivery(false);
            } else {
                alert("Wystąpił błąd przy dodawaniu restauracji.");
            }
        } catch (error) {
            console.error("Błąd:", error);
            alert("Nie udało się połączyć z serwerem.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
        >
            <h2 className="text-2xl font-semibold text-center text-amber-700">
                Dodaj restaurację
            </h2>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Nazwa restauracji</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Adres</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Opis</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows={3}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Typ kuchni</label>
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="np. Włoska, Japońska, Polska..."
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Zdjęcie restauracji</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={hasDelivery}
                    onChange={(e) => setHasDelivery(e.target.checked)}
                    id="delivery"
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="delivery" className="text-sm font-medium text-gray-700">
                    Czy dowozi jedzenie?
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Dodaj restaurację
            </button>
        </form>
    );
}

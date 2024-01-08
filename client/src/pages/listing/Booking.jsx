import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState({
    vehicleType: "",
    serialNumber: "",
    description: "",
    garagiste: "",
    date: "",
  });
  async function handleSaveListing(e) {
    e.preventDefault();

    try {
      // Assuming your API endpoint for creating a new booking is /bookings
      await axios.post("/new-booked", listingData);
      alert("booking successful");
      // Optionally, you can redirect the user after successful save
      navigate("/account");
    } catch (error) {
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      } else {
        alert("Error saving listing");
      }
    }
  }

  const handleChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="m-auto p-4 border rounded-md max-w-screen-md">
      <form onSubmit={handleSaveListing}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="m-auto text-base font-semibold leading-7 text-gray-900">Owner Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="vehicleType" className="block text-sm font-medium leading-6 text-gray-900">
                  Vehicle Type
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="vehicleType"
                    id="vehicleType"
                    autoComplete="given-name"
                    value={listingData.vehicleType}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="serialNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Serial Number
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="serialNumber"
                    id="serialNumber"
                    autoComplete="family-name"
                    value={listingData.serialNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Your description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    rows={6}
                    autoComplete="description"
                    value={listingData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="garagiste" className="block text-sm font-medium leading-6 text-gray-900">
                  Choose a garagiste
                </label>
                <div className="mt-2">
                  <select
                    name="garagiste"
                    autoComplete="garagiste"
                    value={listingData.garagiste}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>choose ...</option>
                    <option>Youssoufia</option>
                    <option>Jdida</option>
                    <option>Marrakech</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Appointment
                </label>
                <div className="mt-2">
                  <input
                    name="date"
                    type="date"
                    autoComplete="date"
                    value={listingData.date}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

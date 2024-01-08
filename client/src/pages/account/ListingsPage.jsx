import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("/bookingByUser").then(({ data }) => {
            setBookings(data);
        });
    }, []);

    return (
        <div>
            <ul className="mx-4 mt-4 mb-2 flex flex-row justify-around">
                <li>
                    <Link to="/account/bookings" className="inline-flex gap-1 text-sm items-center text-primary font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>My Booking</p>
                    </Link>
                </li>
                <li>
                    <Link className="inline-flex gap-1 text-sm items-center text-primary font-semibold">
                        ({bookings.length}) <p>Total Booked</p>
                    </Link>
                </li>
            </ul>
            <div className="mx-4">
                <div className="bg-gray-500">
                    <div className="p-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <table className="table-auto w-full">
                                <thead className="bg-red-500 text-white shadow-lg">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Vehicle Type</th>
                                        <th className="py-3 px-4 text-left">Serial Number</th>
                                        <th className="py-3 px-4 text-left">Garagiste</th>
                                        <th className="py-3 px-4 text-left">Date Appointment</th>
                                        <th className="py-3 px-4 w-1/12">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((item) => (
                                        <tr className={`hover:bg-gray-100 ${item.status === "Rejected" ? "bg-red-300" : (item.status === "Accepted" ? "bg-green-300" : "")}`} key={item._id}>
                                            <td className="px-4 py-3">{item.vehicleType}</td>
                                            <td className="px-4 py-3">{item.serialNumber}</td>
                                            <td className="px-4 py-3">{item.garagiste}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-gray-200 px-4 py-2 rounded-lg text-gray-600">{item.Dateappointment}</span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="hover:bg-gray-300 p-1 px-2 font-bold rounded-lg focus:outline-none ">{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

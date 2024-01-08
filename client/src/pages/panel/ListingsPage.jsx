import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListingsPage() {
    const [bookings, setBookings] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        axios.get("/booking").then(({ data }) => {
            setBookings(data);
        });

        axios.get("/userCount")
            .then(response => {
                setUserCount(response.data.count);
            })
            .catch(error => {
                console.error("Error fetching user count:", error);
            });
    }, []);

    const handleReject = async (id) => {
        try {
            const data = await axios.get(`/updated/${id}?status=Rejected`);
            console.log("data", data);
            setBookings(data.data); // Assuming the updated bookings are in the `data.data` property
            showAlert("Booking Rejected", "red");
        } catch (error) {
            console.error("Error rejecting booking:", error);
        }
    };


    const handleAccept = async (id) => {
        try {
            const data = await axios.get(`/updated/${id}?status=Accepted`);
            console.log("data", data);
            setBookings(data.data); // Assuming the updated bookings are in the `data.data` property
            showAlert("Booking Accepted", "green");
        } catch (error) {
            console.error("Error accepting booking:", error);
        }
    };


    const showAlert = (message) => {
        alert(message);
    };

    return (
        <div>
            <ul className="mx-4 mt-4 mb-2 flex flex-row justify-around">
                <li>
                    <Link className="inline-flex pr-4 gap-1 text-sm items-center text-primary font-semibold">
                        ({bookings.length})<p>Total Booked</p>
                    </Link>
                    <Link className="inline-flex pl-4 gap-1 text-sm items-center text-primary font-semibold">
                        ( {userCount} )<p>Total Clients</p>
                    </Link>
                </li>
            </ul>
            <div className="mx-4">
                <div className="bg-gray-500">
                    <div className="p-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <table className="table-auto w-full">
                                <thead className="bg-lightPrimary text-white shadow-lg">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Vehicle Type</th>
                                        <th className="py-3 px-4 text-left">Serial Number</th>
                                        <th className="py-3 px-4 text-left">Garagiste</th>
                                        <th className="py-3 px-4 text-left">Date appointment</th>
                                        <th className="py-3 px-4 w-1/12">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length > 0 && bookings.map((item) => (
                                        <tr className={`hover:bg-gray-100 ${item.status === "Rejected" ? "bg-red-300" : (item.status === "Accepted" ? "bg-green-300" : "")}`} key={item._id}>
                                            <td className="px-4 py-3">{item.vehicleType}</td>
                                            <td className="px-4 py-3">{item.serialNumber}</td>
                                            <td className="px-4 py-3">{item.garagiste}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-gray-200 px-4 py-2 rounded-lg text-gray-600">{item.Dateappointment}</span>
                                            </td>
                                            <td className="px-4 py-3 text-center flex flex-row">
                                                <button
                                                    className="hover:bg-gray-300 mr-4 px-2 font-bold rounded-lg bg-red-400 focus:outline-none"
                                                    onClick={() => handleReject(item._id)}
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    className="hover:bg-gray-300 mr-4 px-2 font-bold rounded-lg bg-green-400 focus:outline-none"
                                                    onClick={() => handleAccept(item._id)}
                                                >
                                                    Accept
                                                </button>
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

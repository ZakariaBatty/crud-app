import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext"

export default function BookingWidget({listing}){
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumbeOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user){
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0;
    if (checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function handleBook(){
        const response = await axios.post("/bookings", { 
            checkIn, checkOut, numberOfGuests, name, phone, 
            price: numberOfNights * listing.price,
            listing: listing._id
        });
        const bookingId = response.data._id;
        navigate(`/account/bookings/${bookingId}`)
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl">
                <span className="font-semibold">{listing.price} DKK</span> nat
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>INDTJEKNING</label>
                        <input type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                            />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>UDTJEKNING</label>
                        <input type="date" 
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                            />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                <label>GÆSTER</label>
                <input type="number"
                        value={numberOfGuests}
                        onChange={e => setNumbeOfGuests(e.target.value)}
                        />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>FULDE NAVN</label>
                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}                        
                            />
                        <label>TELEFONNUMMER</label>
                        <input type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                ) }
            </div>
            <button onClick={handleBook} className="primary mt-4">
                Reserver
            </button>
            {checkIn && checkOut && (
                <div className="flex justify-between my-2">
                    <p className="underline">{listing.price} DKK x {numberOfNights} {numberOfNights > 1 ? "nætter" : "nat"}</p>
                    <p>{numberOfNights * listing.price} DKK</p>
                </div>
                )}
        </div>
    )
}
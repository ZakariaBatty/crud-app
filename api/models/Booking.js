const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    vehicleType: { type: String, rqeuired: true },
    serialNumber: { type: Number, rqeuired: true },
    garagiste: { type: String, rqeuired: true },
    Dateappointment: { type: Date, rqeuired: true },
    status: { type: String, rqeuired: true },
})

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
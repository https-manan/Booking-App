import hotelModel from "../models/HotelSchema.js"

export const createHotel = async (req, res) => {
    try {
        const {
            name,
            type,
            city,
            address,
            description,
            distance,
            photos = [],
            rating,
            rooms,
            cheapestPrice,
            featured = false,
            title
        } = req.body;

        if (!name || !type || !city || !address || !description || !distance || rating == null || cheapestPrice == null || !title) {
            return res.status(400).json({ msg: "All fields required" });
        }

        if (!Array.isArray(rooms) || rooms.length === 0) {
            return res.status(400).json({ msg: "Rooms are required" });
        }

        const hotelAlreadyExists = await hotelModel.findOne({ address });

        if (hotelAlreadyExists) {
            return res.status(409).json({ msg: "Hotel already listed" });
        }

        const newHotel = new hotelModel({
            name,
            type,
            city,
            address,
            description,
            distance,
            photos,
            rating,
            rooms,
            cheapestPrice,
            featured,
            title
        });

        await newHotel.save();

        res.status(201).json({
            msg: "Hotel saved successfully",
            newHotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}


export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedHotel = await hotelModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedHotel) {
            return res.status(404).json({ msg: "Hotel not found" });
        }

        res.json({
            msg: "Hotel updated successfully",
            hotel: updatedHotel,
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}


export const deleteHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedHotel = await hotelModel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ msg: "Hotel not found" });
        }
        res.json({ msg: "Hotel deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const getHotel = async (req, res) => {
  try {
    const {id} = req.params;

    const hotel = await hotelModel.findById(id);

    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}

export const getAllHotel =  async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}
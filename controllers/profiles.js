import { Profile } from "../models/profile.js";

const getAllProfile = async (req, res) => {
  try {
    const profile = await Profile.find({});
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const findOneProfile = async (req, res) => {
  try {
    let { profileId } = req.body;
    const profile = await Profile.findById(profileId).populate(
      "ticketAssignedToMe"
    );
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

export { getAllProfile, findOneProfile };

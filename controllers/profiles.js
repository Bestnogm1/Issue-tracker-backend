import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}
function findOneProfile(req, res) {
  let { profileId } = req.body;
  Profile.findById(profileId)
    .populate("ticketAssignedToMe")
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

export { index, findOneProfile };

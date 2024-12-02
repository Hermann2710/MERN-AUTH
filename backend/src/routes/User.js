const {
  login,
  register,
  getProfile,
  updateProfile,
  deleteProfile,
  updateImage,
  updatePassword,
} = require("../controllers/User");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authMiddleware, getProfile);
router.delete("/profile", authMiddleware, deleteProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile/password", authMiddleware, updatePassword);
router.put(
  "/profile/image",
  authMiddleware,
  upload.single("profileImage"),
  updateImage,
);

module.exports = router;

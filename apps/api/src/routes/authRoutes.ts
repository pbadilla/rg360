import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const FAKE_EMAIL = "rollergrind360@gmail.com";
const FAKE_PASSWORD = "Test1234";

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (email === FAKE_EMAIL && password === FAKE_PASSWORD) {
    const token = jwt.sign({ id: '1', email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

export default router;

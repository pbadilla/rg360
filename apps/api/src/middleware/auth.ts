import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-test-secret";

// Export AuthenticatedRequest interface for controllers
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  // Test mode: allow a query param to bypass real token
  if (String(req.query.test) === "true"){
    (req as any).user = { id: "rg360", email: "rollergrind@gmail.com", role: "admin" };
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }
};

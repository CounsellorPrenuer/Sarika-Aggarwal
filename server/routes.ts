import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertPaymentSchema } from "@shared/schema";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, packageName } = req.body;

      // Verify Razorpay signature
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) {
        throw new Error("Razorpay key secret not configured");
      }

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body)
        .digest("hex");

      const isValid = expectedSignature === razorpay_signature;

      if (!isValid) {
        return res.status(400).json({ success: false, error: "Invalid signature" });
      }

      // Store payment in database
      const paymentData = {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        amount: parseInt(amount),
        packageName,
        status: "success",
      };

      const payment = await storage.createPayment(paymentData);
      res.json({ success: true, payment });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

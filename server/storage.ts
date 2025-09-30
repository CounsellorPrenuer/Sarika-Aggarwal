import { db } from "./db";
import { contacts, payments, type InsertContact, type Contact, type InsertPayment, type Payment } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentByRazorpayId(razorpayPaymentId: string): Promise<Payment | undefined>;
}

export class DbStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db.insert(payments).values(insertPayment).returning();
    return payment;
  }

  async getPaymentByRazorpayId(razorpayPaymentId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.razorpayPaymentId, razorpayPaymentId));
    return payment;
  }
}

export const storage = new DbStorage();

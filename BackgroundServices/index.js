// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/BackgroundServices/index.js
import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import dbConnection from "./utils/db.js";

import sendDeliveredOrder from "./Emailservice/sendDeliveredOrder.js";
import sendPromotionEmail from "./Emailservice/sendPromotionemail.js";
import sendWelcomeEmail from "./Emailservice/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./Emailservice/sendPendingOrderEmail.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

// ------------------ CONNECT TO DB ------------------ //
dbConnection();

// ------------------ CRON JOBS (BACKUP) ------------------ //

// 1️⃣ Delivered orders - check every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Checking for delivered orders...");
  await sendDeliveredOrder();
});

// 2️⃣ Pending orders - check every 5 minutes as backup
cron.schedule("*/5 * * * *", async () => {
  console.log("Checking for pending orders as backup...");
  await sendPendingOrderEmail();
});

// 3️⃣ Promotions - first day of each month at 9 AM
cron.schedule("0 9 1 * *", async () => {
  console.log("Sending monthly promotions...");
  await sendPromotionEmail();
});

// ------------------ HTTP ENDPOINTS ------------------ //

// ✅ Trigger single welcome email
app.post("/send-welcome-email", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "UserId is required" });

  try {
    const User = (await import("./models/user.model.js")).default;
    const user = await User.findById(userId);

    if (!user || user.status !== 0) {
      return res.status(404).json({ message: "User not found or already welcomed" });
    }

    await sendWelcomeEmail(user);
    res.status(200).json({ message: "Welcome email triggered" });
  } catch (error) {
    console.error("Welcome email trigger failed:", error.message);
    res.status(500).json({ message: "Failed to send welcome email" });
  }
});

// ✅ Trigger single pending order email
app.post("/send-pending-order", async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: "OrderId is required" });

  try {
    const Order = (await import("./models/order.model.js")).default;
    const order = await Order.findById(orderId);

    if (!order || order.status !== 0) {
      return res.status(404).json({ message: "No pending order found" });
    }

    await sendPendingOrderEmail(order);
    res.status(200).json({ message: "Pending order email triggered" });
  } catch (error) {
    console.error("Pending order email trigger failed:", error.message);
    res.status(500).json({ message: "Failed to send pending order email" });
  }
});

// ------------------ SERVER ------------------ //
app.listen(PORT, () => {
  console.log(`Background service is running on port ${PORT}`);
});

import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

dotenv.config();

const sendPromotionEmail = async () => {
  try {
    const users = await User.find();
    const products = await Product.aggregate([{ $sample: { size: 5 } }]);

    if (products.length === 0 || users.length === 0) {
      console.log("No products or users for promotion email.");
      return;
    }

    for (let user of users) {
      const emailHtml = await ejs.renderFile(
        "templates/promotion.ejs",
        { products }
      );

      const messageOption = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Products for the month.",
        html: emailHtml,
      };

      try {
        await sendMail(messageOption);
        console.log(`Promotion email sent to ${user.email}`);
      } catch (sendError) {
        console.error(`Failed to send to ${user.email}:`, sendError.message);
      }
    }
  } catch (err) {
    console.error("Error in sendPromotionEmail:", err.message);
  }
};

export default sendPromotionEmail;

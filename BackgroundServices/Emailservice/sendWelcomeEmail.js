// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/BackgroundServices/Emailservice/sendWelcomeEmail.js
import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import User from "../models/user.model.js";

dotenv.config();

/**
 * Sends welcome emails.
 * 
 * - If userId is provided => sends instant welcome email for that user
 * - If no userId => sends bulk emails for all users with status 0 (cron mode)
 */
const sendWelcomeEmail = async (userId = null) => {
  let users;

  if (userId) {
    // ✅ Single user mode
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      console.log(`No user found for ID ${userId}`);
      return;
    }
    users = [singleUser];
  } else {
    // ✅ Bulk mode (cron fallback)
    users = await User.find({ status: 0 });
  }

  if (users.length > 0) {
    for (let user of users) {
      ejs.renderFile(
        "templates/welcome.ejs",
        { name: user.name },
        async (err, data) => {
          if (err) {
            console.log("Error rendering EJS template:", err);
            return;
          }

          let messageoption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Welcome to Cornells By Sterling Parfums",
            html: data,
          };

          try {
            await sendMail(messageoption);
            await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
            console.log(`Welcome email sent to ${user.email}`);
          } catch (error) {
            console.log("Failed to send welcome email:", error.message);
          }
        }
      );
    }
  }
};

export default sendWelcomeEmail;

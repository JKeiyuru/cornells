///home/jkeiyuru/Development/cornells/FullStackBeautyStore/BackgroundServices/Emailservice/sendDeliveredOrder.js
import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import Order from "../models/order.model.js";

dotenv.config();

const sendDeliveredOrder = async () => {
 const orders = await Order.find({status:2});
  if (orders.length > 0) {
    for (let order of orders) {
      ejs.renderFile(
        "templates/deliveveredorder.ejs",
        {name: order.name, products : order.products},
        async (err, data) => {
          if (err) {
            console.log("Error rendering EJS template:", err);
            return;
          }

          let messageoption = {
            from: process.env.EMAIL,
            to: order.email,
            subject: "Your order has been delivered.",
            html: data,
          };
          try {
            await sendMail(messageoption);
            await Order.findByIdAndUpdate(order._id, { $set: {status: 3} });
          } catch (error) {
            console.log(err);
          }
        }
      );
    }
  }
};
export default sendDeliveredOrder;

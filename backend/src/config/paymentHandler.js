const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const Pay = require("../models/zaloPay"); // Mô hình thanh toán Mongoose

// ZaloPay Config
const zaloPayConfig = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

// Create Order and save to database
const createOrder = async (amount) => {
  const embed_data = {
    redirecturl: "https://www.facebook.com/profile.php?id=100086570243903",
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;
  const order = {
    app_id: zaloPayConfig.app_id,
    app_trans_id: app_trans_id,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "https://9620-116-110-41-166.ngrok-free.app/callback",
  };

  const data =
    zaloPayConfig.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

  // Save to database
  const payment = new Pay({
    app_trans_id: order.app_trans_id,
    app_user: order.app_user,
    amount: order.amount,
    description: order.description,
    status: "pending",
  });

  await payment.save(); // Lưu thông tin đơn hàng vào MongoDB

  try {
    const result = await axios.post(zaloPayConfig.endpoint, null, {
      params: order,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Check Order Status
const checkOrderStatus = async (app_trans_id) => {
  const postData = {
    app_id: zaloPayConfig.app_id,
    app_trans_id,
  };

  const data =
    postData.app_id + "|" + postData.app_trans_id + "|" + zaloPayConfig.key1;
  postData.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

  try {
    const response = await axios.post(
      "https://sb-openapi.zalopay.vn/v2/query",
      null,
      {
        params: postData,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Callback Handler
const callbackHandler = async (req, res) => {
  let result = {
    return_code: 0,
    return_message: "",
  };

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = CryptoJS.HmacSHA256(dataStr, zaloPayConfig.key2).toString();
    console.log("mac =", mac);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      const dataJson = JSON.parse(dataStr);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      // Update payment status in database
      const updatedPayment = await Pay.findOneAndUpdate(
        { app_trans_id: dataJson["app_trans_id"] },
        { status: "success" }, // Chỉnh sửa trạng thái thành công
        { new: true }
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (error) {
    result.return_code = 0;
    result.return_message = error.message;
  }

  res.json(result);
};

// Payment Handler
const paymentHandler = async (req, res) => {
  try {
    const result = await createOrder(+req.body.amount);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

// Order Status Handler
const orderStatusHandler = async (req, res) => {
  const app_trans_id = req.params.app_trans_id;
  try {
    const result = await checkOrderStatus(app_trans_id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to check order status" });
  }
};

module.exports = {
  zaloPayConfig,
  createOrder,
  checkOrderStatus,
  callbackHandler,
  paymentHandler,
  orderStatusHandler,
};

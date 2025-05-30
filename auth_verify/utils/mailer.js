const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "sajjak2506@gmail.com",
    pass: "ipzj dqvf eens rtql"
  }
});

const sendOTP = async (email, otp) => {
  const htmlContent = `
  <div style="
    font-family: Arial, sans-serif; 
    max-width: 600px; 
    margin: auto; 
    border: 1px solid #eaeaea; 
    border-radius: 8px; 
    padding: 20px; 
    background-color: #f9f9f9;
    color: #333;
  ">
    <h2 style="color: #4a90e2; text-align: center;">Your OTP Code</h2>
    <p style="font-size: 16px; text-align: center;">
      Use the following One-Time Password (OTP) to complete your authentication process.
    </p>
    <div style="
      margin: 30px auto; 
      background-color: #4a90e2; 
      color: white; 
      width: fit-content; 
      padding: 15px 25px; 
      font-size: 24px; 
      font-weight: bold; 
      border-radius: 6px; 
      letter-spacing: 4px;
      text-align: center;
    ">
      ${otp}
    </div>
    <p style="font-size: 14px; color: #666; text-align: center;">
      This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    <p style="font-size: 12px; color: #999; text-align: center;">
      If you did not request this code, please ignore this email.
    </p>
  </div>
  `;

  await transporter.sendMail({
    from: '"Auth System" <noreply@auth.com>',
    to: email,
    subject: 'Your OTP Code',
    html: htmlContent
  });
};

module.exports = sendOTP;

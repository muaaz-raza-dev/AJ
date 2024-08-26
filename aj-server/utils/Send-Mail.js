
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NodeMailer_ID,
    pass: process.env.NodeMailer_pass,
  },
});

// async..await is not allowed in global scope, must use a wrapper
 async function SendMail(receiver,OTP) {
  // send mail with defined transport object
  try {
    
  
  const info = await transporter.sendMail({
    from: '"Muaaz Raza" <yourssharky@gmail.com>', // sender address
    to: receiver.email, // list of receivers
    subject: " Your One-Time Password (OTP) for Secure Access", // Subject line
    html: `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <p style="color: #555555;">Dear <strong>${receiver.username||""}</strong>,</p>
        <p style="color: #555555;">We hope this message finds you well.</p>
        <p style="color: #555555;">To enhance the security of your account, we have generated a One-Time Password (OTP) for you. Please use the following OTP to complete your authentication process:</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">${OTP}</span>
        </div>

        <p style="color: #555555;">This OTP is valid for <strong>15 minutes</strong> and can only be used once. For your security, please do not share this code with anyone. If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        
        <p style="color: #555555;"><strong>Need Help?</strong></p>
        <p style="color: #555555;">If you encounter any issues or have any questions, feel free to reach out to us at <a href="mailto:${process.env.NodeMailer_ID}" style="color: #007BFF; text-decoration: none;">
        ${process.env.NodeMailer_ID}</a>.</p>
        

        <p style="color: #555555;">Best regards,</p>
        <p style="color: #555555;"><strong>AJ Workspace Bot</strong><br>
        <strong>AJ Foundation School</strong><br>
        
        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 30px;">Note: Please do not reply directly to this email, as this inbox is not monitored. For assistance, use the contact details provided above.</p>
    </div>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  }
  catch (error) {
   console.error(error) 
  }
}

module.exports = SendMail;

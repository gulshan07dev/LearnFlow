import nodemailer from "nodemailer";
import { google } from "googleapis"


// OAuth2 Client Setup
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.REDIRECT_URI;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Create OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const sendEmail = async function (email, subject, message) {
  try {
    // Generate Access Token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USERNAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // send mail with defined transport object
    return await transporter.sendMail({
      from: `LearnFlow <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to: email, // user email
      subject: subject, // Subject line
      text: message, // html body
    });
  } catch (error) {
    throw error
  }
};

export default sendEmail;

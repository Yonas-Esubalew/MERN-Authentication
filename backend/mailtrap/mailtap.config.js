import { MailtrapClient } from ("mailtrap");
import dotenv from "dotenv"
dotenv.config()
const TOKEN = process.env.TOKEN_ENDPOINT

const mailtrapClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN, endpoint: process.env.MAILTRAP_ENDPOINT
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Yonas esubalew",
};

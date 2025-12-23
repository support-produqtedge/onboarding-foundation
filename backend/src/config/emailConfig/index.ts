import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "..";

sgMail.setApiKey(String(SENDGRID_API_KEY));

export default sgMail;

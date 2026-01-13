import { MailOptionsInterface } from "../types/mailOptionsInterface";

import sgMail from "../config/emailConfig";
import { NODE_ENV } from "../config";
import { logger } from "../utils/logger";

const MailService = async(options: MailOptionsInterface) => {
  const msg = {
    to: options.email,
    from: "subscriptions@produqtedge.com",
    subject: options.subject,
    html: options.html,
  }

  try {
    if (NODE_ENV !== 'test') {
      await sgMail.send(msg);
      logger.info(`Message sent to ${options.email}`)
    }
  } catch (error) {
    // logger.error(`Error sending mail:: ${error}`)
    console.log(error);
  }
}

export default MailService;

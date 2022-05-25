import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2a78f2f058ef36",
    pass: "6bdb4f4e5e4ef8",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Bruno Feed <oi@feedget.com>",
      to: "Bruno Kelly <brunokelly@github.com>",
      html: body,
    });
  }
}

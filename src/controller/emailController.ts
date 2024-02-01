import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const constato = async (req: Request, res: Response) => {
  let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ef94dab40f71d9",
      pass: "bd9336df231890",
    },
  });

  let message = {
    from: "alunoEstranho@gmail.com",
    to: "gabriel2005rf@gmail.com",
    replyTo: req.body.from,
    subject: req.body.subject,
    html: req.body.email,
    text: req.body.email,
  };

  let info = await transport.sendMail(message);
  console.log("Info", info);

  res.json({ success: true });
};

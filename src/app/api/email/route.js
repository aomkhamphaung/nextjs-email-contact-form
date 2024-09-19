import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let body;
  
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  const { email, name, message } = body;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () => {
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err, info) => {
        if (!err) {
          resolve('Email Sent');
        } else {
          reject(err.message);
        }
      });
    });
  };

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

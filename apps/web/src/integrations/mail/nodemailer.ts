import nodemailer from 'nodemailer'
import { serverEnv } from 'env'

const { SMTP_HOST, SMTP_USER, SMTP_PASS } = serverEnv

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  secure: true,
  port: 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

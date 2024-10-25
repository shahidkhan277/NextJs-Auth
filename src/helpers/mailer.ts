import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email , emailType , userId}:any) => {
    try {
        // Create Token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        // Create Transporter
            const transport = nodemailer.createTransport({
                 host: "sandbox.smtp.mailtrap.io",
                 port: 2525,
                 auth: {
                 user: process.env.MAIL_USER,
                 pass: process.env.MAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'afridi.sk1720@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Account" : "Reset Password",
            html: `<p> Click <a href="${process.env.DOMAIN}/
            ${emailType === "VERIFY" ? "verifyemail" : "resetPassword"}?token=${hashedToken}"> Here </a> 
            to ${emailType === "VERIFY" ? "Verify Account" : "Reset Password"}
            or copy and paste the link below in your browser <br>
            ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetPassword"}?token=${hashedToken}
             </p> `
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
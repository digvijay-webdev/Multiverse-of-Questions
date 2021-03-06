// Email fuction only for sending account activation link

const nodemailer = require("nodemailer");

const verifyAccountMail = async (email, subject, name, token) => {
    // SMTP Transporter
    let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NC_EMAIL_ADDRESS,
            pass: process.env.NC_EMAIL_PASSWORD
        },
    });

    // Sending email with defined template
    let details = await transporter.sendMail({
        from: "noreply@multiverseofquestion.com",
        to: `${email}`, // from params
        subject: subject, // from params
        text: `${token}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Multiverse Of Question</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"> 
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
        </head>
        <body style="font-family: 'Ubuntu', sans-serif;">
            <main style="width: 550px; margin: 0 auto; @media screen and (max-width: 580px) {
                width: 90%;
            }">
                <h1 style="text-align: center; color: #0a3d62;">
                    Welcome to Multiverse of Question..?
                </h1>
                <p style="color: #636e72;margin: 18px 0; text-transform: capitalize;">
                    Dear ${name},
                </p>
                <p style="color: #636e72;margin: 18px 0;">
                    You're just one step away from becoming a member of M-O-Q family. Tap/Click the button below to get started.
                </p>
                <div style=" margin: 2.5rem 0;text-align: center;">
                    <a style="text-decoration: none;
                        color: #FFF;
                        background-color: #0984e3;
                        padding: 12px 16px;
                        font-weight: bolder;
                        border-radius: 4px;" href="${token}">Verify Account</a>
                </div>
                <p style="color: #636e72;margin: 18px 0;">
                    Use the link below if above button is not working,<br>
                    <a href="${token}">${token}</a>
                </p>
        
                <hr style="color: #7f8c8d;margin-top: 2.5rem;">
        
                <small style="text-align: center;
                    display: block;
                    text-align: center;
                    color: #34495e;">Copyright ?? 2022 Multiverse of Question, All Rights Reserved.</small>
            </main>
        </body>
        </html>
        `
    });

    console.log("Message Sent: %", details.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(details));
}

module.exports = verifyAccountMail;
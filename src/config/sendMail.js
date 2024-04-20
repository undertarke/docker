
import nodemailer from 'nodemailer'
// yarn add nodemailer
// rxkf sagc dbyh pstb

export default (to, subject, text) => {
    let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sangrom2003@gmail.com",
            pass: "amrigkgwjgkuysco"
        }
    })

    configMail.sendMail(
        {
            from: "sangrom2003@gmail.com",
            to,
            subject,
            text
        }
        , (err, info) => {
            console.log(err)
            console.log(info)
        })

}


const crypto = require('crypto')
const smsID = process.env.SMS_SID
const authToken =  process.env.SMS_AUTH_TOKEN
const twilio = require('twilio')(smsID,authToken,{
    lazyLoading: true
})


class OtpService{
    verifyOtp(hashed,data){
        let newHash = crypto.createHmac('sha256', process.env.HASH_SECRET)
        .update(data)
        .digest('hex')
        
        return (newHash===hashed) 
    }

    generateOtp(){
       try{
        const hash =  Math.random() * (9999 - 1000) + 1000;
        return parseInt(hash)
       }
       catch(err){
           console.log(err)
       }
    }

    async sendOtp(phone , otp){
        try{
            return await twilio.messages.create({
                to: phone,
                from: process.env.SENDER_NUMBER,
                body: `your verification code is ${otp}`
            })
        }
        catch(err){
            console.log (err)
        }
    }
}
const otpService = new OtpService();

// hashing otp

class HashService{
    hashOtp(data){
        return crypto.createHmac('sha256', process.env.HASH_SECRET)
        .update(data)
        .digest('hex')

       
    }
}
const hashService = new HashService()
module.exports = {
    otpService,
    hashService
}
const { otpService , hashService } = require('../services/auth.services')
class Auth{
    async sendOtp(req,res) {
        const { phone }=req.body;
        if(!phone)
        {
            return res.status(400).json({message:"no phone number povided"})
        }
        // generating otp
        const otp = otpService.generateOtp();
        const expire = (1000 * 60 *2) + Date.now()
        const random = `'${phone}.${otp}.${expire}'`

        // hashing
        const hash = hashService.hashOtp(random)
        
        // send otp
        try{ 
           await otpService.sendOtp(phone,otp)
           console.log('sent otp')
           res.status(200).json({hash: `${hash}.${expire}` , phone})
        }
        catch(err){
            console.log(err)
            res.status(400).json({message:'error sending message'})
        }

        // res.status(200).json({otp : hash})
       
    }

    // verify otp
    async verifyOtp(req,res){

        const { otp , phone , hash} = req.body

        if(!otp || !phone || !hash)
        {
            return res.status(400).json({message : "error while verifying otp"})
        }

        const [hashed , expire] = hash.split('.');

        if(Date.now() > expire)
        {
            return res.status(400).json({message : "otp has expired"})            
        }

        const data = `'${phone}.${otp}.${expire}'`

        const isValid = otpService.verifyOtp( hashed,data )
        console.log(isValid)

        if(!isValid)
        {
            return res.status(400).json({message : "invalid otp"})       
        }

        return res.status(400).json({message : "otp verification successful"})  

    }
}

const AuthController = new Auth()
module.exports = AuthController
const { User } = require("../model/userSchema");

// Creating the Users //
exports.createUser = async (req, res)=>{
    
try {
    const user = new User(req.body)
    const savedUser = await user.save();
    res.status(201).json(savedUser);

} catch (error) {
    res.status(400).json(error);
}
   
}

exports.loginUser = async (req, res)=>{
    try {
        const logUser = await User.findOne({email:req.body.email}).exec();

        if(logUser){
            if(logUser.password===req.body.password){
                res.status(200).json({logUser});
                console.log({msg:"Login Successfull"});
            }
            else{
            res.status(400).json({message:"wrong User-Password"})
            }
        }
        else{
            res.status(400).json({message:"Not User-Email exists"})
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

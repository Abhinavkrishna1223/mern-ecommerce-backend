const {Brands}= require('../model/brandSchema');

exports.fetchBrands= async(req,res)=>{
    
    try {
        const brands = await Brands.find({}).exec();
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Creating the Brands //
exports.createBrands = async (req, res)=>{
    const brands = new Brands(req.body)
    
try {
    const savedBrands = await brands.save();
    res.status(201).json(savedBrands);

} catch (error) {
    res.status(401).json(error);
}
   
}
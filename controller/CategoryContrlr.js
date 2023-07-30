const {Category}= require('../model/categorySchema');

exports.fetchCategory= async(req,res)=>{
    
    try {
        const categories = await Category.find({}).exec();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
}


// Creating the Categories //
exports.createCategories = async (req, res)=>{
    const categories = new Category(req.body)
    
try {
    const savedCategories = await categories.save();
    res.status(201).json(savedCategories);

} catch (error) {
    res.status(401).json(error);
}
   
}
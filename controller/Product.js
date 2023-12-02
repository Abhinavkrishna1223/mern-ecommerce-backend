const {Product} = require('../model/product')

// Creating the Products //
exports.createProduct = async (req, res)=>{
    const product = new Product(req.body)
    
try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

} catch (error) {
    res.status(401).json(error);
}
   
}

// Fetching and filtering the products //d
exports.fetchAllProducts = async (req, res)=>{

    let query = Product.find({})
    let totalProductsQuery = Product.find({})

    
    const totalDocs = await totalProductsQuery.count().exec();

    if(req.query._page &&  req.query._limit){
        const pageSize=req.query._limit;
        const page = req.query._page;
        query =  query.skip(pageSize*(page-1)).limit(pageSize);
    }
    
    // for sorting in api through categories //
    if(req.query.category){
        query =  query.find({category:req.query.category});
        totalProductsQuery = totalProductsQuery.find({category:req.query.category});
    }

    // for sorting in api through brands //
    if(req.query.brand){
        query =  query.find({brand:req.query.brand});
        totalProductsQuery = totalProductsQuery.find({brand:req.query.brand});
    }

    // for sorting in api through filters //
    if(req.query._sort &&  req.query._order){
        query =  query.sort({[req.query._sort]:req.query._order})
    }

   if(req.query.title){

     query =  query.find({
      "$or": [
        { "title": { $regex:req.query.title, $options:"i" } }
      ]
    });

    totalProductsQuery =  totalProductsQuery.find({
      "$or": [
        { "title": { $regex:req.query.title, $options:"i" } }
      ]
    });
   }
    
try {
    const filterProducts = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(201).json(filterProducts)

} catch (error) {
    res.status(401).json(error);
}
   
}

exports.fetchProductsById= async(req,res)=>{
  const {id} = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);

} catch (error) {
    res.status(400).json(error);
}

}

exports.updateProductsById= async(req,res)=>{
    const {id} = req.params;
    
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(400).json(error);
  }
  
  }

// exports.searchProducts = async (req, res) => {

//     try {
//       const { title } = req.body; // Extracting the title from the request body
  
//       if (!title) {
//         return res.status(400).json({req:req.body, msg:"No title passed"});
//       }
  
//       let productSearched = await Product.find({
//         "$or": [
//           { "title": { $regex:title, $options:"i" } }
//         ]
//       });
  
//       console.log(productSearched);
//       res.status(200).json(productSearched);
//     } catch (error) {
//       res.status(400).json({ msg: error });
//     }
//   }
  




const Product = require("../models/product");

const getAllProductsStatic = async (req,res) =>{
     const products = await Product.find({});
     const count = await Product.countDocuments();
     res.status(200).json({msg:"success",count, all_products: products});
}
const getAllProducts = async (req,res) =>{
     const {featured, company, name, sort, fields, numericFilters} = req.query;
     const queries = {};
     if(featured){
          queries.featured = featured === 'true'? true : false;
     }
     if(company){
          queries.company = company;
     }
     if(name){
          queries.name = {$regex : name, $options : "i"}
     }
     if(numericFilters){
          const options = ['price', 'rating'];
          const comparisonMap = {
               "<" : "$lt",
               "<=" : "$lte",
               ">" : "$gt",
               ">=" : "$gte",
               "=" : "$eq"
          }
          const regEx = /\b(>|>=|<|<=|=)\b/ ;
          let filters = numericFilters.split(",").map((eachFilter)=>{
               return eachFilter.replace(regEx, (match)=>{
                    return `-${comparisonMap[match]}-`
               })
          })
          filters.map((filter)=>{
               const options = ['price', 'rating']
               const [field, operator, value] = filter.split("-");
               if(options.includes(field)){
                    queries[field] = {[operator] : Number(value)}
               }
          })
     }
     let result = Product.find(queries);

     if(sort){
          result = result.sort(sort.replace(",", " "))
     }
     if(fields){
          result= result.select(fields.replace(",", " "));
     }
     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 5;
     const skip = (page-1)*limit;
     result = result.skip(skip).limit(limit);

     console.log(queries)

     const allProducts = await result;
     res.status(200).json({status:"success",page:page,nbHit:allProducts.length, data:allProducts});
}

module.exports = {getAllProductsStatic, getAllProducts};
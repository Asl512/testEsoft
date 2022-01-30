const { Schema,model } = require("mongoose");

const schema = new Schema({
    id:  {type: Number},  
    floor:  {type: Number},    
    pos_on_floor:  {type: Number},
    price:  {type: Number}, 
    rooms:  {type: Number},                 
    area_total:  {type: String},           
    area_kitchen:  {type: String},    
    area_live:  {type: String},           
    layout_image:  {type: String}
    
})

module.exports = model("Apartment",schema)
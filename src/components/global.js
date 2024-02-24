const colorObj = [
	{"label": "Multi", "code": "linear-gradient(to right, red, yellow, green, blue)", "color": "#000000"},
    {"label": "Blue", "code": "#0000FF", "color": "#FFFFFF"},
    {"label": "Yellow", "code": "#FFFF00", "color": "#000000"},
    {"label": "Black", "code": "#000000", "color": "#FFFFFF"},
    {"label": "White", "code": "#FFFFFF", "color": "#000000"},
    {"label": "Grey", "code": "#808080", "color": "#FFFFFF"},
    {"label": "Reds", "code": "#FF0000", "color": "#FFFFFF"},
    {"label": "Pink", "code": "#FFC0CB", "color": "#000000"},
    {"label": "Orange", "code": "#FFA500", "color": "#FFFFFF"},
    {"label": "Green", "code": "#008000", "color": "#FFFFFF"},
	{"label": "Navy Blue", "code": "#000080", "color": "#FFFFFF"},
    {"label": "Brown", "code": "#654321", "color": "#FFFFFF"},
    {"label": "Beige", "code": "#c5bf9c", "color": "#000000"},
	{"label": "Maroon", "code": "#800000", "color": "#FFFFFF"},
	{"label": "Purple", "code": "#800080", "color": "#FFFFFF"},
	{"label": "Silver", "code": "#C0C0C0", "color": "#000000"},
	{"label": "Mustard", "code": "#C0B078", "color": "#FFFFFF"},
	{"label": "Gold", "code": "#FFD700", "color": "#000000"},
	{"label": "Magenta", "code": "#FF00FF", "color": "#FFFFFF"},
	{"label": "Olive", "code": "#808000", "color": "#FFFFFF"},
	{"label": "Deep Ocean Blue", "code": "#107889", "color": "#FFFFFF"},
    {"label": "Cerulean Blue", "code": "#0286c9", "color": "#FFFFFF"},
    {"label": "Royal Blue", "code": "#0649b0", "color": "#FFFFFF"},
    {"label": "Moon Glow", "code": "#FCFEDA", "color": "#000000"},
    {"label": "Salmon", "code": "#f0728c", "color": "#FFFFFF"},
    {"label": "Parrot Green", "code": "#beea4f", "color": "#FFFFFF"},
    {"label": "Rifle Green", "code": "#40584b", "color": "#FFFFFF"},
    {"label": "Magenta", "code": "#c11771", "color": "#FFFFFF"},
    {"label": "Light Teal", "code": "#a0f9fc", "color": "#000000"}
    ];

const priceOptionForWomen = [
    {"price": "0-300",       label: "Under ₹300"},
    {"price": "300-500",     label: "₹300 - ₹500"},
    {"price": "500-750",     label: "₹500 - ₹750"},
    {"price": "750-1000",    label: "₹750 - ₹1,000"},
    {"price": "1000-1500",   label: "₹1,000 - ₹1,500"},
    {"price": "1500-100000", label: "Over ₹1,500"}
]

const occasion = [
    {"value": "Evening", label: "Evening"},
    {"value": "Ceremony", label: "Ceremony"},
    {"value": "Casual", label: "Casual"},
    {"value": "Party & Festive", label: "Party & Festive"},
    {"value": "Wedding & Festive", label: "Wedding & Festive"},
    {"value": "Daily Wear", label: "Daily Wear"}
];

const careInstruction = [
    {"value": "Dry Clean Only", label: "Dry Clean Only"},
    {"value": "Hand Wash Only", label: "Hand Wash Only"},
    {"value": "Machine Wash", label: "Machine Wash"},
]

const reasonsForCancellation = {}
reasonsForCancellation["1"]="Expected delivery time is too long"
reasonsForCancellation["2"]="Wrong address Selected"
reasonsForCancellation["3"]="Incorrect product size/color/type ordered"
reasonsForCancellation["4"]="Product not required anymore"
reasonsForCancellation["5"]="Product price has mistake"
reasonsForCancellation["6"]="Ordered by mistake"
reasonsForCancellation["7"]="Purchased product from somewhere else";


const kurtiHash = [
    {
        quantityHeader: "Quantity XS 75 cm = 28 Inches",
        quantityName: "quantityXs",
        quantityBuyPriceHeader: "Quantity XS Buy Price",
        quantityBuyPriceName: "quantityXs_buy_price",
        
        quantityMrpPriceHeader: "Quantity XS MRP Price",
        quantityMrpPriceName: "quantityXs_mrp_price",
        
        quantitySellPriceHeader: "Quantity XS Sell Price",
        quantitySellPriceName: "quantityXs_selling_price",
    },{
        quantityHeader: "Quantity S 80 cm = 30 Inches",
        quantityName: "quantityS",
        quantityBuyPriceHeader: "Quantity S Buy Price",
        quantityBuyPriceName: "quantityS_buy_price",
        
        quantityMrpPriceHeader: "Quantity S MRP Price",
        quantityMrpPriceName: "quantityS_mrp_price",
        
        quantitySellPriceHeader: "Quantity S Sell Price",
        quantitySellPriceName: "quantityS_selling_price",
    },{
        quantityHeader: "Quantity L 90 cm = 3 Inches",
        quantityName: "quantityL",
        quantityBuyPriceHeader: "Quantity L Buy Price",
        quantityBuyPriceName: "quantityL_buy_price",
        
        quantityMrpPriceHeader: "Quantity L MRP Price",
        quantityMrpPriceName: "quantityL_mrp_price",
        
        quantitySellPriceHeader: "Quantity L Sell Price",
        quantitySellPriceName: "quantityL_selling_price",
    },{
        quantityHeader: "Quantity M 85 cm = 32 Inches",
        quantityName: "quantityM",
        quantityBuyPriceHeader: "Quantity M Buy Price",
        quantityBuyPriceName: "quantityM_buy_price",
        
        quantityMrpPriceHeader: "Quantity M MRP Price",
        quantityMrpPriceName: "quantityM_mrp_price",
        
        quantitySellPriceHeader: "Quantity M Sell Price",
        quantitySellPriceName: "quantityM_selling_price",
    },{
        quantityHeader: "Quantity XL 95 cm = 36 Inches",
        quantityName: "quantityXl",
        quantityBuyPriceHeader: "Quantity XL Buy Price",
        quantityBuyPriceName: "quantityXl_buy_price",
        
        quantityMrpPriceHeader: "Quantity XL MRP Price",
        quantityMrpPriceName: "quantityXl_mrp_price",
        
        quantitySellPriceHeader: "Quantity XL Sell Price",
        quantitySellPriceName: "quantityXl_selling_price",
    },{
        quantityHeader: "Quantity 2XL 100 cm = 38 Inches",
        quantityName: "quantity2Xl",
        quantityBuyPriceHeader: "Quantity 2XL Buy Price",
        quantityBuyPriceName: "quantity2Xl_buy_price",
        
        quantityMrpPriceHeader: "Quantity 2XL MRP Price",
        quantityMrpPriceName: "quantity2Xl_mrp_price",
        
        quantitySellPriceHeader: "Quantity 2XL Sell Price",
        quantitySellPriceName: "quantity2Xl_selling_price"
    }
];

const sareeHash = [{
    quantityHeader: "Quantity",
    quantityName: "quantity",
    quantityBuyPriceHeader: "Quantity Buy Price",
    quantityBuyPriceName: "quantity_buy_price",
    
    quantityMrpPriceHeader: "Quantity MRP Price",
    quantityMrpPriceName: "quantity_mrp_price",
    
    quantitySellPriceHeader: "Quantity Sell Price",
    quantitySellPriceName: "quantity_selling_price"
}];

const blouseHash = [{
    quantityHeader: "Quantity 32",
    quantityName: "quantity32",
    quantityBuyPriceHeader: "Quantity 32 Buy Price",
    quantityBuyPriceName: "quantity32_buy_price",

    quantityMrpPriceHeader: "Quantity MRP Price",
    quantityMrpPriceName: "quantity32_mrp_price",

    quantitySellPriceHeader: "Quantity 32 Sell Price",
    quantitySellPriceName: "quantity32_selling_price"
},{
	quantityHeader: "Quantity 34",
	quantityName: "quantity34",
	quantityBuyPriceHeader: "Quantity 34 Buy Price",
	quantityBuyPriceName: "quantity34_buy_price",
	
	quantityMrpPriceHeader: "Quantity 34 MRP Price",
	quantityMrpPriceName: "quantity34_mrp_price",
	
	quantitySellPriceHeader: "Quantity 34 Sell Price",
	quantitySellPriceName: "quantity34_selling_price"
},{
	quantityHeader: "Quantity 36",
	quantityName: "quantity36",
	quantityBuyPriceHeader: "Quantity 36 Buy Price",
	quantityBuyPriceName: "quantity36_buy_price",
	
	quantityMrpPriceHeader: "Quantity 36 MRP Price",
	quantityMrpPriceName: "quantity36_mrp_price",
	
	quantitySellPriceHeader: "Quantity 36 Sell Price",
	quantitySellPriceName: "quantity36_selling_price"
}]

// 1 = Saree, 2 = Kurti, 3 = Jewellery, 4 = Gown, 5 = Leggings, 6 = Kurta Sets & Salwar Suits, 7 = Ceramic Flower Pot, 8 = Blouse, 10 = Jockey Inner Wear
const productQuentityHash = {
    "1": sareeHash,
    "2": kurtiHash,
    "3": sareeHash,
    "4": kurtiHash,
    "5": blouseHash,
    "6": kurtiHash,
    "7": sareeHash,
    "8": blouseHash,
    "10": blouseHash
}

const globalVariable = {
    "admin_product_image_url": "/images/product/",
    "product_bill": "",
    "axios_url": "http://localhost:8081/api",
	//"axios_url": "https://backendnode.nomimart.in:443/api",
    "color": colorObj,
    "priceOptionForWomen": priceOptionForWomen,
    "occasion": occasion,
    "careInstruction": careInstruction,
    "reasonsForCancellation": reasonsForCancellation,
    //"productImageUrl": "images/product/"
    "productImageUrl": "https://bskart.com/images/product/",
    "categoriesImageUrl": "https://bskart.com/images/categories/",
    "billImageUrl": "https://bskart.com/images/bill/",
    "kurtiCatIds": [2, 6],
    "sareeCatIds": [1],
    "jewelleryCatIds": [3],
    "blouseCatIds": [8, 10],
    "tree": [7],
    "Saree": " / ( শাড়ি )",
    "Kurti": " / ( কুর্তি )",
    "productQuentityHash": productQuentityHash
};
export default globalVariable;
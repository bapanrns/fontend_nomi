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
reasonsForCancellation["7"]="Purchased product from somewhere else"

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
    "Saree": " / ( শাড়ি )",
    "Kurti": " / ( কুর্তি )"
};
export default globalVariable;
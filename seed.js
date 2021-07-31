const mongoose = require("mongoose");
const Food = require("./models/food");
const arr = [
  {
    foodName: "Noodeles",
    foodDesc: "Fast-Food, Spicy",
    rating: 4,
    price: 350,
    deliveryTime: "25min",
    restraunt: "Foodies Reestraunt",
    foodImg:
      "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bm9vZGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "fast-food",
  },
  {
    foodName: "Pasta",
    foodDesc: "Delicious, Spicy",
    rating: 3,
    price: 250,
    deliveryTime: "10min",
    restraunt: "Foodies Reestraunt",
    foodImg:
      "https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "fast-food",
  },
  {
    foodName: "French Fries",
    foodDesc: "Crispy, Spicy",
    rating: 3,
    price: 200,
    deliveryTime: "20min",
    restraunt: "Foodies Restraunt",
    foodImg:
      "https://images.unsplash.com/photo-1584378868074-1ebfd5a636c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "fast-food",
  },
  {
    foodName: "Pizza",
    foodDesc: "Fast-Food, Spicy",
    rating: 5,
    price: 450,
    deliveryTime: "30min",
    restraunt: "Foodies Reestraunt",
    foodImg:
      "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "fast-food",
  },
  {
    foodName: "Coffee",
    foodDesc: "Fast-Food, Spicy",
    rating: 4,
    price: 350,
    deliveryTime: "25min",
    restraunt: "Foodies Reestraunt",
    foodImg:
      "https://images.unsplash.com/photo-1619970291267-0e61f239c59e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "Beverages",
  },
  {
    foodName: "Curry",
    foodDesc: "Fast-Food, Spicy",
    rating: 4,
    price: 350,
    deliveryTime: "25min",
    restraunt: "Foodies Reestraunt",
    foodImg:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3Vycnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateagory: "veg",
    foodType: "Dish",
  },
];

const seed = async () => {
  await Food.insertMany(arr);
  console.log("DB seeded");
};

module.exports = seed;

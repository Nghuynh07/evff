# Echo Valley Family Farm

### Description:
This is a full-stack ecommerce websit for a coworker startup business. Client mainly wants customers able to order products online. For this project, I took 2 udemy classes:
Node.JS, Express, MongoDB from Jonas Schmedtmann for backend implementation and MERN stack React Node Ecommerce from Ryan Dhungel mainly for front-end. This website is
entirely done by using the MERN stack.

## Project Features:
- User Authentications with roles. This allows wholesale to get 40% discount of all farm products.
- Cart using localStorage
- CRUD implementations for admin and CRUD for customers (add, edit and remove items from cart)
- Purchase history/orders for different type of users. Admin will see all orders while regular users will only see orders history pertain to his/her
- brainTree payment system is implemented for backend but is not used
- Website is responsive using CSS grid and flexbox
- All effects and anmiation is purely from CSS
- There are a few more features that client is planning on adding in the near future: aquaponics system, news, u-pick, and a working online payment system.

## Packages:
- Axios
- Bcryptjs
- compression
- Cookie-parser
- Cors
- Dotevn
- Express
- Express-mongo-sanitize
- Express-rate-limit
- Hpp
- Jsonwebtoken
- Mongoose
- Morgan
- Multer
- Nodemailer (Only during development for password recovery. This is still under progress)
- Nodemon
- Sharp (Resize images for multer when uploading product/user photo
- Validator
- Xss-clean


## Challenges:
- Intended to use redux for application wide data management; however, some features did not work properly as intended. There, I ended up using context API, react hooks
- to manage and persist data. 
- There were some issues with design being not responsive. I solve this by learning CSS grid and media queries by taking additional advance CSS class on udemy
- Still unsolve issues of 'uncaught in promises'. This is rather strange because it works perfectly in development but not in production. The application is communicating
with the server because some API such as login/logout/sign up are working but validations did not work and view order is history shown 'uncaught in promise' errors
- Ran into cors issues during development but solve this my implementing 'Access-Control-Allow-Origin' to *

## Front-End installation
 - npx create-react-app <your project name>
 - npm install react-router-dom@5 react-redux @reduxjs/tookkit
  
## Back-end installation
 - npm install * packages listed in "packages" section
  
## Credit
 - Product images are taken from googling
 - Thank you Jonas Schmedtmann from Udemy for his course on backend. He also teaches other courses include Complete JavaScript Course, Advance CSS, SASS with Flexbos, Grid, Animation. I have taken all of his courses. Very detail recommended :)
 - Thank you Ryan Dhungel from Udemy for your amazing ecommerce course. It contain both front and back end; however, I was particular interested in front-end.
 - Thank you Code And Create on Udemy for your amazing web development classes on HTML, CSS animation and Vanilla Javascript. I have learns a tons about DOM manipulation.
 - Thank you all for being part of my learning journey to become a front-end development. Not sure if you guys will ever see this but THANK YOU





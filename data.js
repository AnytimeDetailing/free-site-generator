// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// Data
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

// code libraries
var _ = require('lodash');


// Variables
var companyname = "||companyname||";
var scheduleurl = "||a full http://url for any scheduling site you use||";
var phonenumber = "||(555)555-5555||";
var contactemail = "||Your main company e-mail||";
var ownername = "||Your Name||";
var city = "||The area(s) you service||";
var state = "||Your state||";
var banners = ["car","polish","wetsand"]; //background .jpg images in ./images/banner



// /--\--/--\--/--\
// packages listing
// \--/--\--/--\--/
var packages_detailing = [
    { name: "Name of the package",
    time: "1.5 to 3",
    cost: "198 [ Cost of the package",
    exterior: ["||List of features||","||List of features||","||List of features||"],
    interior: ["||List of features||","||List of features||","||List of features||"],
    icon: "fa fa-certificate", // font awesome icon used
    img: "images/service/service_1.jpg", //image used for the package
    alt: "a bronze checkered background incidating quality of service" }, //alternitive text for visually impared and SEO 
    
    { name: "Name of the package",
    time: "4 to 5",
    cost: "||349 Cost of the package||",
    exterior: ["||List of features||","||List of features||","||List of features||"],
    interior: ["||List of features||","||List of features||","||List of features||"],
    icon: "fa fa-award",
    url: "",
    img: "images/service/service_2.jpg",
    alt: "a silver checkered background incidating quality of service" },
    
    { name: "Name of the package",
    time: "6 to 7",
    cost: "||449||",
    exterior: ["||List of features||","||List of features||","||List of features||"],
    interior: ["||List of features||","||List of features||","||List of features||"],
    icon: "fa fa-medal",
    url: "",
    img: "images/service/service_3.jpg",
    alt: "a gold checkered background incidating quality of service" },
]


// Hours
var hoursshort = "Monday-Friday 9:00AM - 5:00PM";
var week = [
    {name: "Monday", string: "9:00 AM - 5:00 PM"},
    {name: "Tuesday", string: "9:00 AM - 5:00 PM"},
    {name: "Wednesday", string: "9:00 AM - 5:00 PM"},
    {name: "Thursday", string: "9:00 AM - 5:00 PM"},
    {name: "Friday", string: "9:00 AM - 5:00 PM"},
    {name: "Saturday", string: "Closed"},
    {name: "Sunday", string: "Closed"},
];

// Carosel
var carousel_array = [
    { img: "/images/slider/slider-1.jpg",
    smalltext: "||small text||",
    headertext: "||Quality <span>Detailing</span>||",
    maintext: "||Company motto||",
    buttontext: "Schedule Now",
    buttonlink: scheduleurl},
    { img: "/images/slider/slider-2.jpg",
    smalltext: "",
    headertext: "Only <span>The Best</span>",
    maintext: "||Text to appear on this carosel image||",
    buttontext: "Call " + phonenumber + " to order",
    buttonlink: "tel://+1" + _.replace(phonenumber,/(\(|\)|\-)/gi,"") //code replaces phonenumber human readable decorations to make this link work
    }
];


//ALLDATA
var data = { 
    name: companyname,
    companyname: companyname,
    page: {},
    phonenumber: phonenumber,
    contactemail: contactemail,
    hours: {general: hoursshort, week: week},
    city: city,
    location: city + ", " + state,

    social_media: [
        {name: "facebook",
        icon: "fab fa-facebook",
        url: "https://www.facebook.com/detailinganytime/"},
        {name: "twitter",
        icon: "fab fa-twitter",
        url: ""},
        {name: "instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/anytime_detailing/"},
    ],
    external_link: {"schedule": scheduleurl},

    carousel: carousel_array,

    banners: banners,

    recentprojects: [],

    //This area defines other services you offer like headlight resoratation, etc. Each one also makes a seprate page futher describing the 
    //the first service on this list is designed to 
    packages: packages_detailing,
    services: [
        { name: "Full-Range Detailing",
        desc: "||Do you need a quick interior cleaning or a full scrubdown? We have the perfect service for your vehicle.||",
        icon: "fa fa-map-pin",
        url: "", //url the customer is sent to if they click
        img: "images/service/service_img1.jpg",
        alt: "soapy car grill being cleaned with a brush", //alt text for visually impaired

        imgs: ["images/service/headlights_1.jpg","images/service/headlights_2.jpg","images/service/headlights_3.jpg"],
        brief: ["Not just a quick wash."],
        detailed: ["<h3>Washing</h3>","All the things we do",
        "<h3>Clay</h3>","All the clay things",
        "<h3>Polish</h3>","All the clay things",
        "<h3>Seal</h3>","Finally, the paint is protected with a sealant or wax. [ All the clay things"],
        review: ["Summary about the service"],
        list: ["Hand Wash","Clayed to perfection","Polish","Seal","Interior vaccum","..More details on main page"],
        options: [
            {name: packages_detailing[0].name,
            price: packages_detailing[0].cost,
            tag: "Good",
            list: _.concat(_.sampleSize(_.concat(packages_detailing[0].interior,packages_detailing[0].exterior), 5),[".. and more (see main page for full list)"])},
            {name: packages_detailing[1].name,
            price: packages_detailing[1].cost,
            tag: "Better",
            list: _.concat(_.sampleSize(_.concat(packages_detailing[1].interior,packages_detailing[1].exterior), 5),[".. and more (see main page for full list)"])},
            {name: packages_detailing[2].name,
            price: packages_detailing[2].cost,
            tag: "Best",
            list: _.concat(_.sampleSize(_.concat(packages_detailing[2].interior,packages_detailing[2].exterior), 5),[".. and more (see main page for full list)"])}
        ]},

        { name: "Headlight Restoration",
        desc: "Headlight plastic yellows and fades over time. We polish your headlights back to life and seal them with a yearlong protective coating.",
        icon: "icon-solution",
        url: "",
        img: "images/service/service_img2.jpg",
        alt: "a brilliant car headlight sparkles in indoor lighting",

        imgs: ["images/service/headlights_1.jpg","images/service/headlights_2.jpg","images/service/headlights_3.jpg"],
        brief: ["Dull, yellow, fogged up headlights can be hazard while driving."],
        detailed: ["We use 3 step process to clean and restore your yellow, fogged up and cloudy headlights."],
        list: ["||step1||","||step2||","||step3||", "||step4||", "||step5||"],
        options: [
            {name: "Per headlight",
            price: "50 per headlight",
            tag: "Best",
            list: ["5 year coating","included free in Premium Details"]
            },
            {name: "New Headlight",
            price: "200+",
            list: ["Please call about your year and model","Cannot be performed if bumper removal is required"]
            }
        ]},

        { name: "Paint Restoration",
        desc: "||Paint not what it once was? Let us polish your car to a long lasting shine!||",
        icon: "icon-car_2",
        url: "",
        img: "images/service/service_img3.jpg",
        alt: "a red car hood separated in two with a piece of tape. One side reflects light almost like a mirror, while the other displays a flat dull color",
    
        imgs: ["images/service/headlights_1.jpg","images/service/headlights_2.jpg","images/service/headlights_3.jpg"],
        brief: ["Clearcoat is key to a car's gloss"],
        detailed: ["<h3>Paint Correction</h3>","||Using special compounds and equipment, we machine polish the vehicle's paint||",
        "<h2>Process</h2>",
        "<h3>1</h3> ||what we do in step 1||",
        "<h3>2</h3> ||what we do in step 2||",
        "<h3>3</h3> ||what we do in step 3||"],
        list: [""],
        options: [
            {name: "Quick Correction", //name of service level
            price: "200-$300", //price
            tag: "Great", //short text that appears as a decoration
            desc: "||short description of the service level||", //longer text describing the option
            list: ["||list of features||","||list of features||"]
            },
            {name: "Show Ready",
            price: "400-$600",
            tag: "Best",
            desc: "||short description of the service level||",
            list: ["||list of features||","||list of features||"]
            }
        ]},
    ],


    gallery: [
        // These are auto-generated from your ./images/gallery files

        //but if you wanted to statically define them they might look like this:
        // {img: "gallery_1b.jpg", line1:"Before"},
        // {img: "gallery_1a.jpg", line1:"After"},
        // {img: "gallery_2b.jpg", line1:"Before"},
        // {img: "gallery_2a.jpg", line1:"After"},
    ],


    tickers: [
        {img: "images/clients/r-blog.png", url:"gallery.html"},
        {img: "images/clients/r-eagleone.png"},
        {img: "images/clients/r-malco.png"},
        {img: "images/clients/r-ps.png"},
        {img: "images/clients/r-sema.png"},
        {img: "images/clients/r-mothers.png"},
        {img: "images/clients/r-menzerna.png"},
        {img: "images/clients/r-sonax.png"},
    ],


    // two testimonials are listed. Recomended that you add many more.
    testimonials: [
        {name: "Christina C.", //customer's name
        car: "2019 F250", //[optional] the vehicle that was serviced
        text: "Saved me a bundle!", //what the customer wants to say
        stars: 5, //rating is 1-5
        service: "Express Detail", //[optional] the service the customer is reviewing
        img: "f/1.jpg" //avatar image for the customer
        },
        {name: "Joseph Cunningham",
        car: "2018 Xterra", //snickers
        text: "The work made my car look brand new. " + ownername + " is great!",
        stars: 5,
        service: "Paint Correction",
        img: "m/1.jpg"
        }
    ],

    //Links on the very bottom of the page
    footerlinks: [
        {text: "Home", url: "index.html"},
        {text: "Terms of Service", url: "tos.html"},
    ]
};


// /--\--/--\--/--\
// Perform some shuffling of data to keep the site fresh in google's eyes
// \--/--\--/--\--/

//change order of testimonials
data.testimonials = _.shuffle(data.testimonials);

// export data var for use in the larger application
console.log("data.js completed with success");
module.exports = data;

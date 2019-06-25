// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// Data
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

var _ = require('lodash');


// Vars
var companyname = "Anytime Detailing";
var scheduleurl = "[ a full http://url for any scheduling site you use ]";
var phonenumber = "(555)555-5555";
var contactemail = "[ Your main company e-mail ]";
var ownername = "[ Your Name ]";
var city = "[ The area(s) you service]";
var state = "[ Your state ]";
var banners = ["car","polish","wetsand"]



// /--\--/--\--/--\
// packages listing
// \--/--\--/--\--/
// 
// Express Detail
var detail1_out = [
    "[ Steps in your level 1 detail]",
    "Hand wash",
    "Doorjams clean",
    "Tires washed",
    "Tires shined"
]
var detail1_in = [
    "[ Steps in your level 1 detail]",
    "Trunk cleaned and vacuumed",
    "Floormats and carpets shampooed",
    "Plastic protectant applied"
]
// Superior Detail
var detail2_out = [
    "[ Steps in your level 2 detail]",
    "Hand wash",
    "Tires washed",
    "Tires shined",
]
var detail2_in = [
    "[ Steps in your level 2 detail]",
    "All belts cleaned",
    "All trim dressed",
    "Headliner cleaned",
]

// Premium Detail
var detail3_out = _.clone(detail2_out);
    // detail3_out.shift()
    // detail3_out.unshift("Four-step foam wash")
    detail3_out.push(
        "[ Steps in your level 3 detail]",
        "All trim dressed",
        "Windows, Mirrors & Sunroof are cleaned",
    )
var detail3_in = _.clone(detail2_in);
    detail3_in.push(
        "[ Steps in your level 3 detail]",
        "2nd stage deep vacuum",
        "Trunk cleaned and vacuumed",
        "Floormats and carpets shampooed",
    )


// packages_detailing
var packages_detailing = [
    { name: "[ Name of the package ]",
    time: "1.5 to 3 [ number of hours]",
    cost: "198 [ Cost of the package ]",
    exterior: _.uniq(detail1_out),
    interior: _.uniq(detail1_in),
    icon: "fa fa-certificate", // font awesome icon used
    img: "images/service/service_1.jpg", //image used for the package
    alt: "a bronze checkered background incidating quality of service" }, //alternitive text for visually impared and SEO 
    
    { name: "[ Name of the package ]",
    time: "4 to 5 [ number of hours]",
    cost: "349 [ Cost of the package ]",
    exterior: _.uniq(detail2_out),
    interior: _.uniq(detail2_in),
    icon: "fa fa-award",
    url: "",
    img: "images/service/service_2.jpg",
    alt: "a silver checkered background incidating quality of service" },
    
    { name: "[ Name of the package ]",
    time: "6 to 7",
    cost: "449",
    exterior: _.uniq(detail3_out),
    interior: _.uniq(detail3_in),
    icon: "fa fa-medal",
    url: "",
    img: "images/service/service_3.jpg",
    alt: "a gold checkered background incidating quality of service" },
]


// Hours
var week = [
    {name: "Monday", open: 5, close: 18, string: "9:00 - 17:00"},
    {name: "Tuesday", open: 5, close: 18, string: "9:00 - 17:00"},
    {name: "Wednesday", open: 5, close: 18, string: "9:00 - 17:00"},
    {name: "Thursday", open: 5, close: 18, string: "9:00 - 17:00"},
    {name: "Friday", open: 5, close: 18, string: "9:00 - 17:00"},
    {name: "Saturday", open: 5, close: 18, string: "Closed"},
    {name: "Sunday", open: 5, close: 18, string: "Closed"},
]

// Carosel
var carousel_array = [
    { img: "/images/slider/slider-1.jpg",
    smalltext: "We offer",
    headertext: "Quality <span>Detailing</span>",
    maintext: "We turn the car you drive back into the car you love!",
    buttontext: "Schedule Now",
    buttonlink: scheduleurl},
    { img: "/images/slider/slider-2.jpg",
    smalltext: "",
    headertext: "Only <span>The Best</span>",
    maintext: "[ Text to appear on this carosel image ]",
    buttontext: "Call " + phonenumber + " to order",
    buttonlink: "tel://+1" + _.replace(phonenumber,/(\(|\)|\-)/gi,"") //replace phonenumber decorations to make this link work
    }
]



//ALLDATA
var data = { name: companyname,
    page: {},
    phonenumber: phonenumber,
    contactemail: contactemail,
    hours: {general: "Monday-Friday 9:00AM - 5:00PM", week: week},
    city: city,
    location: city + ", " + state,

    social_media: [
        {name: "facebook",
        icon: "fab fa-facebook",
        url: "https://www.facebook.com/Anytime-Detailing-2383311868546835"},
        {name: "twitter",
        icon: "fab fa-twitter",
        url: ""},
        {name: "instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/detailinganytime/"},
    ],
    external_link: {"schedule": scheduleurl},

    carousel: carousel_array,

    banners: banners,

    recentprojects: [],

    packages: packages_detailing,
    services: [
        { name: "Full-Range Detailing",
        desc: "Do you need a quick interior cleaning or a full scrubdown? We have the perfect service for your vehicle.",
        icon: "fa fa-map-pin",
        url: "",
        img: "images/service/service_img1.jpg",
        alt: "soapy car grill being cleaned with a brush", //alt text for visually impared and 

        imgs: ["images/service/headlights_1.jpg","images/service/headlights_2.jpg","images/service/headlights_3.jpg"],
        brief: ["Not just a quick wash."],
        detailed: ["<h3>Washing</h3>","[ All the things we do ]",
        "<h3>Clay</h3>","[ All the clay things ]",
        "<h3>Polish</h3>","[ All the clay things ]",
        "<h3>Seal</h3>","Finally, the paint is protected with a sealant or wax. [ All the clay things ]"],
        review: ["[ Summary about the service ]"],
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
        list: ["Yellowing layers removed","Haze and scratches sanded down","Strip old factory coating off", "Apply an appropriate thickness of a new coating", "Buff to a crystal clear shine"],
        options: [
            {name: "New coating, no correction",
            price: "25 per headlight",
            tag: "Good",
            list: ["5 year coating","Best if headlights are clear already","Included free in Superior and Premium Details"]
            },
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
        desc: "Paint not what it once was? It's time to experience our 2 step paint restoration and bring back your cars factory mirror finish.",
        icon: "icon-car_2",
        url: "",
        img: "images/service/service_img3.jpg",
        alt: "a red car hood separated in two with a piece of tape. One side reflects light almost like a mirror, while the other displays a flat dull color",
    
        imgs: ["images/service/headlights_1.jpg","images/service/headlights_2.jpg","images/service/headlights_3.jpg"],
        brief: ["Clearcoat is key to a car's gloss"],
        detailed: ["<h3>Paint Correction</h3>","Using special compounds and equipment, we machine polish the vehicle's paint",
        "<h2>Process</h2>",
        "<h3>1</h3>","Once the paint is clean and ready for correction, we inspect the clearcoat using specialized lighting, meters, and expertice.",
        "<h3>2</h3>","We determine the level of correction that can safely be performed",
        "<h3></h3>",""],
        list: [""],
        options: [
            {name: "Quick Correction",
            price: "200-$300",
            tag: "Great",
            desc: "[ short description of the service level ]",
            list: ["[ list of features ]","[ list of features ]"]
            },
            {name: "Show Ready",
            price: "400-$600",
            tag: "Best",
            desc: "[ short description of the service level ]",
            list: ["[ list of features ]","[ list of features ]"]
            }
        ]},
    ],


    //gallery items must be listed with trailing b (before) and then a (after)
    gallery: [
        {img: "gallery_1b.jpg", line1:"Before"},
        {img: "gallery_1a.jpg", line1:"After"},
        {img: "gallery_2b.jpg", line1:"Before"},
        {img: "gallery_2a.jpg", line1:"After"},
        {img: "gallery_3b.jpg", line1:"Before"},
        {img: "gallery_3a.jpg", line1:"After"},
        {img: "gallery_4b.jpg", line1:"Before"},
        {img: "gallery_4a.jpg", line1:"After"},
        {img: "gallery_5b.jpg", line1:"Before"},
        {img: "gallery_5a.jpg", line1:"After"},
        {img: "gallery_6b.jpg", line1:"Before"},
        {img: "gallery_6a.jpg", line1:"After"},
        {img: "gallery_7b.jpg", line1:"Before"},
        {img: "gallery_7a.jpg", line1:"After"},
        {img: "gallery_8b.jpg", line1:"Before"},
        {img: "gallery_8a.jpg", line1:"After"},
        {img: "gallery_9b.jpg", line1:"Before"},
        {img: "gallery_9a.jpg", line1:"After"},
        {img: "gallery_10b.jpg", line1:"Before"},
        {img: "gallery_10a.jpg", line1:"After"},
    ],


    tickers: [
        {img: "images/clients/r-gtechniq2.png"},
        {img: "images/clients/r-eagleone.png"},
        {img: "images/clients/r-valspar.png"},
        {img: "images/clients/r-blog.png", url:"gallery.html"},
        {img: "images/clients/r-malco.png"},
        {img: "images/clients/r-ps.png"},
        {img: "images/clients/r-sema.png"},
        {img: "images/clients/r-mothers.png"},
        {img: "images/clients/r-menzerna2.png"},
        {img: "images/clients/r-sonax.png"},
    ],


    // two testimonials are listed. Recomended that you add many more.
    testimonials: [
        {name: "Christina C.",
        car: "2019 F250",
        text: "Saved me a bundle!",
        stars: 5,
        service: "Express Detail",
        img: "f/1.jpg"
        },
        {name: "Joseph Cunningham",
        car: "2019 Xterra",
        text: "The paint restoration work made the car look brand new. " + ownername + " is great!",
        stars: 5,
        service: "Paint Correction",
        img: "m/1.jpg"
        }
    ],

    footerlinks: [
        {text: "Home", url: "index.html"},
        {text: "Terms of Service", url: "tos.html"},
    ]
};


//Append any data

// /--\--/--\--/--\
// Perform some shuffling of data to keep the site fresh in google's eyes
// \--/--\--/--\--/

//change order of testimonials
data.testimonials = _.shuffle(data.testimonials);

//Generate a smaller sample of the gallery for use in ticker and sidebars
var temp_array = [];
data.samplegallery = [];
var gallerysize = data.gallery.length / 2;
for (let index = 0; index < 7; index++) {
    var selectednumber = Math.floor(Math.random() * gallerysize) + 1;
    // Skip repeated random selections
    if (temp_array.indexOf(selectednumber) !== -1) {
        index--;
        continue;
    }
    temp_array.push(selectednumber);
    data.samplegallery.push("gallery_"+selectednumber+"b.jpg","gallery_"+selectednumber+"a.jpg");
}

// export data var for use in the larger application
module.exports = data;

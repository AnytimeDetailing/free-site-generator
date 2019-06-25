//System
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const path = require('path');

//general posts
var Handlebars = require('handlebars');
var fs = require('fs');
var _ = require('lodash');

//specialized
var moment = require('moment');

//external vars and scripts
var data = require('./data');
var tos = require('./tos');




Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
Handlebars.registerHelper('urlize', function(item) {
    return fn_BuildSlugSegment(item)
});
// Handlebars.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         accum += block.fn(i);
//     return accum;
// });
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});
Handlebars.registerHelper('random', function(item) {
    // console.log(item);
    return _.sampleSize(item, 1);
});



// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// MAIN
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

// Define the blocks to be used in each page
var mainpage_order = ['head','topbar','header','nav','carousel','workingprocess','services','whychooseus','allservices','about','ba-ticker','footer','scripts']
var servicepage_order = ['head','topbar','header','nav','servicedetails','ticker','footer','scripts']
var gallerypage_order = ['head','topbar','header','nav','gallery','projects','testimonials','ticker','footer','scripts'] //,'temp'
var project_order = ['head','topbar','header','nav','page','testimonials','ticker','footer','scripts'] // 'gallerymini'
var project_order = ['head','topbar','header','nav','page','testimonials','ticker','footer','scripts'] // 'gallerymini'
var reviews_order = ['head','topbar','header','nav','note','page','testimonials','ba-ticker','footer','scripts']
var tos_order = ['head','topbar','header','nav','page','testimonials','footer','scripts']





// /--\--/--\--/--\
// Build all projects pages and vars
// \--/--\--/--\--/

// Function for creating dirs array
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)


// Build array of dirs
var projectdirs = getDirectories(process.cwd() + "/images/projects")
// console.log(projectdirs)

// list all files in each dir and create a data.projects object
data.projects = []
projectdirs.forEach(element => {
    var l_date = moment(element, 'YYYY.MM.DD').format()
    var l_name = /\\projects\\[\d\.]*([\w\s]+)/gi.exec(element)
    //read and parse data.json if it exists
    var jsonfile = fn_TryReadFile(element + '/data.json');
    if (jsonfile) {
        jsonfile = JSON.parse(jsonfile);
    } else {
        jsonfile = {}; //give blank file
    }

    // files returned as array of files in dir
    var files = fs.readdirSync(element, {encoding: 'utf8', withFileTypes: true});

    //grab text from text.txt if it exists
    var text = fn_TryReadFile(element + '/text.txt')

    var pics =  _.filter(files, function(o) {
        // filter out any files that are not images
        return /\.png|\.jpeg|\.jpg/gi.test(o.name);
    })
        

    // Find the main image
    var mainimg = ""
    pics.forEach(o => {
        if (o.name.indexOf('main.') != -1) { 
            // console.log(o.name)
            mainimg = o.name 
        }
    });        
    if (mainimg == "") {
        mainimg = pics[0].name;
    }

    // Save to data.projects array
    var l_project = {
        date: l_date,
        date_human: moment(l_date).format('MMMM Do YYYY'),
        date_machine: moment(l_date).format('YYYY MM DD'),
        date_MMM: moment(l_date).format('MMM'),
        date_D: moment(l_date).format('D'),
        dir: l_name[0],
        name: l_name[1],
        mainimg: mainimg,
        img: pics[0].name,
        pics: _.clone(_.sortBy(pics,"name")),
        text: text
    }
    data.projects.push(_.merge({},l_project,jsonfile));
});
console.log(data.projects)


// Select [3] most recent projects from all projects
data.recentprojects = _.orderBy(data.projects, function(o) {
    return new moment(o.date);
}, ['desc']);
data.recentprojects = data.recentprojects.slice(0,3)
console.log(data.recentprojects)

// Actually build EACH page project page and write to disk
data.projects.forEach( element => {
    data.page = {}
    data.page.title = element.name + " - " + element.date_human    
    data.gallerymini = element.pics.map(obj => {
        return {
           img: obj.name,
           dir: element.dir
        }
    });

    //build sections
    data.page.sections = [element,{gallerymini: data.gallerymini}]
    data.img = element.pics[0]

    var page = fn_buildpage(project_order, data)
    fs.writeFile(fn_BuildSlugSegment(element.date_machine + "-" + element.name) + ".html", page, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(element.name + " page written to disk");
    });
});


//build top level gallery
data.page.title = data.name + " - Gallery"
var page = fn_buildpage(gallerypage_order, data)
fs.writeFile("gallery.html", page, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("gallery page written to disk");
});

//build main page
    //Do cities pages here?
data.page.title = data.name + " - " + data.city
var mainpage = fn_buildpage(mainpage_order, data)
fs.writeFileSync("index.html", mainpage, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("main page written to disk");
});

//build supplimental service pages
data.services.forEach(element => {
    data.page.title = data.name + " - " + element.name
    var page = fn_buildpage(servicepage_order, data, element)
    fs.writeFile(fn_BuildSlugSegment(element.name) + ".html", page, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(element.name + " page written to disk");
    });
});


//build reviews
data.page.title = data.name + " - Reviews"
data.note = [{label: "<span>Get</span> Rewarded", text: "Your feedback helps others and encourages us to do even better. Thank you.<br><br>Please let us know if you've left a recent review and we'll be sure to find a way to reward you in the near future or on your next detail.", img: "images/customers/reviews.jpg", icon: "icon-pricetag"}]
data.page.sections = [
    {html: '<h3>Please consider submitting feedback to the following:</h3>'},
    {text: '<strong><a href="">Google</a></strong>,<strong><a>Yelp</a></strong>'},
    {html: '<h1>Review Directly</h1><p>Want to leave a review directly? Please e-mail us at: ' + data.contactemail + '</p><sub>Note: We will anonymize your first and last name when you send reviews via e-mail</sub>'},
    ]
var page = fn_buildpage(reviews_order, data)
fs.writeFile("reviews.html", page, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("reviews page written to disk");
});


//build tos
for (let index = 0; index < tos.sections.length; index++) {
    const element = tos.sections[index].text;
    tos.sections[index].text = _.replace(element,/({{ \w+ }})/g, data.name) // _.replace("{{ Company }}")
}
data.page.sections = tos.sections;
data.page.title = data.name + " - Terms of Service"
var page = fn_buildpage(tos_order, data)
fs.writeFile("tos.html", page, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("tos page written to disk");
});



// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// Functions
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

function fn_buildpage(para_arrayofblocks,para_data,para_supplimental = "") {
    //read requested blocks from disk
    var blockarray = [];
    para_arrayofblocks.forEach(element => {
        var l_html = fs.readFileSync(process.cwd() + '/blocks/' + element + '.html', 'utf8')
        blockarray.push(l_html);
    });
    var l_source = '<!doctype html><html lang="en">'
    for (let index = 0; index < blockarray.length; index++) {
        const element = blockarray[index];
        var l_source = l_source + '\n' + element;
    }
    l_source = l_source + '\n</body></html>\n' // close the body and html tag

    l_source = _.replace(l_source,/ type=\"text\/javascript\"/g,''); //zero out js definitions as they are not recommended html


    //Append supplimental data if supplied
    if (para_supplimental != "") {
        para_data.thispage = _.clone(para_supplimental)
    }

    // Grab the page being created and append to title (done outside as we don't know the file to write)

    //Build page
    var template = Handlebars.compile(l_source);
    var result = template(para_data)
    result = fn_SwapBackSlashes(result); // replace any backslashes
    return result
}

function fn_SwapBackSlashes(para_input) {
    return _.replace(para_input,/\\/g,'/')
}

function fn_BuildSlugSegment(para_text) {
    var out = _.truncate(para_text, {length: 42, omission: ''});
    var out = _.toLower(_.replace(out,/\s/g,"-")); //replace all spaces with dashes
    return out;
}

function fn_TryReadFile(para_path) {
    try {
        if (fs.existsSync(para_path)) {
            var l_text = fs.readFileSync(para_path, 'utf8');
        }
    } catch(err) {
        // return false
    }
    if (l_text) {
        return l_text
    }
    return false
}

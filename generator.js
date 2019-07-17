// Version 
// v1.1.3

//system
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const path = require('path');
const fs = require('fs');


//libs
const Handlebars = require('handlebars');
const _ = require('lodash');
const Jimp = require('jimp'); // server img resizer
const chalk = require('chalk');
//specialized
const moment = require('moment');

// external vars and scripts
var data = require('./data');



// Register all Handlebars helpers
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) { //logic helper
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
Handlebars.registerHelper('urlize', function(item) { //turn this into a url helper
    return fn_BuildSlugSegment(item)
});
// Handlebars.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         accum += block.fn(i);
//     return accum;
// });
Handlebars.registerHelper('times', function(n, block) { //do it this many times helper
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});
Handlebars.registerHelper('random', function(item) { //choose random from array helper
    return _.sampleSize(item, 1);
});
Handlebars.registerHelper('timg', function(item) { //append -timg helper
    var re_imgmeta = /(.+)\.(.+)$/gi.exec(item);
    // console.log("TIMG: " + re_imgmeta[1] + "-timg." + re_imgmeta[2])
    return re_imgmeta[1] + "-timg." + _.toLower(re_imgmeta[2]);
});
Handlebars.registerHelper('summary', function(item) { //summarizing helper
    var l_summary = item.split(' ')
    l_summary = l_summary.slice(0,100);
    return _.join(l_summary, ' ') + "..."
});



// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// MAIN
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

// Define the blocks to be used in each page
var mainpage_order = ['head','topbar','header','nav','carousel','workingprocess','services','whychooseus','allservices','about','ba-ticker','footer','scripts']
var servicepage_order = ['head','topbar','header','nav','servicedetails','ticker','footer','scripts']
var gallerypage_order = ['head','topbar','header','nav','gallery','projects','testimonials','ticker','footer','scripts'] //,'temp'
var project_order = ['head','topbar','header','nav','page','testimonials','ticker','footer','scripts'] // 'gallerymini'
var blog_order = ['head','topbar','header','nav','news-right-sidebar','ticker','footer','scripts']




// /--\--/--\--/--\
// Build gallery data
// \--/--\--/--\--/
console.log("building gallery")
var files = fs.readdirSync(process.cwd() + "/images/gallery", {encoding: 'utf8', withFileTypes: true});

galleryarray =  _.filter(files, function(o) {
    // filter out any files that are not images
    return /\.png|\.jpeg|\.jpg/gi.test(o.name);
})
galleryarray = galleryarray.map(obj => {
    if (_.includes(_.toLower(obj.name),"before") || _.includes(_.toLower(obj.name),"b")) {
        var line1 = "Before";
    } else {
        var line1 = "After";
    }
    return {
       img: obj.name,
       line1: line1
    }
});
data.gallery = _.clone(galleryarray);

//Generate a smaller sample of the gallery for use in ticker and sidebars
var gallerybeforeimages =  _.filter(galleryarray, function(o) { return o.line1 == "Before"; });
var galleryafterimages =  _.filter(galleryarray, function(o) { return o.line1 == "After"; });
// var findnumber_regex = /(\d+)/g;

if (gallerybeforeimages.length >= 4) {
    console.log("building sample gallery");
    //pair off gallery images by subtracting from the array till there are 4 or less images remaining
        //we can't be sure the enduser has a match for every image so gracefully exit if fails
    var paired_array = [];
    while(gallerybeforeimages.length >= 4) {
        for (let index = 0; index < gallerybeforeimages.length; index++) {
            var selection = gallerybeforeimages.splice(Math.floor(Math.random()*gallerybeforeimages.length), 1).pop()
            findnumber_match = /(\d+)/g.exec(selection.img);
            //find possible match for this gallery image
            for (let index2 = 0; index2 < galleryafterimages.length; index2++) {
                const element = galleryafterimages[index2];
                var elementmatch = /(\d+)/g.exec(element.img)
                if (elementmatch[0] == findnumber_match[0]) {
                    // console.log("match found for " + findnumber_match[0] + ":" + elementmatch[0])
                    paired_array.push([selection,element])
                    break
                }
            }
        }
    }
}
//save the samplegallery based off how many images the user has supplied
if (galleryarray.length > 14) {
    if (paired_array.length < 14) {
        data.samplegallery = galleryarray.splice(1,14);
    } else {
        //flatten the paired array so it is usable as a ticker gallery
        data.samplegallery = _.flattenDeep(_.sampleSize(paired_array,7)); //random mix of paired images 
    }
} else {
    data.samplegallery = galleryarray; //something gone awry, just use everything
}



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
    //grab text from text.txt if it exists
    var text = fn_TryReadFile(element + '/text.txt')

    // read all files in the dir
    var files = fs.readdirSync(element, {encoding: 'utf8', withFileTypes: true});
    files = files.map(o => { //map to plain array of filenames only
        return o.name;
    });

    // filter all non-images and thumnail images
    var pics = _.filter(files, function(o) {
        return /\.png|\.jpeg|\.jpg/gi.test(o);
    });
    // console.log(files)
    pics = _.filter(pics, function(o) {
        return !/\-timg/gi.test(o);
    });
    //make thumbnails for all project images
    pics.forEach(imgfile => {
        if (imgfile) {
            fn_makethumbnail(element + "\\" + imgfile)
        }
    });
        

    // Find the main image
    var mainimg = ""
    pics.forEach(o => {
        if (_.includes(o,'main')) { 
            mainimg = o;
            return;
        }
    });
    if (mainimg == "") {
        // console.log(pics)
        mainimg = pics[0];
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
        img: pics[0],
        pics: _.clone(_.sortBy(pics)),
        text: text
    }
    data.projects.push(_.merge({},l_project,jsonfile)); //merge any Data.json file in the folder, prefering the staticly set data
});
// console.log(data.projects)


// Select [3] most recent projects from all projects
data.recentprojects = _.orderBy(data.projects, function(o) {
    return new moment(o.date);
}, ['desc']);
data.recentprojects = data.recentprojects.slice(0,3)
// console.log(data.recentprojects)

// Actually build EACH page project page and write to disk
data.projects.forEach( element => {
    data.page = {}
    data.page.title = element.name + " - " + element.date_human    
    data.gallerymini = element.pics.map(obj => {
        return {
           img: obj,
           dir: element.dir
        }
    });

    //build sections
    data.page.sections = [element,{gallerymini: data.gallerymini}]
    data.img = element.pics[0]
    data.filename = fn_BuildSlugSegment(element.date_machine + "-" + element.name);
    fn_buildpage(project_order, data);
});


//build projects blog
data.projects = _.reverse(data.projects);
data.filename = "projects";
data.page.title = data.companyname + " - " + data.filename
fn_buildpage(blog_order, data);


//build top level gallery
data.page.title = data.companyname + " - Gallery"
data.filename = "gallery"
fn_buildpage(gallerypage_order, data)


//build main page
data.page.title = data.companyname + " - " + data.city
data.filename = "index"
fn_buildpage(mainpage_order, data)


//build supplimental service pages
data.services.forEach(element => {
    data.page.title = data.companyname + " - " + element.name;
    data.filename = fn_BuildSlugSegment(element.name);
    fn_buildpage(servicepage_order, data, element);
});


//build reviews and any other pages in ./generatorpages
var files = fs.readdirSync(process.cwd() + "/generatorpages", {encoding: 'utf8', withFileTypes: true});

generatorpagesarray =  _.filter(files, function(o) {
    // filter out any files that are not images
    return /\.json|\.JSON/gi.test(o.name);
});
// console.log(generatorpagesarray);
for (let index = 0; index < generatorpagesarray.length; index++) {
    const element = generatorpagesarray[index];
    
    var pagejson = fs.readFileSync(process.cwd() + '/generatorpages/' + element.name , 'utf8');
    var parsedjson = JSON.parse(pagejson);
    // console.log(JSON.parse(pagejson));

    data = _.merge({},data,parsedjson);
    data.page.sections = parsedjson.sections;
    data.filename = element.name.substring(0, element.name.length - 5)

    fn_buildpage(parsedjson.order, data)
}


// Finished. Log Value for Value message
setTimeout(() => {
    // chalkAnimation.pulse('');
    console.log(chalk.blue('This application and site is made possible by the value for value model. Ask yourself what this site was worth to you this year. Was worth $30 or was it worth $3000?'));
    console.log(chalk.blue('Send that amount to http://paypal.me/chunjee. Your financial support directly translates into updates and more free tools. Thank you!'));
}, 1000);

// /--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\
// Functions
// \--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/--\--/

function fn_makethumbnail(para_image, para_options = {}) {
    Jimp.read(para_image, (err, img) => {
        if (err) return;
        var re_imgmeta = /(.+\\)*(.+)\.(.+)$/gi.exec(para_image);
        var img_finalpath = re_imgmeta[1] + '\\' + re_imgmeta[2] + '-timg.jpg';
        // Jimp.AUTO
        // ratio = orginialHeight / newHeight
        // newWidth = orginialWidth * ratio

        //cut the timg a bit if it is too tall
        if (img.bitmap.height > img.bitmap.width) {
            try {
                img
                .resize(250, Jimp.AUTO) // resize
                .quality(90) // set JPEG quality
                .write(img_finalpath); // save
            } catch (error) {
                // console.log(error)
                return false
            }
            return
        }
        
        try {
            img
            .resize(250, Jimp.AUTO) // resize
            .quality(90) // set JPEG quality
            .autocrop({})
            .write(img_finalpath); // save
        } catch (error) {
            // console.log(error)
            return false
        }
    });
}

function fn_buildpage(para_arrayofblocks,para_data,para_supplimental = "") {
    //read requested blocks from disk
    var blockarray = [];
    para_arrayofblocks.forEach(element => {
        var l_html = fs.readFileSync(process.cwd() + '/blocks/' + element + '.html', 'utf8');
        blockarray.push(l_html);
    });
    var l_source = '<!doctype html><html lang="en">';
    for (let index = 0; index < blockarray.length; index++) {
        const element = blockarray[index];
        var l_source = l_source + '\n' + element;
    }
    l_source = l_source + '\n</body></html>\n'; // close the body and html tag

    l_source = _.replace(l_source,/ type=\"text\/javascript\"/g,''); //zero out js definitions as they are not recommended html


    //Append supplimental data if supplied
    if (para_supplimental != "") {
        para_data.thispage = _.clone(para_supplimental);
    }

    // Grab the page being created and append to title (done outside as we don't know the file to write)

    ///Compile page and make any final changes
    var template = Handlebars.compile(l_source);
    var page = template(para_data);
    page = fn_SwapBackSlashes(page); // replace any backslashes

    //Write the page to disk
    console.log("Writing " + _.toLower(para_data.filename + ".html") + " to disk");
    fs.writeFile(_.toLower(para_data.filename + ".html"), page, function(err) {
        if (err) {
            return console.log(err);
        }
    });

    //return the page if for some reason needed (currently not)
    return page;
}

function fn_SwapBackSlashes(para_input) {
    return _.replace(para_input,/\\/g,'/');
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
        return l_text;
    }
    return false;
}

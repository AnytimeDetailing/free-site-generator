# free-site-generator
This is a multi-page starter website for detailers or car related businesses. It is responsive (meaning it works great on cellphones and devices of any size)

Developed with following in mind: Easy to add new galleries of images, cheap to host online, extendable for new services and features, SEO friendliness, scalable to any number of products or services.

The following were minor considerations: Render copies for multiple cities/company names/domain names

## Installation and Requirements

You must have NodeJS and npm. They are packaged together here: https://nodejs.org/en/download/

Download this repo, in a command prompt or terminal after installing NodeJS and npm:

`npm install AnytimeDetailing/free-site-generator`

Download dependancies:

`npm install`


## Usage

The following files should be modified to reflect the site you want to start:

* data.js

This process can be aided by a sytax highlighting editor such as Visual Studio Code: https://code.visualstudio.com/

Run the generator to create all pages

`node generator.js`

Upload all resulting html files to the web hosting of your choice. https://www.nearlyfreespeech.net/ is reccomended for reliability and price.



# Projects
./images/projects

The directory is parsed to create subsections of the gallery akin to blog posts with images. An example folder "2019.01.01Infiniti Wash" exists as an example. Folders must always follow the pattern [YYYYMMDD-date][Postname] and contain at least one jpg, jpeg, or png image. An image with the text "main" in the name will be used as the primary image for the project.
An optional file data.json in the individual projects directory specifies optional text, author, and service to be used in the post. By default only three of the most recent projects will be linked on the site.

In the case of unfamiliarity with json files; a file named "text.txt" can be used for the text portion.

# Gallery
./images/gallery

For all functions of the gallery to work, images should be listed 1-∞ and should include both a `before` `b` and `after` `a` image. For example "001before.jpg" or "33b.png"

# Misc Pages
./generatorpages

You can define custom pages by adding compliant `pagename`.json files in this directory. A mostly blank Terms of Service (tos.json) and Reviews (Reviews.json) exist as examples. Other ideas to complete on your own may be a signup confirmation page, FAQ, or customer preparation guide.

"page" should be used in json defined generated page order unless custom sections are not desired.


## How it works

Sites often reference business hours, prices, company name, etc multiple times, and keeping track each page up to date with the latest information can be tedeous. Templates put your computer to work keeping all data matching accross multiple pages. This template fills in flexible fields in the ./blocks directory, then arranges blocks to create each page. For example, a navigation bar at the top of the page, then the main content of the page, some testimonials, finally a misc menu at the bottom of the page. These are then written to html files for use online.

For example ./generatorpages/Reviews.json defines the order as the following: `"head","topbar","header","nav","note","page","testimonials","ba-ticker","footer","scripts"`

`head` and `foot` should always be used as they contain refrences to required css and js files.


------

## Value for Value

This project is offered to fellow professional detailers and auto businesses and is made available by the [value for value model](https://levisan.me/blog/value-for-value); in which you finacially support the project according to the level of value you have recieved from it. You can send that value to https://paypal.me/chunjee

```Please give value in the amount that you feel this product is worth, otherwise "the system" will set the price for you.```


## Support

Can't figure something out? Need help uploading it to the internet? Need a customization coded? I am available for a reasonable hourly rate, you can reach me via github, [facebook](https://www.facebook.com/shawnbrooker), or [instagram](https://www.instagram.com/shawn.brooker/)

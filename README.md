# free-site-generator
This is a multi-page starter website for detailers or car related businesses. It is responsive (meaning it works great on cellphones and devices of any screen size) and is cheap to host online.

## Installation and Requirements

`npm install AnytimeDetailing/free-site-generator`

You must have NodeJS and npm. They can be installed at the same time here: https://nodejs.org/en/download/

## Usage

The following files should be modified to reflect the site you want to start:

data.js
tos.js

Run the generator to create all pages

`node generator.js`

Upload all files to the web hosting of your choice.



# Projects
./images/projects/[foldername]
the ./images/projects directory is parsed to create subsections of the gallery akin to blog posts with images. An example folder "2019.01.01Infiniti Wash" exists as an example. Folders must always follow the pattern [YYYYMMDD-date][Postname] and contain at least one jpg, jpeg, or png image. An image with the text "main" in the name will be used as the primary image for the project.
An optional file data.json in the individual projects directory specifies optional text, author, and service to be used in the post. By default up to three most recent projects will be linked on the site.
You may also put a text.txt file which will be used for text in the case of unfamiliarity with json files.

# Gallery
./images/gallery
Gallery images must be listed 1-∞ and should inclube both a `before` `b` and `after` `a` image. For example "001before.jpg" or "33b.png"

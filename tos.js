// This file controls all the text that appears on ./tos.html (Terms of Service)
// It is in a separate file as it is liable to get very long

// each section may include a "label" and "text", these are both optional
var sections = [
    {label: "Servicing your vehicle",
    text: ""},

    {label: "PERSONAL INFORMATION",
    text: "{{ Company }} may collect personal identifing information."},
    
    {label: "Summary",
    text: "Copyright {{ Company }} 2019"}
] 

module.exports = {
    sections
}

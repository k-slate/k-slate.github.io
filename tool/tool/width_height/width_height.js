onload = function(){
    main();
}

function main () {
    let innerwidth = document.getElementById("innerWidth");
    let innerheight = document.getElementById("innerHeight");
    let outerwidth = document.getElementById("outerWidth");
    let outerheight = document.getElementById("outerHeight");
    innerwidth.innerHTML = `innerWidth: ${window.innerWidth}`
    innerheight.innerHTML = `innerHeight: ${window.innerHeight}`
    outerwidth.innerHTML = `outerWidth: ${window.innerWidth}`
    outerheight.innerHTML = `outerHeight: ${window.innerHeight}`
}
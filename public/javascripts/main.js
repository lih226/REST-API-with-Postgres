/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



//button event for create
document.getElementById("create")
.addEventListener("click",function(e){
    console.log("create")
},false);

//button event for read
document.getElementById("read")
.addEventListener("click",function(e){
    console.log("read")
},false);

//button event for update
document.getElementById("update")
.addEventListener("click",function(e){
    console.log("update")
},false);

//button event for destroy
document.getElementById("destroy")
.addEventListener("click",function(e){
    console.log("destroy")
},false);

};
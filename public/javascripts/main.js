/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



//button event for create
document.getElementById("create")
.addEventListener("click",function(e){
    let option = prompt("Would you like to create\n1. New Film\n2. Review on film")
    if(option == 1){
        //Create new film
        let title = prompt("Enter the title")
        let body = prompt("Enter the body")
        
        fetch('/films', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then(res => {
            if(!res.ok){return res.text().then(text => {throw new Error(text)})}
            return res.text()
        })
        .then(films => {
            alert(films)
        })
        .catch(error => {
            alert(error);
        })
    }
    if(option == 2){
        //Create new review on film film_id
        let film_id = prompt("Enter the film_id")
        let title = prompt("Enter the title")
        let body = prompt("Enter the body")
        
        fetch('/films/' + film_id + '/reviews', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then(res => {
            if(!res.ok){return res.text().then(text => {throw new Error(text)})}
            return res.text()
        })
        .then(films => {
            alert(films)
        })
        .catch(error => {
            alert(error);
        })
    }
},false);

//button event for read
document.getElementById("read")
.addEventListener("click",function(e){
    let option = prompt("Would you like to read\n1. All Films\n2. Film with reviews\n3. All reviews for film\n4. Review on film\n5. Film by search query\n6. Review on film by search query")
    if(option == 1){
        //Fetch all films
        fetch('/films')
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
    if(option == 2){
        //Fetch film by film_id with reviews
        let film_id = prompt("Enter the film_id")
        fetch('/films/' + film_id)
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
    if(option == 3){
        //Fetch all reviews for film_id
        let film_id = prompt("Enter the film_id")
        fetch('/films/' + film_id + '/reviews')
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
    if(option == 4){
        //Fetch review review_id on film film_id
        let film_id = prompt("Enter the film_id")
        let review_id = prompt("Enter the review_id")
        fetch('/films/' + film_id + '/reviews/' + review_id)
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
    else if(option == 5){
        //Fetch film by search query
        let search_Query = prompt("Enter the search query")
        fetch('/films?search=' + search_Query)
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
    else if(option == 6){
        //Fetch review on film film_id by search query
        let film_id = prompt("Enter the film_id")
        let search_Query = prompt("Enter the search query")
        fetch('/films/' + film_id + '/reviews?search=' + search_Query)
        .then(res => res.json())
        .then(films => {
            alert(JSON.stringify(films))
        })
    }
},false);

//button event for update
document.getElementById("update")
.addEventListener("click",function(e){
    let option = prompt("Would you like to update\n1. Film\n2. Review on film")
    if(option == 1){
        //Update film film_id
        let film_id = prompt("Enter the film_id")
        let title = prompt("Enter the title")
        let body = prompt("Enter the body")
        fetch('/films/' + film_id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then(res => {
            if(!res.ok){return res.text().then(text => {throw new Error(text)})}
            return res.text()
        })
        .then(films => {
            alert(films)
        })
        .catch(error => {
            alert(error);
        })
    }
    if(option == 2){
        //Update review review_id on film film_id
        let film_id = prompt("Enter the film_id")
        let review_id = prompt("Enter the review_id")
        let title = prompt("Enter the title")
        let body = prompt("Enter the body")
        
        fetch('/films/' + film_id + '/reviews/' + review_id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then(res => {
            if(!res.ok){return res.text().then(text => {throw new Error(text)})}
            return res.text()
        })
        .then(films => {
            alert(films)
        })
        .catch(error => {
            alert(error);
        })
    }
},false);

//button event for destroy
document.getElementById("destroy")
.addEventListener("click",function(e){
    let option = prompt("Would you like to destroy\n1. Film\n2. Review on film")
    if(option == 1){
        //Delete film by film_id
        let film_id = prompt("Enter the film_id")
        fetch('/films/' + film_id, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(films => {
            alert(films)
        })
    }
    if(option == 2){
        //Delete review by review_id of film by film_id
        let film_id = prompt("Enter the film_id")
        let review_id = prompt("Enter the review_id")
        fetch('/films/' + film_id + '/reviews/' + review_id, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(films => {
            alert(films)
        })
    }
},false);

};
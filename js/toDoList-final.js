/*
 *  Final Project:  To-Do List creation with functionality to prioritize and delete activities
 *  Features DOM manipulation and traversal
*/

// Function to add new list items to DOM with spans for up arrows, down arrows and delete function

function newLineItem(itemToAdd, i) {
    
        var newText = document.createTextNode(itemToAdd);
           
        var newArrowUp = document.createTextNode("");
        var newArrowDown = document.createTextNode("");
        var newDeleteSymbol = document.createTextNode("");
        var newLi = document.createElement("li");
        

        var newSpan1 = document.createElement("span");
        var newSpan2 = document.createElement("span");
        var newSpan3 = document.createElement("span");
        
        //Set the unique ID's for the new elements
        
        newLi.setAttribute("id", "listItem" + i);
               
        newSpan1.setAttribute("id", "upArrow" + i);             
        newSpan2.setAttribute("id", "downArrow" + i);   
        newSpan3.setAttribute("id", "delete" + i);

        //Set the classes for the spans and Li's so we can references them as a group
        
        newLi.setAttribute("class", "listItemClass");
           

        newSpan1.setAttribute("class", "upArrows");         
        newSpan2.setAttribute("class", "downArrows");  
        newSpan3.setAttribute("class", "delete");
  
        newSpan1.appendChild(newArrowUp);
        newSpan2.appendChild(newArrowDown);
        newSpan3.appendChild(newDeleteSymbol);
        
        //add the text to the <li>
        newLi.appendChild(newText);
        
        //add the spans to the <li>
        newLi.appendChild(newSpan1);
        newLi.appendChild(newSpan2);
        newLi.appendChild(newSpan3);
        
        //Add the list item to the <ol>
        
        document.getElementById("addNewItemHere").appendChild(newLi);
        
        // add the arrow/delete symbols to the clickable spans
        document.getElementById("upArrow" + i).innerHTML = "&#x25B2";
        document.getElementById("downArrow" + i).innerHTML = "&#x25BC";
        document.getElementById("delete" + i).innerHTML = "&#9003";

        
    
}


// Function to generate the DOM <li>'s if we are retrieving from local storage
function rewriteList (theArray) {

        for (i=0; i<theArray.length; i++) {
            newLineItem(theArray[i], i);  //generates each <li> and child nodes
        } //end for

    }


window.onload = function() {
    
    //Initialize:
    //Here we check if there is already list data in local storage and load it if there is
    if ((window.localStorage.getItem("myList") === null) || (window.localStorage.getItem("myList") === undefined)) {
        var listArray = [];
        var count=0;
        //console.log("there were no items stored");
    }
    else {
        var listArray = JSON.parse(window.localStorage.getItem("myList"));
        // Create and display list items
        var count=listArray.length;  //keeping track of how many list items exist for unique ids
        //console.log("listArray is " +listArray);
        rewriteList(listArray);
    }

    var theOl = document.getElementById("addNewItemHere");
    var toDoButton = document.getElementById("addToDo");
    var theDeletes = document.getElementsByClassName("delete");
    var theUpArrows = document.getElementsByClassName("upArrows");
    var theDownArrows = document.getElementsByClassName("downArrows");
    var allTheListItems = document.getElementsByClassName("listItemClass");
    
    for (i=0; i<theUpArrows.length; i++) {
        theUpArrows[i].onclick = function(){
            //console.log("up arrow function");
            var currentId = this.id;
            var index = parseInt(currentId.substring(7,currentId.length));   //get the index value at the end of the id name - removing the "upArrow" word
            var x = document.getElementById("listItem"+index);
            // move the item up the list
            if (x.previousSibling) {
                theOl.insertBefore(x, x.previousSibling);
            }
        }
    }

    for (i=0; i<theDownArrows.length; i++) {
        theDownArrows[i].onclick = function(){
            //console.log("down arrow function");
            var currentId = this.id;
            var index = parseInt(currentId.substring(9,currentId.length));   //get the index value at the end of the id name - removing the "downArrow" word
            var x = document.getElementById("listItem"+index);
            //move item down the list
            if (x.nextSibling) {
                if (x.nextSibling.nextSibling) {
                    theOl.insertBefore(x, x.nextSibling.nextSibling);
                }
                else { //if it's the next to the last, move to last
                theOl.appendChild(x);
                }
            }
        }
    }
    
    
        //if we click on the delete span, remove that list item
    for (i=0; i<theDeletes.length; i++) {
        theDeletes[i].onclick = function(){
            //console.log("delete function");
            var currentId = this.id;
            var index = parseInt(currentId.substring(6,currentId.length));  //get the index value at the end of the id name - removing the "delete" word
            var x = document.getElementById("listItem"+index);
            x.parentNode.removeChild(x);

            //since we deleted something, let's update our class references
            theDeletes = document.getElementsByClassName("delete");
            theUpArrows = document.getElementsByClassName("upArrows");
            theDownArrows = document.getElementsByClassName("downArrows");
            allTheListItems = document.getElementsByClassName("listItemClass");                

        }
    }

    
    toDoButton.onclick = function(){
        //console.log("button clicked");
        //Getting new list item
        var listItemValue = document.getElementById("listItem").value;
        document.getElementById("listItem").value = ""; //resetting input field

        //adding new list item to DOM
        newLineItem(listItemValue, count);
        count++;  //keeping track of how many list items we've added for unique ids
        
        //since we added something, let's update our class references
        theDeletes = document.getElementsByClassName("delete");
        theUpArrows = document.getElementsByClassName("upArrows");
        theDownArrows = document.getElementsByClassName("downArrows");
        allTheListItems = document.getElementsByClassName("listItemClass");

        
        for (i=0; i<theUpArrows.length; i++) {
            theUpArrows[i].onclick = function(){
                //console.log("up arrow function");
                var currentId = this.id;
                var index = parseInt(currentId.substring(7,currentId.length));   //get the index value at the end of the id name - removing the "upArrow" word   
                var x = document.getElementById("listItem"+index);
                // move the item up the list
                if (x.previousSibling) {
                    theOl.insertBefore(x, x.previousSibling);                   
                }
            }
        }

        for (i=0; i<theDownArrows.length; i++) {
            theDownArrows[i].onclick = function(){
                //console.log("down arrow function");
                var currentId = this.id;
                var index = parseInt(currentId.substring(9,currentId.length));   //get the index value at the end of the id name - removing the "downArrow" word   
                var x = document.getElementById("listItem"+index);
                //move item down the list
                if (x.nextSibling) {
                    if (x.nextSibling.nextSibling) {
                        theOl.insertBefore(x, x.nextSibling.nextSibling);
                    }
                    else {
                    theOl.appendChild(x); //if it's the next to the last, move to last
                    }
                }
            }
        }
    
    
        //if we click on the delete span, remove that list item
        for (i=0; i<theDeletes.length; i++) {
            theDeletes[i].onclick = function(){
                //console.log("delete function");
                var currentId = this.id;
                var index = parseInt(currentId.substring(6,currentId.length));  //get the index value at the end of the id name - removing the "delete" word
                var x = document.getElementById("listItem"+index);
                x.parentNode.removeChild(x);
                
                //since we deleted something, let's update our class references
                theDeletes = document.getElementsByClassName("delete");
                theUpArrows = document.getElementsByClassName("upArrows");
                theDownArrows = document.getElementsByClassName("downArrows");
                allTheListItems = document.getElementsByClassName("listItemClass");

            }
        }
        
    } // end ToDoButton


    //Here we will save our list to local storage

    var saveButton = document.getElementById("saveButton");
    
    saveButton.onclick = function(){
        
        listArray = [];
        for (i=0; i<allTheListItems.length; i++) {    
            listArray[i] = allTheListItems[i].childNodes[0].nodeValue;
            //console.log("listArray is " + listArray[i]);
        }
            //store the update to local storage
        window.localStorage.setItem("myList", JSON.stringify(listArray));
        
    } //end save button



    
} // end window.onload


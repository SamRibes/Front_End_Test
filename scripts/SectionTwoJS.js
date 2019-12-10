//This function would get called if there was an actual API to call something from
function handleFetch(apiUrl) {      
    fetch(apiUrl)
        .then(function (data) {
            //code in here
        })
}

//For the purposes of this task I've simulated the API fetch and manually added a message with tags attached
//This is the function called on loading the body
function simulatedHandleFetch() {

    //Simulated data retreived from an API
    var jsonString = `  {
                            "message": "Message goes here",
                            "tags":
                                [
                                    "User tag 1",
                                    "User tag 2",
                                    "SYS:System tag 1",
                                    "PAR:System tag 2",
                                    "ACT:System tag 3"
                                ]
                        }`
                        
    var data = JSON.parse(jsonString);

    //Get the header (h3) tag from the body and show the message portion of the data in it
    document.getElementById("message").innerHTML = data.message;

    var i;
    for (i = 0; i < data.tags.length; i++) {    //Loop through the tags from the data

        var row = document.createElement("LI");    //Create a row element to append to the ul list

        var tag = data.tags[i];     //Create a var to hold tag[i]

        var tagPrefix = data.tags[i].substring(0, 4)    //Get the first 4 characters from the tag

        switch (tagPrefix) {    //A switch to check whether the first 4 characters match any of the prefixes
                                //If not then the default is triggered 

            case "SYS:":            //If tagPrefix == "SYS:"
                row.className = "SYS";      //class name for row = "SYS"
                tag = tag.substring(4);     //tag = (tag minus prefix)
                break;
            case "PAR:":
                row.className = "PAR";      //^^^
                tag = tag.substring(4);
                break;
            case "ACT:":
                row.className = "ACT";      //^^^
                tag = tag.substring(4);
                break;
            default:                //If tagPrefix != any prefix
                row.className = "USR";      //class name for row = "USR"    (USR for user tag)
                break;
        }

        var textnode = document.createTextNode(tag);        //Create a text node to add to the row
        row.appendChild(textnode);                          //Append the text node to the row
        document.getElementById("tags").appendChild(row);   //Append the row to the ul list
    }
}
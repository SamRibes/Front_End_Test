
//I've left in console output to assist in your understanding of whats happening

class TreeTraversal {

    //When called, this function will take a provided tree (in the same format as the one provided in the json)
    //and then act recursivley to travel through the tree and append each node to a new collection
    static flatten(tree) {
        //flattenedArray is empty when first calling the flatten method
        //As recursion happens, the array is filled with the nodes from the tree

        var flattenedArray = [];    //New collection

        var i;
        for (i = 0; i < tree.length; i++) {     //Loop through top level of tree

            console.log("On Node: " + tree[i].name);

            if (typeof tree[i].children == "undefined") {       //Check if node[i] has any children

                console.log("Node " + tree[i].name + " has no children ... pushing to flattened collection");

                flattenedArray.push(tree[i]);   //No   =   push node to the new collection
            }
            else {      //Yes

                console.log("Node " + tree[i].name + " has children");
                console.log("calling flatten() on children of" + tree[i].name);

                var recursedArray = TreeTraversal.flatten(tree[i].children)     //Recursivley call this function with the children of node[i]
                //Return a collection with each of the children and their sub children flattened

                console.log("Deleting " + tree[i].name + "'s children");

                delete tree[i].children;                                        //After the last line is finished all the children and sub children from the node 
                //should be in the new collection so we delete them from node[i] before moving on


                flattenedArray.push(tree[i]);                                   //Add node[i] top new collection

                console.log("Node " + tree[i].name + "'s children have been added ... pushing to flattened collection");

                flattenedArray = flattenedArray.concat(recursedArray);          //Join the returned collection with the one we intend to return
            }
        }       //Loop finishes once all of the top level nodes are added to the flattened collection

        return flattenedArray;
    }

    //When called, this function will take an ID for nodeX in a tree and the tree to search through it to find nodeX.
    //Once found, the recursive function will kick back up to the parent of the nodeX and return that ID. 
    static getParent(nodeID, tree) {

        var i;
        for (i = 0; i < tree.length; i++) {     //Loop through top level of tree

            console.log("On Node: " + tree[i].name);

            if (tree[i].id === nodeID) {
                console.log("ID HAS BEEN FOUND!!!");

                return true;        //if the node we're looking for is found then we return true to break out of the recursion
            }
            else if (typeof tree[i].children != "undefined")    //If node[i] != nodeX AND node[i] has children
            {
                console.log("Node has children");

                var responseFromNextLevel = TreeTraversal.getParent(nodeID, tree[i].children);      //Recursivley call getParent() with nodeX's ID and the cildren of node[i]

                if ((responseFromNextLevel == true)) //If node[i] is the parent to nodeX based on response from it's children
                {
                    console.log("Response from next level is true... returning this node");

                    return tree[i];
                }

                if (typeof responseFromNextLevel == "object")    //If the response from the next level is an object then it must be 
                //the parent node we're looking for and so it is continuously passed back up the recursive chain
                {
                    console.log("Response from next level is the node to return... returning this node");

                    return responseFromNextLevel;
                }
            }
        }

        return null;    //returns null when there is no node with that ID found
    }

    //When called, this function will take a tree, an ID for nodeX, a new node to add to the children of 
    //nodeX and an index for the children colelction so we know where to put the new node
    static addNode(tree, nodeID, newNodeObject, insertionIndex) {

        var i;
        for (i = 0; i < tree.length; i++) {   //Loop through top level of tree

            console.log("On Node: " + tree[i].name);

            if (tree[i].id == nodeID){   //IF node[i] == nodeX    
            
                if (typeof tree[i].children != "undefined"){ //AND node[i] has children
                    
                    console.log("Found nodeX! ... Adding to it's children");

                    tree[i].children.splice(insertionIndex, 0, newNodeObject);  //Add new node at the defined insertion point of the children of node[i]
                }
                else{ //AND node[i] has no children
                
                    console.log("Found nodeX! ... creating children collection");

                    tree[i].children = [newNodeObject];     //Create a collection using the new node and add it to node[i] as it's children collection 
                }

                return tree;
            }
            else if (typeof tree.children != "undefined") {     //If node[i] != nodeX AND node[i] has children

                var treeToReturn = this.addNode(tree[i].children, nodeID, newNodeObject);   //Recursivley call addNode() with the children of node[i]

                if (treeToReturn != null) {     //If the returned tree did have nodeX 
                    return treeToReturn;        //Return the ammended tree
                }
            }
        }

        return null;    //Returns null if nodeX was not found
    }

}

//parsing the tree.json into a js object I can use
var jsonString = `
[
	{
		"name": "ABC",
		"id": "e597cb3f-bc6a-43e6-9c90-26cc38fbbb32"
	},
	{
		"name": "FORT",
		"id": "c64ac3d7-5e88-40ed-8d6f-e7f10d21c5bc",
		"children": [
			{
				"name": "test@app.live",
				"id": "697eae2f-40dd-445e-a0f0-a918f3a4d5c0",
				"children": [
					{
						"name": "NEW NODE",
						"id": "697eae2f-40dd-445e-a0f0-111111111111"
					}
				]
			}
		]
	},
	{
		"name": "London",
		"id": "ea816550-8dce-4534-a8a2-ad73229f4aca"
	},
	{
		"name": "RENAMING a",
		"id": "ecac3eed-6691-4e95-9e3e-30ac5b725fca"
	}
]
`;


//Call all functions and print to console

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tree = JSON.parse(jsonString);

var flattenedTree = TreeTraversal.flatten(tree);

console.log(flattenedTree);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tree = JSON.parse(jsonString);

var retreivedParent = TreeTraversal.getParent("697eae2f-40dd-445e-a0f0-111111111111", tree);

console.log(retreivedParent);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tree = JSON.parse(jsonString);

var newNode = {
    name: "NEW NODE",
    id: "697eae2f-40dd-445e-a0f0-111111111111"
}

var treeWithAddedNode = TreeTraversal.addNode(tree, "c64ac3d7-5e88-40ed-8d6f-e7f10d21c5bc", newNode, 0);

console.log(treeWithAddedNode);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
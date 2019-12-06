
class TreeTraversal {

    static flatten(tree) {
        //flattenedArray is empty when first calling the flatten method
        //As recursion happens, the array is filled with the nodes from the tree

        var flattenedArray = [];
        var i;

        for (i = 0; i < tree.length; i++) {
            if (typeof tree[i].children == "undefined") {
                flattenedArray.push(tree[i]);
            }
            else {
                var recursedArray = TreeTraversal.flatten(tree[i].children)
                delete tree[i].children;
                flattenedArray.push(tree[i]);
                flattenedArray = flattenedArray.concat(recursedArray);
            }
        }

        return flattenedArray;
    }

    static getParent(nodeID, tree) {
        var i;

        for (i = 0; i < tree.length; i++) {
            console.log("Loop: " + i);
            console.log("On Node: " + tree[i].name);
            if (tree[i].id === nodeID) 
            {
                console.log("ID HAS BEEN FOUND!!!");
                //if the node we're looking for is found then we return true to break out of the recursion
                return true;
            }
            else if (typeof tree[i].children != "undefined") 
            {
                console.log("Node has children");
                var responseFromNextLevel = TreeTraversal.getParent(nodeID, tree[i].children);

                if ((responseFromNextLevel == true)) //This node is the parent to the node we're looking for
                {
                    console.log("Response from next level is true... returning this node");
                    return tree[i];
                }
                if(typeof responseFromNextLevel == "object") //This is the node we're taking back up the recursion chain
                {
                    console.log("Response from next level is the node to return... returning this node");
                    return responseFromNextLevel;
                }
            }
        }
        return null;    //returns null when there is no node with that ID found
    }

    static addNode(tree, nodeID, newNodeObject, insertionIndex) 
    {
        var i;
        for (i = 0; i < tree.length; i++) 
        {
            if (tree[i].id == nodeID) 
            {
                if (typeof tree[i].children != "undefined") 
                {
                    tree[i].children.splice(insertionIndex, 0, newNodeObject);
                }
                else 
                {
                    tree[i].children = [newNodeObject];
                }
                return tree;
            }
            else if (typeof tree.children != "undefined") 
            {
                var treeToReturn = this.addNode(tree[i].children, nodeID, newNodeObject);
                if(treeToReturn != null)
                {
                    return treeToReturn;
                }
            }
        }

        return null;
    }

}

//parsing the tree.json into a js object I can use
var fs = require("fs");
var jsonString = fs.readFileSync("tree.json").toString('utf-8');



var tree = JSON.parse(jsonString);
var flattenedTree = TreeTraversal.flatten(tree);
fs.writeFile("TreeTraversal1.json", JSON.stringify(flattenedTree), function(err) {
    if (err) {
        console.log(err);
    }
});

var tree = JSON.parse(jsonString);
var retreivedParent = TreeTraversal.getParent("697eae2f-40dd-445e-a0f0-111111111111", tree);
fs.writeFile("TreeTraversal2.json", JSON.stringify(retreivedParent), function(err) {
    if (err) {
        console.log(err);
    }
});

var tree = JSON.parse(jsonString);
var newNode = {
    name: "NEW NODE",
    id: "697eae2f-40dd-445e-a0f0-111111111111"
}
var treeWithAddedNode = TreeTraversal.addNode(tree, "c64ac3d7-5e88-40ed-8d6f-e7f10d21c5bc", newNode, 0);
fs.writeFile("TreeTraversal3.json", JSON.stringify(treeWithAddedNode), function(err) {
    if (err) {
        console.log(err);
    }
});

console.log(retreivedParent);
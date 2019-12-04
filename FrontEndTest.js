
class TreeTraversal {

    //flattenedArray is empty when first calling the flatten method
    //As recursion happens, the array is filled with the nodes from the tree

    static flatten(jsonObject) {
        var flattenedArray = [];
        var i;

        for (i = 0; i < jsonObject.length; i++) {
            if (jsonObject[i].children === undefined) {
                flattenedArray.push(jsonObject[i]);
            }
            else {
                var recursedArray = TreeTraversal.flatten(jsonObject[i].children)
                delete jsonObject[i].children;
                flattenedArray.push(jsonObject[i]);
                flattenedArray = flattenedArray.concat(recursedArray);
            }
        }

        return flattenedArray;
    }

    static getParent(nodeID, jsonObject) {
        var i;
        // console.log(jsonObject);

        for (i = 0; i < jsonObject.length; i++) {
            if (jsonObject[i].id == nodeID) {
                return true;
            }
            else {
                if (jsonObject.children !== undefined) {

                    var nextLevelHasChild = TreeTraversal.getParent(nodeID, jsonObject[i].children);

                    if (nextLevelHasChild == true) {
                        return jsonObject[i].id;
                    }
                }
            }
        }

        return null;    //No matching node with that ID found
    }

    static addNode(parent, newNode) {

        return null;
    }

}

//parsing the tree.json into a js object I can use
var fs = require("fs");
var jsonString = fs.readFileSync("tree.json").toString('utf-8');
var jsonObject = JSON.parse(jsonString);

var flattenedTree = TreeTraversal.flatten(jsonObject);
var retreivedParent = TreeTraversal.getParent("697eae2f-40dd-445e-a0f0-a918f3a4d5c0", jsonObject);

console.log(flattenedTree);

// console.log(retreivedParent);


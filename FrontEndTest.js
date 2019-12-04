
class TreeTraversal {

    //flattenedArray is empty when first calling the flatten method
    //As recursion happens, the array is filled with the nodes from the tree

    // static flatten(jsonObject) {

    //     return flatten(jsonObject, flattenedArray);
    // }

    static flatten(jsonObject) {
        var flattenedArray = [];
        var i;

        for (i = 0; i < jsonObject.length; i++) {
            if (jsonObject[i].children === undefined)
            {
                flattenedArray.push(jsonObject[i]);
            }
            else
            {
                let recursedArray = TreeTraversal.flatten(jsonObject[i].children)
                flattenedArray = flattenedArray.concat(recursedArray);
            }
        }

        return flattenedArray;
    }

    static getParent(childID, jsonObject) {

        var i;

        for (i = 0; i < jsonObject.length; i++) {
            if (jsonObject[i].children === undefined)
            {
                flattenedArray.push(jsonObject[i]);
            }
            else
            {
                let recursedArray = TreeTraversal.flatten(jsonObject[i].children)
                flattenedArray = flattenedArray.concat(recursedArray);
            }
        }

        jsonObject.find(node => node.id == childID);

        return flattenedArray.find(node => node.id == parentId);
    }

    static addNode(parent, newNode) {

        return null;
    }

}

//parsing the tree.json into a js object I can manipulate
let fs = require("fs");
var jsonString = fs.readFileSync("tree.json").toString('utf-8');
let jsonObject = JSON.parse(jsonString);

let flattenedTree = TreeTraversal.flatten(jsonObject);

console.log(flattenedTree);

console.log(TreeTraversal.getParent("697eae2f-40dd-445e-a0f0-a918f3a4d5c0", flattenedTree))


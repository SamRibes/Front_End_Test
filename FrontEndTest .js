class TreeTraversal{

    //flattenedArray is empoty when first calling the flatten method
    //As recursion happens, the array is filled with the nodes from the tree

    

    static flatten(treeObject, flattenedArray){   

        treeObject.forEach(element => {
            if (element.children != undefined)  //check 
            {
                flatten(element.children);
            }
            flattenedArray.push(element);
        });

        return flattenedArray;
    }

    static getParent(childID, flattenedArray){
        
        //searching through the flattened array
        array.forEach(element => {
            if(element.id == childID){
                return element.parentFolderId;
            }
        });
        return null;
    }

    static addNode(parent, newNode){
    
        return null;
    }
}
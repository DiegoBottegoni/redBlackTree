const { RedBlackTree } = require('./models/RedBlackTree.js')

let tree = new RedBlackTree();
tree.insert(20);
tree.insert(15);
tree.insert(25);
tree.insert(10);
tree.insert(5);

console.log('Tree structure:');
tree.printTree(); // Print the tree structure

console.log('Search 15');
let foundNode = tree.searchTree(15);
console.log(foundNode.value); // Should print 15 if found

tree.deleteNodeHelper(tree.root, 15);
console.log('Print after delete 15');
tree.printTree(); // Print the tree structure after deletion
const { Node } = require('./Node.js')

class RedBlackTree {
    constructor() {
        this.TNULL = new Node(null, 'BLACK');
        this.root = this.TNULL;
    }

    // Helper function to perform left rotation
    leftRotate(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left != this.TNULL) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this.root = y;
        } else if (x == x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    // Helper function to perform right rotation
    rightRotate(x) {
        let y = x.left;
        x.left = y.right;
        if (y.right != this.TNULL) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this.root = y;
        } else if (x == x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    // Helper function to fix the red-black tree after insertion
    fixInsert(k) {
        while (k.parent.color == 'RED') {
            if (k.parent == k.parent.parent.right) {
                let u = k.parent.parent.left;
                if (u.color == 'RED') {
                    u.color = 'BLACK';
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    k = k.parent.parent;
                } else {
                    if (k == k.parent.left) {
                        k = k.parent;
                        this.rightRotate(k);
                    }
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    this.leftRotate(k.parent.parent);
                }
            } else {
                let u = k.parent.parent.right;
                if (u.color == 'RED') {
                    u.color = 'BLACK';
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    k = k.parent.parent;
                } else {
                    if (k == k.parent.right) {
                        k = k.parent;
                        this.leftRotate(k);
                    }
                    k.parent.color = 'BLACK';
                    k.parent.parent.color = 'RED';
                    this.rightRotate(k.parent.parent);
                }
            }
            if (k == this.root) {
                break;
            }
        }
        this.root.color = 'BLACK';
    }

    // Insert a node into the tree
    insert(value) {
        let node = new Node(value);
        node.parent = null;
        node.left = this.TNULL;
        node.right = this.TNULL;
        node.color = 'RED';

        let y = null;
        let x = this.root;

        while (x != this.TNULL) {
            y = x;
            if (node.value < x.value) {
                x = x.left;
            } else {
                x = x.right;
            }
        }

        node.parent = y;
        if (y == null) {
            this.root = node;
        } else if (node.value < y.value) {
            y.left = node;
        } else {
            y.right = node;
        }

        if (node.parent == null) {
            node.color = 'BLACK';
            return;
        }

        if (node.parent.parent == null) {
            return;
        }

        this.fixInsert(node);
    }

    // Helper function to fix the red-black tree after deletion
    fixDelete(x) {
        while (x != this.root && x.color == 'BLACK') {
            if (x == x.parent.left) {
                let s = x.parent.right;
                if (s.color == 'RED') {
                    s.color = 'BLACK';
                    x.parent.color = 'RED';
                    this.leftRotate(x.parent);
                    s = x.parent.right;
                }

                if (s.left.color == 'BLACK' && s.right.color == 'BLACK') {
                    s.color = 'RED';
                    x = x.parent;
                } else {
                    if (s.right.color == 'BLACK') {
                        s.left.color = 'BLACK';
                        s.color = 'RED';
                        this.rightRotate(s);
                        s = x.parent.right;
                    }
                    s.color = x.parent.color;
                    x.parent.color = 'BLACK';
                    s.right.color = 'BLACK';
                    this.leftRotate(x.parent);
                    x = this.root;
                }
            } else {
                let s = x.parent.left;
                if (s.color == 'RED') {
                    s.color = 'BLACK';
                    x.parent.color = 'RED';
                    this.rightRotate(x.parent);
                    s = x.parent.left;
                }

                if (s.left.color == 'BLACK' && s.right.color == 'BLACK') {
                    s.color = 'RED';
                    x = x.parent;
                } else {
                    if (s.left.color == 'BLACK') {
                        s.right.color = 'BLACK';
                        s.color = 'RED';
                        this.leftRotate(s);
                        s = x.parent.left;
                    }
                    s.color = x.parent.color;
                    x.parent.color = 'BLACK';
                    s.left.color = 'BLACK';
                    this.rightRotate(x.parent);
                    x = this.root;
                }
            }
        }
        x.color = 'BLACK';
    }

    // Delete a node from the tree
    deleteNodeHelper(node, key) {
        let z = this.TNULL;
        let x, y;
        while (node != this.TNULL) {
            if (node.value == key) {
                z = node;
            }

            if (node.value <= key) {
                node = node.right;
            } else {
                node = node.left;
            }
        }

        if (z == this.TNULL) {
            console.log("Couldn't find key in the tree");
            return;
        }

        y = z;
        let yOriginalColor = y.color;
        if (z.left == this.TNULL) {
            x = z.right;
            this.rbTransplant(z, z.right);
        } else if (z.right == this.TNULL) {
            x = z.left;
            this.rbTransplant(z, z.left);
        } else {
            y = this.minimum(z.right);
            yOriginalColor = y.color;
            x = y.right;
            if (y.parent == z) {
                x.parent = y;
            } else {
                this.rbTransplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }

            this.rbTransplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yOriginalColor == 'BLACK') {
            this.fixDelete(x);
        }
    }

    // Helper function to transplant nodes
    rbTransplant(u, v) {
        if (u.parent == null) {
            this.root = v;
        } else if (u == u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    // Helper function to find the minimum node
    minimum(node) {
        while (node.left != this.TNULL) {
            node = node.left;
        }
        return node;
    }

    // Search for a value in the tree
    searchTree(value) {
        return this.searchTreeHelper(this.root, value);
    }

    searchTreeHelper(node, key) {
        if (node == this.TNULL || key == node.value) {
            return node;
        }

        if (key < node.value) {
            return this.searchTreeHelper(node.left, key);
        }
        return this.searchTreeHelper(node.right, key);
    }

    // Print the tree structure
    printTree() {
        this.printHelper(this.root, "", true);
    }

    printHelper(node, indent, last) {
        if (node != this.TNULL) {
            console.log(indent + (last ? "R---- " : "L---- ") + node.value + "(" + node.color + ")");
            indent += last ? "   " : "|  ";
            this.printHelper(node.left, indent, false);
            this.printHelper(node.right, indent, true);
        }
    }
}

module.exports = { RedBlackTree };

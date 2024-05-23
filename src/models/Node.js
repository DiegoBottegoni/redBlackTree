class Node {
    constructor(value, color = 'RED', left = null, right = null, parent = null) {
        this.value = value;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

module.exports = { Node };
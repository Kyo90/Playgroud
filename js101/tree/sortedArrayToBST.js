function Node(data, left, right) {
  this.left = left;
  this.right = right;
  this.val = data;
}

function sortedArrayToBST(arr) {
  const helper = (left, right) => {
    if(left > right) {
      return null
    }
    let p = (left + right) >> 1;
    const root = new Node(arr[p]);
    root.left = helper(left, p-1);
    root.right = helper(p+1, right);
    return root
  }
  return helper(0, arr.length - 1)
}

const root = sortedArrayToBST([-10, -3, 0, 5, 9])

function inorderUnRec(node) {
  const nodes = [];
  const stack = [];
  
  while(stack.length || node) {
    if(node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      console.log(node)
      nodes.push(node.val);
      node = node.right
    }
  }
  
  console.log(nodes)
}

inorderUnRec(root);

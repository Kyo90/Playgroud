

var isBalanced = function(root) {
  const getHeight = (node) => {
    if(node) {
      let lh = 0, rh = 0;
      if(node.left) {
       lh = getHeight(node.left)
      }
      if(node.right) {
       rh = getHeight(node.right)
      }
      return Math.max(lh, rh) + 1
    }
    return ture
  }

  if(root) {
     const leftHeight = getHeight(root.left);
     const rightHeight = getHeight(root.right);
     return Math.abs(leftHeight - rightHeight) <= 1 
  }

};

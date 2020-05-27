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
  return 0
}

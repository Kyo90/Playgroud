/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */


/** 
 * 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没有填满外，其余每层节点数都达到最大值，
 * 并且最下面一层的节点都集中在该层最左边的若干位置。
 * 
 * 完全二叉树由满二叉树引出。
 * 
 * 满二叉树：如果二叉树中除了叶子节点，每个节点的度都为2，则此二叉树为满二叉树。
 * 
 * 
*/


var countNodes = function(root) {
  const countLevel = (root) => {
    let level = 0;
    while(root !== null) {
      level ++;
      root = root.left;
    }
    return level
  }

  if(root === null) {
    return 0;
  }
  let left = countLevel(root.left);
  let right = countLevel(root.right);
  if(left === right) {
    return countNodes(root.right) + (1 << left)
  } else {
   return countNodes(root.left) + (1 << right)
  }
};

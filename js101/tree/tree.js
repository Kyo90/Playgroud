function Node(data, left, right) {
  this.left = left;
  this.right = right;
  this.val = data;
  this.show = () => {
    return this.val;
  };
}

function insert(data) {
  var node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.val) {
        current = current.left; //到左子树
        if (current === null) {
          //如果左子树为空，说明可以将node插入在这里
          parent.left = node;
          break; //跳出while循环
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}

function find(data) {
  var current = this.root;
  while (true) {
    if (data === current.val) {
      return current;
    }
    current = data < current.val ? current.left : current.right;
    if (current === null) {
      return null;
    }
  }
}

function removeNode(node, data) {
  if (node === null) {
    return null;
  }
  if (data === node.val) {
    if (node.left === null && node.right === null) {
      return null;
    }
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
  } else if (data < node.val) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

class BST {
  constructor() {
    this.root = null; //初始化,root为null
  }

  insert(data) {
    var node = new Node(data, null, null);
    if (this.root === null) {
      this.root = node;
    } else {
      var current = this.root;
      var parent;
      while (true) {
        parent = current;
        if (data < current.val) {
          current = current.left; //到左子树
          if (current === null) {
            //如果左子树为空，说明可以将node插入在这里
            parent.left = node;
            break; //跳出while循环
          }
        } else {
          current = current.right;
          if (current === null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }
  // 根-左-右
  preOrderRec() {
    const result = [];
    const pushRoot = (node) => {
      if (node != null) {
        result.push(node.val);
        if (node.left) {
          pushRoot(node.left);
        }
        if (node.right) {
          pushRoot(node.right);
        }
      }
    };
    pushRoot(this.root);
    console.log(result);
  }

  preOrderUnRec(node) {
    // 先序非递归遍历是利用了栈，将根结点放入栈中，然后再取出来，将值放入结果数组，
    // 然后如果存在右子树，将右子树压入栈，
    // 如果存在左子树，将左子树压入栈，
    // 然后循环判断栈是否为空，重复上述步骤。
    const nodes = [];
    const stack = [];
    while (stack.length || node) {
      nodes.push(node.val);
      if (node.left) {
        if (node.right) {
          stack.push(node.right);
        }
        node = node.left;
      } else {
        node = stack.pop();
      }
    }
    console.log(nodes);
    return nodes;
  }

  // 左-根-右
  inOrderRec() {
    const result = [];
    const pushRoot = (node) => {
      if (node) {
        if (node.left) {
          pushRoot(node.left);
        }
        result.push(node.val);
        if (node.right) {
          pushRoot(node.right);
        }
      }
    };
    pushRoot(this.root);
    console.log(result);
  }

  // 左-右-根
  postOrdeRec() {
    const result = [];
    const pushRoot = (node) => {
      if (node) {
        if (node.left) {
          pushRoot(node.left);
        }
        if (node.right) {
          pushRoot(node.right);
        }
        result.push(node.val);
      }
    };
    pushRoot(this.root);
    console.log(result);
  }
}

function preOrderUnRec1(node) {
  let nodes = [];
  if (node) {
    //判断二叉树是否为空
    var stack = [node]; //将二叉树压入栈
    while (stack.length !== 0) {
      //如果栈为空，则循环遍历
      node = stack.pop(); //从栈中取出一个结点
      nodes.push(node.val); //将取出结点的值存入数组中
      if (node.right) stack.push(node.right); //如果存在右子树，将右子树压入栈
      if (node.left) stack.push(node.left); //如果存在左子树，将左子树压入栈
    }
  }
}

function  inOrderUnRec(node) {
  const stack = [];
  const nodes = [];
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      nodes.push(node.val);
      node = node.right;
    }
  }
  console.log(nodes);
}

function postOrderUnRec(node) {
  // 这里使用了一个tmp变量来记录上一次出栈、入栈的结点。
  // 思路是先把根结点和左树推入栈，然后取出左树，再推入右树，取出，最后取根结点。
  const nodes = [];
  if (node) {
    const stack = [node];
    let tmp = null;
    while (stack.length) {
      tmp = stack[stack.length - 1];
      if (tmp.left && tmp.left !== node && tmp.right !== node) {
        stack.push(tmp.left);
      } else if (tmp.right && tmp.right !== node) {
        stack.push(tmp.right);
      } else {
        nodes.push(stack.pop().val);
        node = tmp;
      }
    }
  }
  console.log(nodes);
  return nodes;
}

function breadthTraversal(node) {
  const nodes = [];
  if (node) {
    //判断二叉树是否为空
    var que = [node]; //将二叉树放入队列
    while (que.length !== 0) {
      //判断队列是否为空
      node = que.shift(); //从队列中取出一个结点
      nodes.push(node.val); //将取出结点的值保存到数组
      if (node.left) que.push(node.left); //如果存在左子树，将左子树放入队列
      if (node.right) que.push(node.right); //如果存在右子树，将右子树放入队列
    }
  }
  console.log(nodes);
}

var bst = new BST();
bst.insert(56);
bst.insert(22);
bst.insert(81);
bst.insert(10);
bst.insert(30);
bst.insert(77);
bst.insert(92);

//preOrderUnRec(bst.root);
breadthTraversal(bst.root)

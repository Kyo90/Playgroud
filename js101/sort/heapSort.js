/*
 根节点与最后一个节点交换。然后重新从根节点开始调整，
 并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，
 即比较到最后一个结点前一个即可。
*/

function heap_sort(arr, n) {
  build_heap(arr);
  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i);
  }
}

function build_heap(arr = []) {
  if (arr.length <= 1) return arr;
  const last_node = arr.length - 1;
  const parent = Math.floor((last_node - 1) / 2);
  for (let i = parent; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
}

const heapify = (array, i, length) => {
  // let temp = array[i]; // 当前父节点
  // j < length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    let temp = array[i];
    if (j + 1 < length && array[j] < array[j + 1]) {
      j++; // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < array[j]) {
      swap(array, i, j); // 如果父节点小于子节点:交换；否则跳出
      i = j; // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
};

const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

function print(arr = []) {
  console.log(arr.join(','))
}




const tree = [2, 5, 3, 1, 10, 4];
// heap_sort(tree, tree.length);
heapify(tree, 0, tree.length);
// build_heap(tree);
print(tree);

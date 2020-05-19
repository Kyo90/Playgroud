class ListNode {
  constructor(element) {
    this.value = element;
    this.next = null;
  }
} 

let LinkedList2 = (function () {
  //这里我们使用WeakMap对象来记录长度状态
  const length = new WeakMap();
  const head = new WeakMap();
  class LinkedList2 {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
    }
    append(element) {
      let node = new ListNode(element),
        current;
      if (this.getHead() === null) {
        head.set(this, node);
      } else {
        current = this.getHead();
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
      let l = this.size();
      l++;
      length.set(this, l);
    }
    insert(position, element) {
      if (position >= 0 && position <= this.size()) {
        let node = new ListNode(element),
          current = this.getHead(),
          previous,
          index = 0;
        if (position === 0) {
          node.next = current;
          head.set(this, node);
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }
        let l = this.size();
        l++;
        length.set(this, l);
        return true;
      } else {
        return false;
      }
    }
    removeAt(position) {
      if (position > -1 && position < this.size()) {
        let current = this.getHead(),
          previous,
          index = 0;
        if (position === 0) {
          head.set(this, current.next);
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        let l = this.size();
        l--;
        length.set(this, l);
        return current.value;
      } else {
        return null;
      }
    }
    remove(element) {
      let index = this.indexOf(element);
      return this.removeAt(index);
    }
    indexOf(element) {
      let current = this.getHead(),
        index = 0;
      while (current) {
        if (element === current.value) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    }
    isEmpty() {
      return this.size() === 0;
    }
    size() {
      return length.get(this);
    }
    getHead() {
      return head.get(this);
    }
    toString() {
      let current = this.getHead(),
        string = "";
      while (current) {
        string += current.value + (current.next ? ", " : "");
        current = current.next;
      }
      return string;
    }
    print() {
      console.log(this.toString());
    }
  }
  return LinkedList2;
})();

let list = new LinkedList2();
for (let i = 0; i < 5; i += 1) {
  list.append(i+1);
}
// list.print();


function print(head) {
  let p = dummyNode = new ListNode();
  let current = p.next = head;
  const values = [];
  while(current) {
    values.push(current.value);
    current = current.next;
  }
  console.log(values.join(','))
}

var reverseList = function (head) {
  if (!head) return null;
  let pre = null,
    cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};

var reverseBetween = function(head, m, n) {
  let count = n - m;
  let p = dummyNode = new ListNode();
  let pre, cur, front, tail;
  p.next = head;
  for(let i = 0; i < m -1; i++) {
    p = p.next;
  }
  front = p;
  pre = tail = p.next;
  cur = pre.next;
  for(let i = 0; i < count; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  front.next = pre;
  tail.next = cur;
  return dummyNode.next
}

// const reversed = reverseList(list.getHead())
// print(reversed)

const reversedBetween = reverseBetween(list.getHead(), 2, 4);
print(reversedBetween)

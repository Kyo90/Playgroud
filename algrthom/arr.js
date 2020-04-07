const nested = (items, id = null, link = "parent_id") => {
  return items.filter(item => item[link] === id)
  .map(item => ({
    ...item,
    children: nested(items, item.id)
  }));
};



const nestedComments = nested(comments);

console.log(nestedComments)

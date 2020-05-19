function compile(tpl, data) {
  const regex = /\{\{([^}]*)\}\}/g;
  const string = tpl.trim().replace(regex, function (match, $1) {
    if ($1) {
      const arr = $1.split(".");
      return getValue(data, arr);
    } else {
      return "";
    }
  });
  console.log(string);
}

function getValue(data, arr) {
  let attr;
  if (arr.length) {
    attr = arr.shift();
    return getValue(data[attr], arr);
  }
  return data;
}
const tpl =
  "<p>hello，我是{{name}}，年龄：{{info.age}}<p>，工作经历：{{info.experience.company}}，工作时间：{{info.experience.time}}";
const data = {
  name: "abc",
  info: { age: 24, experience: { company: "def", time: "two years" } },
};
compile(tpl, data);

/*
  argv
  argv0
  execArgv
  execPath
*/
const { argv, argv0, execArgv, execPath } = process;

argv.forEach(item => {
  console.log(item);
});

//argv 默认

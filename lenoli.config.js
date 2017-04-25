module.exports = {
  apps : [
    {
      name        : "lenoli",
      script      : "./index.js",
      watch       : true,
      instances  : 2,
      exec_mode  : "cluster"
    }
  ]
}

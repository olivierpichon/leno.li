module.exports = {
  apps : [
    {
      name        : "lenoli",
      script      : "./app.js",
      watch       : true,
      instances  : 2,
      exec_mode  : "cluster"
    }
  ]
}

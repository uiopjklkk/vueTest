<template>
  <router-view/>
</template>

<script>
</script>

<style lang="scss">
* {
  padding: 10px;
}
div {
  width: 800px;
  margin: 0 auto;
}
a:hover {
  color: purple;
  text-decoration: underline;
}
table {
  text-align: center;
  width: 100%;
  font-family: 黑体;
  font-size: 18px;
  padding: 0px;
  border-width: 3px;
  border-color: #6f6f6f;
  border-collapse: collapse;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.9)
}
td {
  width: 10%
}
.listLogStyle {
  text-align: center;
}
.inputNumDiv {
  text-align: center;
}
.inputTextStyle {
  margin: 0 50px 0 50px;
  text-align: center;
}
.buttonStyle {
  margin: 0 50px 0 50px;
  width: 100px;
  font-size: 15px;
  background-color: #e8e8e8;
  border-radius: 12px;
  box-shadow: 0 6px 8px 0 rgba(0,0,0,0.2);
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
.buttonStyle:hover {
    box-shadow: 0 12px 26px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    color: purple;
    text-decoration: underline;
    font-weight: bold;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>

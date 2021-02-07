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
   position: relative;
   text-decoration: none;
   background-color: #e8e8e8;
   font-family: 黑体;
   font-weight: 100px;
   font-size: 15px;
   margin: 0 50px 0 50px;
   border-radius: 8px;
   box-shadow: 0px 10px 0px #e8e8e8, 0px 16px 15px rgba(0, 0, 0, .7);
   text-align: center;
   -webkit-transition: all .1s ease;
   -moz-transition: all .1s ease;
   transition: all .1s ease;
}
.buttonStyle:active{
 box-shadow: 0px 3px 0px #000000, 0px 3px 6px rgba(0, 0, 0, .9);
 position: relative;
 top: 6px;
}
.buttonStyle:hover{
  color: purple;
  text-decoration: underline;
}
.buttonStyleOn {
   position: relative;
   text-decoration: none;
   background-color: #e8e8e8;
   font-family: 黑体;
   font-weight: 100px;
   font-size: 15px;
   margin: 0 50px 0 50px;
   border-radius: 8px;
   box-shadow: 0px 3px 0px #000000, 0px 3px 6px rgba(0, 0, 0, .9);
   top: 6px;
   text-align: center;
   -webkit-transition: all .1s ease;
   -moz-transition: all .1s ease;
   transition: all .1s ease;
}
.buttonStyleOn:hover{
  color: purple;
  text-decoration: underline;
}
.buttonStyleOn:active{
 box-shadow: 0px 3px 0px #000000, 0px 3px 6px rgba(0, 0, 0, .9);
 position: relative;
 top: 6px;
}
</style>

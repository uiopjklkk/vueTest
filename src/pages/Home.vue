<template>
  <div class="contant">
    <div class="contant-list">
       {{listLog}}
    </div>
    <div class="contant-input">
      <input class="input-text" id="text1" type="text" v-model="num1" />
      <input class="input-text" id="text2" type="text" v-model="num2" />
    </div>
    <div class="contant-input">
      <button
      class="button"
      type="button" @click="randomList()">随机生成100个整数</button>
    </div>
    <HomeList ref="homelist"
    :num1="this.num1" :num2="this.num2" :numList="this.numList"
    :pageList="this.pageList"
    :pageMaxNum="this.pageMaxNum"
    :refreshList="this.refreshList"
    :isFour="this.isFour" :isFive="this.isFive"></HomeList>
    <div class="contant-mul" v-if="this.numList.length > 0">
      <button
      :class="[this.isFour ? 'button-on' : 'button']"
      type="button" @click="fourMul()">4的倍数</button>
      <button
      :class="[this.isFive ? 'button-on' : 'button']"
      type="button" @click="fiveMul()">5的倍数</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import HomeList from './HomeList.vue'
import axios from 'axios'

export default {
  // 组件
  components: {
    HomeList: HomeList
  },
  name: 'Home',
  store,
  data () {
    return {
      num1: '',
      num2: '',
      numList: [],
      listLog: '请在下列两个文本框中输入一对正确的正整数范围',
      buttonStyle: '',
      pageMaxNum: 100,
      pageList: 0,
      isFour: false,
      isFive: false,
      nowPage: 0,
      refreshList: false
    }
  },
  watch: {
    num1: function (newNum1, oldNum1) {
      this.listLog = '正在输入第一个数值中..'
      this.debouncedGetNumber()
      this.numList.length = 0
    },
    num2: function (newNum2, oldNum2) {
      this.listLog = '正在输入第二个数值中..'
      this.debouncedGetNumber()
      this.numList.length = 0
    }
  },
  created: function () {
    this.debouncedGetNumber = _.debounce(this.setTableList, 500)
  },
  methods: {
    /**
     * 设置表格范围
     */
    setTableList: function () {
      if (this.num1 === '') {
        this.listLog = '请填写第一个数值.(数值不能为空)'
        document.getElementById('text1').focus()
        return
      }
      if (this.num2 === '') {
        this.listLog = '请填写第二个数值.(数值不能为空)'
        document.getElementById('text2').focus()
        return
      }
      if (!(/^[0-9]\d*$/.test(this.num1))) {
        this.listLog = '第一个数值未输入或输入不正确！(请输入一个正整数)'
        document.getElementById('text1').focus()
        return
      }
      if (!(/^[0-9]\d*$/.test(this.num2))) {
        this.listLog = '第二个数值未输入或输入不正确！(请输入一个正整数)'
        document.getElementById('text2').focus()
        return
      }
      let n1 = parseInt(this.num1)
      let n2 = parseInt(this.num2)
      this.num1 = n1
      this.num2 = n2
      if (n1 >= n2) {
        this.listLog = '不是一个正确的范围！(第一个数必须比第二个数小)'
        if (n2 == 0) { // eslint-disable-line
          document.getElementById('text2').focus()
          return
        }
        document.getElementById('text1').focus()
        return
      }
      this.listLog = '输入已完成，即将生成对应表格(每页最多生成'+this.pageMaxNum+'个数字)'
      this.createList()
    },
    /**
     * 生成表格
     * pageList: 表格总页数
     * nowPage: 表格当前页数
     */
    createList: function () {
      if (this.refreshList == false) {
        this.refreshList = true
      } else {
        this.refreshList = false
      }
      this.pageList = 0
      let n1 = parseInt(this.num1)
      let n2 = parseInt(this.num2)
      let pageList = parseInt((n2 - n1 + 1) / this.pageMaxNum)
      if ((n2 - n1 + 1) % this.pageMaxNum > 0) {
        pageList++
      }
      // 初始只生成一个表格
      this.pageList = pageList
      this.numList.push([])
      for (; n1 <= n2; n1++) {
        this.numList[0].push(n1)
        if (this.numList[0].length === this.pageMaxNum) {
          break
        }
      }
    },
    /**
     * 点击4的倍数按钮
     */
    fourMul: function () {
      if (this.isFour === false) {
        this.isFour = true
      } else {
        this.isFour = false
      }
      //this.$refs.homelist.clickFourMultiple() // 调用子组件方法
    },
    /**
     * 点击5的倍数按钮
     */
    fiveMul: function () {
      if (this.isFive === false) {
        this.isFive = true
      } else {
        this.isFive = false
      }
      //this.$refs.homelist.clickFiveMultiple()
    },
    /**
     * 点击随机生成100个整数按钮
     */
    randomList: function () {
      this.numList = []
      this.pageList = 1
      if (this.refreshList == false) {
        this.refreshList = true
      } else {
        this.refreshList = false
      }
      var vm = this
      // 使用axios调用接口
      axios.get('/news/index')
        .then(function (res) {
          vm.numList.push(res.data.randomList.slice(0, res.data.randomList.length))
          vm.listLog = '已成功生成100个随机整数'
      })
    }
    // for (var i = 0; i < 100; i++) {
    //   randomNum =  Math.floor(Math.random()*10000)+1
    //   randomList.push(randomNum)
    // this.numList = this.numList.concat(randomList)
    // this.listLog = '已成功生成100个随机正整数'
  }
}
</script>

<style scoped lang="scss">
.contant {
  text-align: center;
}
.contant-list {
  margin-left: -20px;
  margin-right: -20px;
}
.contant-input {
  margin-left: -20px;
  margin-right: -20px;
}
.contant-mul {
  margin-left: -20px;
  margin-right: -20px;
  margin-top: -40px;
}
.input-text {
  margin: 0 50px 0 50px;
}
.button {
   position: relative;
   text-decoration: none;
   background-color: #e8e8e8;
   font-family: 黑体;
   font-weight: 100px;
   font-size: 15px;
   margin: 0 50px 0 50px;
   border-radius: 8px;
   box-shadow: 0px 10px 0px #e8e8e8, 0px 16px 15px rgba(0, 0, 0, .7);
   -webkit-transition: all .1s ease;
   -moz-transition: all .1s ease;
   transition: all .1s ease;
}
.button-random:active{
 box-shadow: 0px 3px 0px #000000, 0px 3px 6px rgba(0, 0, 0, .9);
 position: relative;
 top: 6px;
}
.button-random:hover{
  color: purple;
  text-decoration: underline;
}
.button-on {
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
   -webkit-transition: all .1s ease;
   -moz-transition: all .1s ease;
   transition: all .1s ease;
}
.button-on:hover{
  color: purple;
  text-decoration: underline;
}
.button-on:active{
 box-shadow: 0px 3px 0px #000000, 0px 3px 6px rgba(0, 0, 0, .9);
 position: relative;
 top: 6px;
}
</style>

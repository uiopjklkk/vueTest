<template>
  <div>
    <div class="listLogStyle">
      {{listLog}}
    </div>
    <div class="inputNumDiv">
      <input class="inputTextStyle" id="text1" type="text" v-model="num1" />
      <input class="inputTextStyle" id="text2" type="text" v-model="num2" />
    </div>
    <ListTable ref="listtable" :num1="this.num1" :num2="this.num2" :numList="this.numList"></ListTable>
    <!-- <list-table :numList="this.numList"></list-table> -->
    <div class="inputNumDiv" v-if="this.numList.length > 0">
      <button class="buttonStyle" type="button" @click="fourMul()">4的倍数</button>
      <button class="buttonStyle" type="button" @click="fiveMul()">5的倍数</button>
    </div>
  </div>
<!--  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import store from '@/store'
import ListTable from '../components/ListTable.vue'
var _ = require('lodash')

export default {
  name: 'Home',
  store,
  data () {
    return {
      num1: '',
      num2: '',
      numList: [],
      listLog: '请在下列两个文本框中输入一对正确的正整数范围'
    }
  },
  watch: {
    num1: function (newNum1, oldNum1) {
      this.listLog = '正在输入第一个数值中..'
      this.debouncedGetAnswer()
      this.numList.length = 0
    },
    num2: function (newNum2, oldNum2) {
      this.listLog = '正在输入第二个数值中..'
      this.debouncedGetAnswer()
      this.numList.length = 0
    }
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
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
      var n1 = parseInt(this.num1)
      var n2 = parseInt(this.num2)
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
      this.listLog = '输入已完成，即将生成对应表格'
      this.createList()
      // var vm = this
      // axios.get('https://yesno.wtf/api')
      //   .then(function (response) {
      //     vm.listLog = _.capitalize(response.data.listLog)
      //   })
      //   .catch(function (error) {
      //     vm.listLog = 'error!' + error
      //   })
    },
    createList: function () {
      var n1 = parseInt(this.num1)
      var n2 = parseInt(this.num2)
      for (var i = n1; i <= n2; i++) {
        this.numList.push(i)
      }
    },
    fourMul: function () {
      this.$refs.listtable.chickFourMultiple()
    },
    fiveMul: function () {
      this.$refs.listtable.chickFiveMultiple()
    }
  },
  components: {
    ListTable: ListTable
  }
}
</script>

<style scoped lang="scss">

</style>

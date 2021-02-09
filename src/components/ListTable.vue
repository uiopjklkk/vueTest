<template>
  <div>
    <div v-if="this.isFlag">
      <table id="tab" border="1px" v-if="this.numList.length > 0">
        <tr v-for="(row,rowKey) in tableNumList" :key="rowKey"
          :class="{firstRow: rowKey === 0}">
          <td v-for="(num,numKey) in row" :key="numKey"
            :class="{isFive: five && num % 5 === 0 && num != ''}">
            <a
            :class="{ isFour: four && num % 4 === 0}"
            :id="num" @click="$refs.inputtable.openTable(num, rowKey, numKey)">{{num}}</a>
            <!-- :class="{ fourMultiple: this.isFour, fiveMultiple: this.isFive }" -->
          </td>
        </tr>
      </table>
      <div class="pageNumber" v-if="this.numList.length > 0">
        <a :class="[this.nowPage > 0 ? 'pageNeLs' : 'noPageNels']"
        @click="lastPage()">[上一页]</a>
        当前页数: {{nowPage + 1}} / {{this.$parent.pageList}}
        <a :class="[this.$parent.pageList > this.nowPage+1 ? 'pageNeLs' : 'noPageNels']"
        @click="nextPage()">[下一页]</a>
      </div>
      <InputTable ref="inputtable"></InputTable>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import InputTable from '../components/InputTable.vue'
export default {
  name: 'ListTable',
  store,
  props: {
    num1: {
      default: 0
    },
    num2: {
      default: 0
    },
    // 原数字数组
    numList: {
      type: Array
    },
    pageMaxNum: {
      default: 100
    }
  },
  data () {
    return {
      isFlag: true,
      four: false,
      five: false,
      nowPage: 0
    }
  },
  computed: {
    tableNumList: function () {
      var array = []
      var index = 0
      // var len = 0
      if (this.numList.length === 0 || this.numList[this.nowPage].length === 0) {
        return
      }
      while (index < this.numList[this.nowPage].length) {
        array.push(this.numList[this.nowPage].slice(index, index += 10))
      }
      while ((array[(array.length - 1)]).length < 10) {
        (array[(array.length - 1)]).push('')
      }
      return array
    }
  },
  methods: {
    // 修改表格中数字
    updateNum: function (newNum, num, rowKey, numKey) {
      // var n = prompt('您正在修改数字为' + num + '的值', '请在此处输入您想要的数字(整数)')
      var n = newNum
      this.number = num
      if (n !== '') {
        if (/^-?\d+$/.test(n)) {
          n = parseInt(n)
          this.isFlag = false
          this.checkTableNumList(num, n, rowKey, numKey)
          this.$refs.inputtable.isShow = false
          this.$refs.inputtable.newNum = ''
          this.$refs.inputtable.baseNum = 0
          this.$refs.inputtable.rowKey = 0
          this.$refs.inputtable.numKey = 0
        } else {
          alert('您必须输入一个整数！')
        }
      } else {
        alert('您输入的值不能为空！')
      }
    },
    // 检查对应数字在各数组中的具体定位
    checkTableNumList: function (num, n, rowKey, numKey) {
      this.tableNumList[rowKey][numKey] = n
      var numStr = '' + rowKey + numKey
      this.numList[this.nowPage][parseInt(numStr)] = n
      this.isFlag = true
    },
    chickFourMultiple: function () {
      if (this.four === false) {
        this.four = true
      } else {
        this.four = false
      }
    },
    chickFiveMultiple: function () {
      if (this.five === false) {
        this.five = true
      } else {
        this.five = false
      }
    },
    nextPage: function () {
      if (this.$parent.pageList > this.nowPage+1) {
        this.nowPage++
        if (this.numList.length === this.nowPage) {
          this.numList.push([])
          var n1 = parseInt(this.$parent.num1) + this.nowPage * this.pageMaxNum
          var n2 = parseInt(this.$parent.num2)
          for (; n1 <= n2; n1++) {
            this.numList[this.nowPage].push(n1)
            if (this.numList[this.nowPage].length === this.pageMaxNum) {
              break
            }
          }
        }
      } else {
        return
      }
    },
    lastPage: function () {
      if (this.nowPage > 0) {
        this.nowPage--
      } else {
        return
      }
    }
  },
  components: {
    InputTable: InputTable
  }
}
</script>

<style scoped lang="scss">
.isFour {
  color: red;
  font-weight: bold;
}
.isFive {
  background-color: green;
}
.firstRow{
  background-color: #bdb8b7;
}
.pageNumber {
  font-size: 18px;
  font-family: '楷体';
  margin-left: -40px;
}
.pageNeLs {
  font-weight: bold;
}
.noPageNels {
  font-weight: normal;
  font-size: 18px;
  color: #c2c2c2;
}
.noPageNels:hover {
  text-decoration: none;
}
</style>

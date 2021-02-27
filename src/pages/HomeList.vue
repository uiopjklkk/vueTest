<template>
  <div>
    <div v-if="this.isDisplay">
      <table id="tab" border="1px" v-if="this.numList.length > 0">
        <tr v-for="(row,rowKey) in tableNumList" :key="rowKey"
          :class="{'first-row': rowKey === 0}">
          <td v-for="(num,numKey) in row" :key="numKey"
            :class="{'is-five': isFive && num % 5 === 0 && num != ''}">
            <a
            :class="{'is-four': isFour && num % 4 === 0}"
            :id="num" @click="$refs.homelistdialog.openTable(num, rowKey, numKey)">{{num}}</a>
            <!-- :class="{ fourMultiple: this.isFour, fiveMultiple: this.isFive }" -->
          </td>
        </tr>
      </table>
      <div class="page-number" v-if="this.numList.length > 0">
        <a :class="[this.nowPage > 0 ? 'page-nextlast' : 'nopage-nextlast']"
        @click="lastPage()">[上一页]</a>
        当前页数: {{this.nowPage + 1}} / {{this.pageList}}
        <a :class="[this.pageList > this.nowPage+1 ? 'page-nextlast' : 'nopage-nextlast']"
        @click="nextPage()">[下一页]</a>
      </div>
      <HomeListDialog @updateNum="updateNum" ref="homelistdialog"></HomeListDialog>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import HomeListDialog from './HomeListDialog.vue'
export default {
  components: {
    HomeListDialog: HomeListDialog
  },
  name: 'HomeList',
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
    },
    pageList: {
      default: 0
    },
    isFour: {
      default: false
    },
    isFive: {
      default: false
    },
    refreshList: {
      default: false
    }
  },
  data () {
    return {
      isDisplay: true,
      nowPage: 0
    }
  },
  watch: {
    refreshList: function() {
      this.nowPage = 0
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
    updateNum: function (data) {
      // var n = prompt('您正在修改数字为' + num + '的值', '请在此处输入您想要的数字(整数)')
      var n = data.newNum
      this.number = data.baseNum
      if (n !== '') {
        if (/^-?\d+$/.test(n)) {
          n = parseInt(n)
          this.isDisplay = false
          this.checkTableNumList(data.baseNum, n, data.rowKey, data.numKey)
          data.isShow = false
          data.newNum = ''
          data.baseNum = 0
          data.rowKey = 0
          data.numKey = 0
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
      this.isDisplay = true
    },
    // 点击下一页
    nextPage: function () {
      if (this.pageList > this.nowPage+1) {
        this.nowPage++
        if (this.numList.length === this.nowPage) {
          this.numList.push([])
          var n1 = parseInt(this.num1) + this.nowPage * this.pageMaxNum
          var n2 = parseInt(this.num2)
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
    // 点击上一页
    lastPage: function () {
      if (this.nowPage > 0) {
        this.nowPage--
      } else {
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
.is-four {
  color: red;
  font-weight: bold;
}
.is-five {
  background-color: green;
}
.first-row{
  background-color: #bdb8b7;
}
.page-number {
  font-size: 18px;
  font-family: '楷体';
  margin-left: -40px;
}
.page-nextlast {
  font-weight: bold;
}
.nopage-nextlast {
  font-weight: normal;
  font-size: 18px;
  color: #c2c2c2;
}
.nopage-nextlast:hover {
  text-decoration: none;
}
</style>

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
            :id="num" @click="updateNum(num, rowKey, numKey)">{{num}}</a>
            <!-- :class="{ fourMultiple: this.isFour, fiveMultiple: this.isFive }" -->
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import store from '@/store'
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
      type: Array,
      default: function () {
        this.numList.push(0)
      }
    }
  },
  data () {
    return {
      isFlag: true,
      four: false,
      five: false
    }
  },
  computed: {
    tableNumList: function () {
      var array = []
      var index = 0
      // var len = 0
      if (this.numList.length === 0) {
        return
      }
      while (index < this.numList.length) {
        array.push(this.numList.slice(index, index += 10))
      }
      while ((array[(array.length - 1)]).length < 10) {
        (array[(array.length - 1)]).push('')
      }
      return array
    }
  },
  methods: {
    // 修改表格中数字
    updateNum: function (num, rowKey, numKey) {
      var n = prompt('您正在修改数字为' + num + '的值', '请在此处输入您想要的数字(整数)')
      if (n) {
        if (/^\d+$/.test(n)) {
          n = parseInt(n)
          alert('修改成功！该数字已经被您成功修改为' + n)
          this.isFlag = false
          document.getElementById('tab').rows[rowKey].cells[numKey].childNodes[0].innerText = n
          this.checkTableNumList(num, n, rowKey, numKey)
        } else {
          alert('您必须输入一个整数！')
        }
      } else {
      }
    },
    // 检查对应数字在各数组中的具体定位
    checkTableNumList: function (num, n, rowKey, numKey) {
      this.tableNumList[rowKey][numKey] = n
      var numStr = '' + rowKey + numKey
      this.numList[parseInt(numStr)] = n
      // var nu1 = parseInt(this.num1)
      // if (num < 10 + nu1) {
      //   this.tableNumList[0][num - nu1] = n
      //   this.numList[num] = n
      // } else if (num >= 10 + nu1) {
      //   var temp = num - nu1
      //   var numEnd = temp % 10
      //   var numStart = parseInt(temp / 10)
      //   this.tableNumList[numStart][numEnd] = n
      //   this.numList[num] = n
      // } else {
      //   this.tableNumList[this.tableNumList.length - 1].push(n)
      //   this.numList.push(n)
      // }
      this.isFlag = true
    },
    chickFourMultiple: function () {
      if (this.four === false) {
        this.four = true
        alert('已成功将所有4的倍数动态替换成红色字体，再次点击即可关闭')
      } else {
        this.four = false
        alert('已关闭所有4的倍数的动态字体改变')
      }
    },
    chickFiveMultiple: function () {
      if (this.five === false) {
        this.five = true
        alert('已成功将所有5的倍数动态替换成绿色背景，再次点击即可关闭')
      } else {
        this.five = false
        alert('已关闭所有5的倍数的动态字体背景改变')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.isFour {
  color: red;
}
.isFive {
  background-color: green;
}
.firstRow{
  background-color: #bdb8b7;
}
</style>

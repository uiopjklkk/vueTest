<template>
  <div class="dialog">
      <div class="dialog-cover back" v-if="this.isShow" @click="closeInput()"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="this.isShow">
          <div class="dialog_head_back">
              <slot name="header">您当前正在修改数字为 {{baseNum}} 的值</slot>
          </div>
          <div class="dialog_main">
              请在此处输入一个整数数字(回车确认,点空白取消)<br />
              <input type="text" id="inputText" v-model="newNum" />
          </div>
          <div class="foot_close">
              <button id="dialogYes" @click="enterInput()" @keyup.enter="enterClick()">确定</button>
              <button id="dialogNo" @click="closeInput()">取消</button>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InputTable',
  props: {
  },
  data () {
    return {
      isShow: false,
      newNum: '',
      baseNum: 0,
      rowKey: 0,
      numKey: 0
    }
  },
  created () {
    this.enterClick()
  },
  methods: {
    openTable (baseNum, rowKey, numKey) {
      this.baseNum = baseNum
      this.rowKey = rowKey
      this.numKey = numKey
      this.isShow = true
      setTimeout("document.getElementById('inputText').focus()",500)
    },
    closeInput () {
      this.isShow = false
    },
    enterInput () {
      this.$parent.updateNum(this.newNum, this.baseNum, this.rowKey, this.numKey)
    },
    enterClick () {
      document.onkeydown = e =>{
        if (e.keyCode === 13 ) {
          this.enterInput()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  div {
    text-align: center;
    padding: 10px;
    width: 320px;
    margin: 0 auto;
  }
  .drop-enter-active {
    transition: all .5s ease;
  }
  .drop-leave-active {
    transition: all .3s ease;
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    transform: translateY(500px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content {
    width: 100%;
    position: fixed;
    height: 240px;
    background: #fff;
    top: 50%;
    left: 50%;
    width: 320px;
    margin-left: -160px;
    margin-top: -100px;
    z-index: 10;
    border: 2px solid #464068;
    line-height: 1.6;
    padding: 0px;
    box-shadow: 0px 10px 30px rgba(0,0,0,0.9)
  }
  .dialog_head_back {
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 15px;
    line-height: 50px;
    font-family: '黑体';
    font-size: 20px;
    font-weight: bold;
    border-bottom:1px solid #a7a39f;
    background-color: #ececec;
  }
  .dialog_main {
    padding: 0px;
    margin-top: 25px;
    margin-bottom: 10px;
    font-size: 10px;
    color: #b1b1b1;
  }
  .dialog_main input {
    width: 200px;
    height: 15px;
  }
  .foot_close {
    padding: 0px;
    margin-top: 35px;
  }
  .foot_close button {
    background:hsl(101, 22%, 80%);
    height:35px;
    width:70px;
    margin-left: 30px;
    margin-right: 30px;
    line-height: 13px;
    font-weight: bold;
    font-size: 15px;
    border-radius:20% 10% 20% 10% / 80% 10% 80% 10%;
    border:1px solid #99aa99;
    box-shadow:/*底部灰色阴影*/
    2px 2px 2px 1px rgba(0,0,0,0.2),
    /*下面深蓝色立体阴影*/
    2px 4px 1px 1px hsl(100, 10%, 87%),
    /*内部暗色阴影*/
    0 -5px 2px 2px rgba(0,0,0,0.10) inset;
    color: hsl(0, 22%, 13%);
    text-shadow: rgba(255,255,255,.5) 0 1px 0;
    transition: all 1s;
  }
  .foot_close button:hover {
    background-color: #009e00;
  }
</style>

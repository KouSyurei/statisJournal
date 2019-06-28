<!-- 测试webSocket -->


<template>
    <el-container>
      <el-main>
        <div id="result"></div>
        <form>
            <el-input id="m" v-model="inputValue" aria-placeholder="请输入"></el-input>
            <el-button id="submite" @click="sendMsg">发送</el-button>
        </form>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "index",
      data(){
          return {
            inputValue:''
          }
      },
      created() {
        // if("WebScoket" in Window){
          let ws = new WebSocket("ws://192.168.1.9:8080");
          let result = document.getElementById('#result');
          ws.onopen = function () {
            result.innerHTML('已连接上！');
            console.log('已连接上！');
          };
          ws.onmessage = function (event) {
            console.log(event.data);
            result.innerHTML = event.data;
          }

          ws.onclose = function () {
            console.log('连接已关闭！');
          }
        // }else {
        //   alert('您的浏览器不支持WebScoket！')
        // }
      },
      methods:{
          sendMsg(){
              let msg = document.getElementById('#m').value;
              ws.send(msg);
              return false;
          }
      }
    }
</script>

<style scoped>

</style>

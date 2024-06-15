<template>
  <div class="donate">
    <h1>捐赠打赏</h1>
    <p>如果本站对您有所帮助，可以通过打赏来支持我提供更好的服务。</p>
    <el-card class="box-card">
      <div class="qrcodes">
        <img src="@/assets/alipay.png" alt="支付宝二维码" />
        <img src="@/assets/wechat.png" alt="微信二维码" />
      </div>
    </el-card>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.donate {
  text-align: center;
  padding: 20px;
}

.qrcodes {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap; /* 防止换行 */
}

.el-card {
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto; /* 居中 */

  .qrcodes img {
    width: 30%;
    height: auto;
    flex-shrink: 0; /* 防止缩小 */
  }
}

@media (max-width: 768px) {
  .el-card {
    width: 100%; /* 调整 card 宽度以适应手机屏幕 */
    margin: 0 auto; /* 居中 */
    padding: 10px; /* 增加内边距 */
  }
  .qrcodes {
    flex-wrap: nowrap; /* 防止换行 */
  }

  .qrcodes img {
    width: 60%; /* 增加二维码图片宽度 */
    margin: 0 5px; /* 增加左右间距 */
  }


}
</style>

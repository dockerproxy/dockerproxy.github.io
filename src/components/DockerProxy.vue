<template>
  <div>
    <el-main>
      <div class="hero">
        <h1>Docker Proxy</h1>
        <p>
          多平台容器镜像代理服务,支持 Docker Hub, GitHub, Google, k8s, Quay,
          Microsoft 等镜像仓库.
        </p>
        <!-- <p>本站提供企业付费私有镜像加速服务，有兴趣请留言。</p> -->
        <el-button type="primary" @click="navigateTo('/doc')"
          >使用文档</el-button
        >
        <div style="display: flex; justify-content: center">
          <p style="font-size: 30px">
            新增单镜像加速通道,速度更快，如果你可以访问github
            <el-link
              style="font-size: 30px"
              type="warning"
              href="https://github.com/kubesre/docker-registry-mirrors?tab=readme-ov-file#%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%8D%95%E9%95%9C%E5%83%8F%E5%8A%A0%E9%80%9F%E9%80%9A%E9%81%93"
              target="_blank"
              rel="noopener noreferrer"
              >点击去体验</el-link
            >
          </p>
          <!-- <el-button type="primary" plain @click="navigateTo('/doc')">点击去体验</el-button> -->
        </div>
        <div class="gpt">
          <p
            style="font-size: 20px"
            @click="
              navigateToExternal(
                'https://www.yuque.com/kubesre/cpduyq/kf8581aru299n8xq'
              )
            "
          >
            免魔法！非镜像！官网原版ChatGPT4账号免费使用，含最新4o模型
          </p>
          <el-button
            type="primary"
            @click="
              navigateToExternal(
                'https://www.yuque.com/kubesre/cpduyq/kf8581aru299n8xq'
              )
            "
            >点击使用</el-button
          >
        </div>
      </div>

      <div class="commands">
        <h2>快捷命令</h2>

        <el-card class="box-card">
          <el-alert title="重要提醒" type="warning">
            <p style="font-size: 20px">
              docker.{{ proxyDomain }} 拉取 dockerhub 仓库的域名被墙，更换为
              dhub.{{ proxyDomain }}。
            </p>
            <p style="font-size: 20px">
              镜像拉取慢？试试单镜像加速通道
              <el-link
              style="font-size: 20px"
              type="primary"
                href="https://github.com/kubesre/docker-registry-mirrors?tab=readme-ov-file#%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%8D%95%E9%95%9C%E5%83%8F%E5%8A%A0%E9%80%9F%E9%80%9A%E9%81%93"
                target="_blank"
                >点击去体验</el-link
              >
            </p>
          </el-alert>
          <el-form @submit.prevent="handleSubmit" label-position="top">
            <el-form-item
              label="第一步：输入原始镜像地址"
              class="form-item-full-width"
            >
              <el-input
                v-model="sourceImage"
                placeholder="stilleshan/frpc:latest"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="generateCommands"
                >获取命令</el-button
              >
            </el-form-item>
          </el-form>
          <div v-if="commandsVisible" class="command-output">
            <div class="command-section">
              <div class="command-header">
                <i class="el-icon-d-arrow-right"></i>
                <span>Docker 拉取命令</span>
              </div>
              <div class="command-body">
                <el-input v-model="proxyPullCommand" readonly></el-input>
                <el-button
                  type="primary"
                  @click="copyToClipboard(proxyPullCommand)"
                  >复制</el-button
                >
              </div>
              <div class="command-body">
                <el-input v-model="tagCommand" readonly></el-input>
                <el-button type="primary" @click="copyToClipboard(tagCommand)"
                  >复制</el-button
                >
              </div>
            </div>
            <div class="command-section">
              <div class="command-header">
                <i class="el-icon-d-arrow-right"></i>
                <span>Containerd 拉取命令</span>
              </div>
              <div class="command-body">
                <el-input v-model="ctrPullCommand" readonly></el-input>
                <el-button
                  type="primary"
                  @click="copyToClipboard(ctrPullCommand)"
                  >复制</el-button
                >
              </div>
              <div class="command-body">
                <el-input v-model="ctrTagCommand" readonly></el-input>
                <el-button
                  type="primary"
                  @click="copyToClipboard(ctrTagCommand)"
                  >复制</el-button
                >
              </div>
            </div>
            <div class="command-section">
              <div class="command-header">
                <i class="el-icon-document"></i>
                <span>Shell 快速替换命令</span>
              </div>
              <div class="command-body">
                <el-input v-model="sedCommand" readonly></el-input>
                <el-button type="primary" @click="copyToClipboard(sedCommand)"
                  >复制</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceImage: "stilleshan/frpc:latest",
      proxyPullCommand: "",
      tagCommand: "",
      ctrPullCommand: "",
      ctrTagCommand: "",
      removeCommand: "",
      sedCommand: "",
      commandsVisible: false,
      proxyDomain: process.env.VUE_APP_PROXY_DOMAIN || "kubesre.xyz",
    };
  },
  methods: {
    navigateTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
        this.closeDrawer(); // 关闭抽屉
      }
    },
    navigateToExternal(url) {
      window.open(url, "_blank");
      this.closeDrawer(); // 关闭抽屉
    },
    navigateTogw() {
      window.open("https://www.kubesre.com/", "_blank");
    },
    generateCommands() {
      let sourceImage = this.sourceImage;
      if (!sourceImage.includes(":")) {
        sourceImage += ":latest";
      }
      const proxyImage = this.getProxyRepo(sourceImage);
      this.proxyPullCommand = `docker pull ${proxyImage}`;
      this.tagCommand = `docker tag ${proxyImage} ${sourceImage}`;
      this.ctrPullCommand = `ctr images pull ${proxyImage}`;
      this.ctrTagCommand = `ctr images tag ${proxyImage} ${sourceImage}`;
      this.sedCommand = `sed -i "s#${sourceImage}#${proxyImage}#g" 你的文件名`;
      this.commandsVisible = true;
    },
    getProxyRepo(sourceRepo) {
      const proxyDomain = process.env.VUE_APP_PROXY_DOMAIN || "kubesre.xyz";
      const repoMapping = {
        "cr.l5d.io": `l5d.${proxyDomain}`,
        "docker.elastic.co": `elastic.${proxyDomain}`,
        "docker.io": `dhub.${proxyDomain}`,
        "gcr.io": `gcr.${proxyDomain}`,
        "ghcr.io": `ghcr.${proxyDomain}`,
        "k8s.gcr.io": `k8s-gcr.${proxyDomain}`,
        "registry.k8s.io": `k8s.${proxyDomain}`,
        "mcr.microsoft.com": `mcr.${proxyDomain}`,
        "nvcr.io": `nvcr.${proxyDomain}`,
        "quay.io": `quay.${proxyDomain}`,
        "registry.jujucharms.com": `jujucharms.${proxyDomain}`,
      };
      const defaultRepo = "docker.io";
      const parts = sourceRepo.split("/");

      let repoName, imageName;

      if (parts.length > 1 && parts[0].includes(".")) {
        repoName = parts[0];
        imageName = parts.slice(1).join("/");
      } else {
        repoName = defaultRepo;
        imageName = parts.join("/");
      }

      const targetRepo = repoMapping[repoName] || repoMapping[defaultRepo];

      // If the repoName is the default repo, don't include it in the final URL
      return `${targetRepo}/${imageName}`;
    },
    copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.$message({
            message: "复制成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            message: "复制失败",
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 防止页面出现水平滚动条 */
}

.el-card {
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto; /* 居中 */
}

.commands {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: left;
  width: 100%; /* 确保宽度为100% */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

.logo {
  font-size: 24px;
  color: rgb(31, 30, 30);
  text-align: center;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 50px 0;
  background: #3b8dbd;
  color: #fff;
  width: 100%; /* 确保宽度为100% */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

/* 确保表单元素和输入框不会超出容器宽度 */
.el-form-item {
  width: 100%;
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

.command-wrapper {
  display: flex;
  align-items: center;
}

.el-input {
  flex: 1;
  margin-right: 10px; /* 调整间距 */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

.command-section {
  margin-bottom: 20px;
}

.command-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
}

.command-header i {
  margin-right: 5px;
}

.command-body {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.command-body .el-input {
  flex: 1;
}

.command-body .el-button {
  margin-left: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-card {
    width: 100%;
  }

  .commands {
    padding: 20px;
  }
}

@media (min-width: 769px) {
  .el-card {
    width: 60%;
  }
}
</style>

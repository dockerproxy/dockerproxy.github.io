<template>
  <div>
    <el-main>
      <div class="hero">
        <h1>Docker Proxy</h1>
        <p>多平台容器镜像代理服务,支持 Docker Hub, GitHub, Google, k8s, Quay, Microsoft 等镜像仓库.</p>
        <!-- <p>本站提供企业付费私有镜像加速服务，有兴趣请留言。</p> -->
        <el-button type="primary" @click="navigateTo('/doc')">使用文档</el-button>
        <div class="gpt">
          <p style="font-size: 20px;">免魔法！非镜像！官网原版ChatGPT4账号免费使用，含最新4o模型</p>
          <el-button type="primary" @click="navigateToExternal('https://www.yuque.com/kubesre/cpduyq/kf8581aru299n8xq')">点击使用</el-button>
        </div>
      </div>


      <div class="commands">
        <h2>快捷命令</h2>

        <el-card class="box-card">
          
          <el-alert
            title="重要提醒"
            type="warning"
            >
            <p style="font-size: 20px;">docker.{{proxyDomain}} 拉取 dockerhub 仓库的域名被墙，更换为 dhub.{{proxyDomain}}。</p>
          </el-alert>
          <el-form @submit.prevent="handleSubmit" label-position="top">
            <el-form-item label="第一步：输入原始镜像地址" class="form-item-full-width">
              <el-input v-model="sourceImage" placeholder="stilleshan/frpc:latest"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="generateCommands">获取命令</el-button>
            </el-form-item>
          </el-form>
          <div v-if="commandsVisible">
            <el-form label-position="top">
              <h3>适用于将镜像拉取到本地的命令</h3>
              <el-form-item label="代理拉取镜像">
                <div class="command-wrapper">
                  <el-input v-model="proxyPullCommand" readonly></el-input>
                  <el-button type="primary" @click="copyToClipboard(proxyPullCommand)">复制</el-button>
                </div>
              </el-form-item>
              <el-form-item label="重命名镜像">
                <div class="command-wrapper">
                  <el-input v-model="tagCommand" readonly></el-input>
                  <el-button type="primary" @click="copyToClipboard(tagCommand)">复制</el-button>
                </div>
              </el-form-item>
              <el-form-item label="删除代理镜像">
                <div class="command-wrapper">
                  <el-input v-model="removeCommand" readonly></el-input>
                  <el-button type="primary" @click="copyToClipboard(removeCommand)">复制</el-button>
                </div>
              </el-form-item>
              <h3>适用于替换文件中镜像的命令</h3>
              <el-form-item label="替换文件中的镜像">
                <div class="command-wrapper">
                  <el-input v-model="sedCommand" readonly></el-input>
                  <el-button type="primary" @click="copyToClipboard(sedCommand)">复制</el-button>
                </div>
              </el-form-item>
            </el-form>
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
      sourceImage: 'stilleshan/frpc:latest',
      proxyPullCommand: '',
      tagCommand: '',
      removeCommand: '',
      sedCommand: '',
      commandsVisible: false,
      proxyDomain: process.env.VUE_APP_PROXY_DOMAIN || 'kubesre.xyz', 
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
      window.open(url, '_blank');
      this.closeDrawer(); // 关闭抽屉
    },
    navigateTogw() {
      window.open('https://www.kubesre.com/', '_blank');
    },
    generateCommands() {
      let sourceImage = this.sourceImage;
      if (!sourceImage.includes(':')) {
        sourceImage += ':latest';
      }
      const proxyImage = this.getProxyRepo(sourceImage);
      this.proxyPullCommand = `docker pull ${proxyImage}`;
      this.tagCommand = `docker tag ${proxyImage} ${sourceImage}`;
      this.removeCommand = `docker rmi ${proxyImage}`;
      this.sedCommand = `sed -i "s#${sourceImage}#${proxyImage}#g" 你的文件名`;
      this.commandsVisible = true;
    },
    getProxyRepo(sourceRepo) {
      const proxyDomain = process.env.VUE_APP_PROXY_DOMAIN || 'kubesre.xyz'; 
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
        "registry.jujucharms.com": `jujucharms.${proxyDomain}`
      };
      const defaultRepo = "docker.io";
      const parts = sourceRepo.split('/');
      const repoName = parts.length > 1 ? parts[0] : defaultRepo;
      const imageName = parts.length > 1 ? parts.slice(1).join('/') : parts[0];
      const targetRepo = repoMapping[repoName] || repoMapping[defaultRepo];
      return `${targetRepo}/${imageName}`;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      }).catch(() => {
        this.$message({
          message: '复制失败',
          type: 'error'
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
html, body {
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

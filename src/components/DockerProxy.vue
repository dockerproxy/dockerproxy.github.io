/* eslint-disable */
// eslint-disable-next-line vue/no-deprecated-slot-attribute
<template>
  <div>
    <el-header class="fixed-header">
      <div class="logo">docker proxy</div>
      <div>
        <el-menu mode="horizontal" class="el-menu" background-color="#fff" text-color="#545c64">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2" @click="navigateToDocs">使用文档</el-menu-item>
          <el-menu-item index="3" @click="navigateTogw">云原生社区</el-menu-item>
          <el-menu-item index="8">更多</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <div class="hero">
        <h1>Docker Proxy</h1>
        <p>多平台容器镜像代理服务,支持 Docker Hub, GitHub, Google, k8s, Quay, Microsoft 等镜像仓库.</p>
        <!-- <p>本站提供企业付费私有镜像加速服务，有兴趣请留言。</p> -->
        <el-button type="primary" @click="navigateToDocs">使用文档</el-button>
      </div>

      <div class="commands">
        <h2>快捷命令</h2>
        <el-card class="box-card">
          <el-form @submit.prevent="handleSubmit">
            <el-form-item label="第一步：输入原始镜像地址" class="form-item-full-width">
              <el-input v-model="sourceImage" placeholder="stilleshan/frpc:latest"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="generateCommands">获取命令</el-button>
            </el-form-item>
          </el-form>
          <div v-if="commandsVisible">
            <el-form>
              <h3>适用于将镜像拉取到本地的命令</h3>
              <el-form-item label="代理拉取镜像">
                <el-input v-model="proxyPullCommand" readonly></el-input>
              </el-form-item>
              <el-form-item label="重命名镜像">
                <el-input v-model="tagCommand" readonly></el-input>
              </el-form-item>
              <el-form-item label="删除代理镜像">
                <el-input v-model="removeCommand" readonly></el-input>
              </el-form-item>
              <h3>适用于替换文件中镜像的命令</h3>
              <el-form-item label="替换文件中的镜像">
                <el-input v-model="sedCommand" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-main>
    <el-footer>© dockerproxy.xyz. All rights reserved.</el-footer>
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
      commandsVisible: false
    };
  },
  methods: {
    navigateToDocs() {
      window.open('https://github.com/kubesre/docker-registry-mirrors', '_blank');
    },
    navigateTogw() {
      window.open('https://www.kubesre.com/', '_blank');
    },
    generateCommands() {
      const proxyImage = this.getProxyRepo(this.sourceImage);
      this.proxyPullCommand = `docker pull ${proxyImage}`;
      this.tagCommand = `docker tag ${proxyImage} ${this.sourceImage}`;
      this.removeCommand = `docker rmi ${proxyImage}`;
      this.sedCommand = `sed -i "s#${this.sourceImage}#${proxyImage}#g" 你的文件名`;
      this.commandsVisible = true;
    },
    getProxyRepo(sourceRepo) {
      const proxyDomain = process.env.VUE_APP_PROXY_DOMAIN || 'kubesre.xyz'; 
      const repoMapping = {
        "cr.l5d.io": `l5d.${proxyDomain}`,
        "docker.elastic.co": `elastic.${proxyDomain}`,
        "docker.io": `docker.${proxyDomain}`,
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

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  position: fixed;
  background-color: #ffffff; /* 确保背景颜色覆盖内容 */
  z-index: 1000; /* 确保导航栏在其他内容之上 */
  width: 100%; /* 确保宽度为100% */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

.el-menu {
  width: auto; /* 自适应宽度 */
}
.el-footer {
  text-align: center;
  padding: 10px 0;
  background: #f2f2f2;
  width: 100%; /* 确保宽度为100% */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
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

.el-input {
  width: 100%; /* 确保输入框宽度为100% */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .el-menu {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

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

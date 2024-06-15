<template>
  <div>
    <el-main>
      <div class="hero">
        <div class="documentation">
          <h2>使用文档</h2>
          <el-card class="box-card">
            <div class="right-panel">
              <h2>使用文档</h2>
              <p>使用本站软件时拉取的镜像自动修改为本站站名，可能会影响实际使用。本站推荐三种方式以供不同的需求来使用：</p>
              <ol>
                <li>参考首页 快捷命令，使用本站代理拉取镜像，并修改回原始镜像名，在删除代理镜像名。</li>
                <li>参考以下 docker cli 和 docker-compose.yml 修改镜像名后，继续一直使用本站代理服务未启动或更新新镜像。</li>
                <li>参考下文 修改 daemon.json 配置文件，来更便捷地使用代理服务。</li>
              </ol>
              <h3>docker cli</h3>
              <pre><code>docker run -d --name frpc \\
-v /path/frpc.ini:/frp/frpc.ini \\
docker.{{proxyDomain}}/stilleshan/frpc:latest
              </code></pre>
              <h3>docker-compose.yml</h3>
              <pre><code>version: "3.9"
services:
  frpc:
    image: docker.{{proxyDomain}}/stilleshan/frpc:latest
    volumes:
      - ./frpc.ini:/frp/frpc.ini
    restart: always
              </code></pre>
              <h3>修改 daemon.json (推荐)</h3>
              <p>如果仅仅是使用 Docker Hub 官方镜像,可以将本站加入到 daemon.json 文件中,那么可以直接使用正常的官方命令来拉取镜像或启动容器,系统会自动使用本站代理服务,而不会有上述镜像名的问题.参考添加以下信息。</p>
              <pre><code>{ "registry-mirrors": [ "docker.{{proxyDomain}}" ] }
             </code></pre>
             <h1>Docker 镜像代理命令</h1>
              <div class="command-section">
                <h2>Docker Hub 官方镜像代理</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull stilleshan/frpc:latest
代理命令：docker pull docker.{{proxyDomain}}/stilleshan/frpc:latest
                </code></pre>
                <h3>根镜像代理</h3>
                <pre><code>官方命令：docker pull nginx:latest
代理命令：docker pull docker.{{proxyDomain}}/nginx:latest
                </code></pre>
              </div>

              <div class="command-section">
                <h2>GitHub Container Registry</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull ghcr.io/username/image:tag
代理命令：docker pull ghcr.{{proxyDomain}}/username/image:tag
                </code></pre>
              </div>

              <div class="command-section">
                <h2>Google Container Registry</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull gcr.io/username/image:tag
代理命令：docker pull gcr.{{proxyDomain}}/username/image:tag
                </code></pre>
              </div>

              <div class="command-section">
                <h2>Google Kubernetes</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull k8s.gcr.io/username/image:tag
官方命令：docker pull registry.k8s.io/username/image:tag
代理命令：docker pull k8s.{{proxyDomain}}/username/image:tag
                </code></pre>
                <h3>根镜像代理</h3>
                <pre><code>官方命令：docker pull k8s.gcr.io/coredns:1.6.5
官方命令：docker pull registry.k8s.io/coredns:1.6.5
代理命令：docker pull k8s.{{proxyDomain}}/coredns:1.6.5
                </code></pre>
              </div>

              <div class="command-section">
                <h2>Quay.io</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull quay.io/username/image:tag
代理命令：docker pull quay.{{proxyDomain}}/username/image:tag
                </code></pre>
              </div>

              <div class="command-section">
                <h2>Microsoft Artifact Registry</h2>
                <h3>常规镜像代理</h3>
                <pre><code>官方命令：docker pull mcr.microsoft.com/azure-cognitive-services/diagnostic:latest
代理命令：docker pull mcr.{{proxyDomain}}/azure-cognitive-services/diagnostic:latest
                </code></pre>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
const proxyDomain = process.env.VUE_APP_PROXY_DOMAIN || 'kubesre.xyz';

export default {
  data() {
    return {
      proxyDomain
    };
  }
}
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
  top: 0;
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

.documentation {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // padding: 30px;
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

.left-panel {
  width: 25%;
  padding-right: 20px;
}

.left-panel h2 {
  margin-bottom: 10px;
}

.left-panel ul {
  list-style: none;
  padding: 0;
}

.left-panel ul li {
  margin-bottom: 5px;
}

.right-panel {
  width: 70%;
}

.right-panel h1 {
  margin-bottom: 20px;
}

.right-panel pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
} 
/* 响应式设计 */
@media (max-width: 768px) {
  // .el-header {
  //   flex-direction: column;
  //   align-items: flex-start;
  //   padding: 10px;
  // }

  // .el-menu {
  //   width: 100%;
  //   flex-direction: column;
  //   align-items: flex-start;
  // }

  .el-card {
    width: 100%;
  }
}

@media (min-width: 769px) {
  .el-card {
    width: 60%;
  }
}
</style>

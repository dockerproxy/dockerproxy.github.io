// eslint-disable-next-line
/* eslint-disable */ 
<template>
  <div id="app">
    <el-header class="fixed-header">
      <div class="logo">docker proxy</div>
      <div class="desktop-menu">
        <el-menu
          mode="horizontal"
          class="el-menu"
          background-color="#fff"
          text-color="#545c64"
        >
          <el-menu-item index="1" @click="navigateTo('/index')">首页</el-menu-item>
          <el-menu-item
            index="2"
            @click="navigateTo('/doc')"
          >使用文档</el-menu-item>
          <el-menu-item
            index="3"
            @click="navigateToExternal('https://www.kubesre.com/')"
          >云原生社区</el-menu-item>
          <!-- <el-menu-item index="8">更多</el-menu-item> -->
          <el-menu-item index="9" @click="navigateTo('/donate')">捐赠</el-menu-item>
          <el-menu-item index="10" @click="navigateToExternal('https://github.com/kubesre/docker-registry-mirrors')">GitHub</el-menu-item>
          <el-menu-item index="11" @click="navigateToExternal('https://www.yuque.com/kubesre/cpduyq/bwgig3952zr7gi2w?singleDoc#%20%E3%80%8A%E6%96%B0%E6%A8%A1%E5%9E%8BChatGPT4o%EF%BC%8C%E5%A4%AA%E7%89%9B%E9%80%BC%E4%BA%86%EF%BC%81%E3%80%8B')">免魔法Chatgpt4</el-menu-item>

        </el-menu>
      </div>
      <div class="mobile-menu">
        <!-- <el-button class="hamburger" icon="el-icon-menu" @click="toggleDrawer"></el-button> -->
        <el-button @click="toggleDrawer" icon="el-icon-menu" style="margin-left: 16px;">菜单
</el-button>
      </div>
    </el-header>

    <el-drawer
      :visible="drawer"
      :direction="direction"
      :before-close="closeDrawer">
      <el-menu
        mode="vertical"
        class="el-menu"
        background-color="#fff"
        text-color="#545c64"
        @select="closeDrawer"
      >
        <el-menu-item index="1" @click="navigateTo('/index')">首页</el-menu-item>
        <el-menu-item
            index="2"
            @click="navigateTo('/doc')"
          >使用文档</el-menu-item>
        <el-menu-item
          index="3"
          @click="navigateToExternal('https://www.kubesre.com/')"
        >云原生社区</el-menu-item>
        <!-- <el-menu-item index="8">更多</el-menu-item> -->
        <el-menu-item index="9" @click="navigateTo('/donate')">捐赠</el-menu-item>
        <el-menu-item index="10" @click="navigateToExternal('https://github.com/kubesre/docker-registry-mirrors')">GitHub</el-menu-item>
        <el-menu-item index="11" @click="navigateToExternal('https://www.yuque.com/kubesre/cpduyq/bwgig3952zr7gi2w?singleDoc#%20%E3%80%8A%E6%96%B0%E6%A8%A1%E5%9E%8BChatGPT4o%EF%BC%8C%E5%A4%AA%E7%89%9B%E9%80%BC%E4%BA%86%EF%BC%81%E3%80%8B')">免魔法Chatgpt4</el-menu-item>

      </el-menu>
    </el-drawer>

    <el-main>
      <router-view></router-view>
      <!-- 路由视图 -->
    </el-main>
    <el-footer>© dockerproxy.xyz. All rights reserved.</el-footer>
  </div>
</template>

<script>
export default {
  data() {

    return {
      drawer: false,
      direction: 'ltr',
    };
  },
  methods: {
    
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    closeDrawer() {
      this.drawer = false;
    },
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
  },
};
</script>

<style lang="less" scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  position: fixed;
  background-color: #ffffff;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
}

.desktop-menu {
  display: flex;
}

.mobile-menu {
  display: none;
}

.el-main {
  min-height: calc(100vh - 116px); /* 100vh 减去 header 和 footer 的高度 */
  padding: 20px;
  box-sizing: border-box;
}

.el-footer {
  text-align: center;
  padding: 10px 0;
  background: #f2f2f2;
  width: 100%;
  box-sizing: border-box;
}

.logo {
  font-size: 24px;
  color: rgb(31, 30, 30);
  text-align: center;
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: flex;
  }

  .el-header {
    padding: 10px;
  }

  .el-menu .el-menu-item {
    padding: 5px 10px; /* 减少菜单项的间距 */
  }

  .mobile-drawer {
    .el-menu {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>

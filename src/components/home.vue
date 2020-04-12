<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="70px">
      <div>
        <img src="../assets/logo/heima.png" alt />
        <span>客户关系圈</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'250px'">
        <div class="trigger-button" @click="changeCollapse">|||</div>
        <!-- 菜单列表 -->
        <el-menu
          background-color="#323744"
          text-color="#fff"
          active-text-color="#4E9FFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
            <template slot="title">
              <i :class="iconList[menu.id]"></i>
              <span>{{menu.authName}}</span>
            </template>
            <el-menu-item
              :index="'/' + subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.id"
              @click="setActivePath('/'+ subMenu.path)"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subMenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconList: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 退出的核心思想就是销毁token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMenuList() {
      this.$http
        .get('menus')
        .then(({ data }) => {
          if (data.meta.status === 200) {
            // 将查询出的值赋给组件中得值
            this.menuList = data.data
          } else {
            this.$message.error(data.meta.msg)
          }
        })
        .catch(({ data }) => {
          this.$message.error(data.meta.msg)
        })
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setActivePath(activePath) {
      // console.log(activePath)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background: #373c41;
  display: flex;
  justify-content: space-between;
  // 设置字体
  color: #fff;
  font-size: 25px;
  // 按钮居中
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    span {
      padding-left: 15px;
    }
  }
}

.el-aside {
  width: 250px;
  background: #323744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background: #eaedf2;
}

.iconfont {
  margin-right: 8px;
}

.trigger-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

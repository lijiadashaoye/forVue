<template>
  <div id="tagWaper">
    <input placeholder="输入标签名进行搜索" type="text" class="isInput" v-model="inputData.name" />
    <button class="isButtonTag" @click="toSearch">搜索</button>
    <button class="isButtonTag2" @click="toSearch2">全部标签</button>
    <div class="tagWaper">
      <h3>备选：</h3>
      <div v-if="inputData.list.length" class="markList">
        <div
          @click="toAdd(item)"
          v-for="(item,index) in inputData.list"
          :key="index"
          class="tagsd"
          :style="{background:item.bkColor}"
        >{{item.name}}</div>
      </div>
      <span v-else>没有搜索到数据！</span>
    </div>
    <div>
      <h3>已使用的</h3>
      <div class="tagWaper">
        <div v-for="(item,index) in inputData.hasSelect" :key="index" class="tags">
          {{item.name}}
          <span title="点击删除" class="toClose" @click="toRemove(item)">x</span>
        </div>
      </div>
    </div>

    <div>
      <h3>准备添加的</h3>
      <div class="tagWaper">
        <div v-for="(item,index) in inputData.willAdd" :key="index" class="tags">
          {{item.name}}
          <span title="点击删除" class="toClose" @click="toDelete(item)">x</span>
        </div>
      </div>
    </div>

    <div>
      <h3>准备删除的</h3>
      <div class="tagWaper">
        <div v-for="(item,index) in inputData.toDelete" :key="index" class="tags1">
          {{item.name}}
          <span title="不删除已有的" class="toClose" @click="reBack(item)">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object
  },
  data() {
    return {
      searchText: ""
    };
  },
  mounted() {
    // console.log(this.inputData)
  },
  methods: {
    // 搜索按钮
    toSearch() {
      this.$emit("toSearch");
    },
    // 查看全部标签
    toSearch2() {
      this.inputData.name = "";
      this.$emit("toSearch");
    },
    // 添加到准备添加的
    toAdd(item) {
      let arr = this.inputData.hasSelect;
      let isIn = arr.some(tar => tar.labelId == item.labelId); // 判断是否已使用，true 为已使用
      let isAdd = this.inputData.willAdd.some(
        tar => tar.labelId == item.labelId
      );
      if (isIn) {
        this.$message.warning("已经添加过了！");
      } else {
        if (isAdd) {
          this.$message.warning("已经添加过了！");
        } else {
          this.inputData.willAdd.push(item);
        }
      }
    },
    // 从已使用的中删除，添加到准备删除的中
    toRemove(item) {
      let arr = this.inputData.toDelete;
      let isIn = arr.every(tar => tar.id != item.id);
      if (isIn) {
        this.inputData.toDelete.push(item);
      }
    },
    // 从准备添加的中删除
    toDelete(item) {
      this.inputData.willAdd = this.inputData.willAdd.filter(
        tar => tar.labelId != item.labelId
      );
    },
    // 从准备删除的中还原
    reBack(item) {
      this.inputData.toDelete = this.inputData.toDelete.filter(
        tar => tar.id != item.id
      );
    }
  }
};
</script>
<style scoped>
#tagWaper {
  padding: 10px 0;
  width: 100%;
}
.tagWaper,
.markList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5px 0;
}

.tagsd {
  padding: 1px 8px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
.tagsd:hover {
  transform: scale(0.95);
}
.tags {
  background: rgb(188, 194, 236);
  padding: 1px 30px 1px 7px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
.tags:hover {
  background: rgb(230, 230, 230);
}
.tags1 {
  background: rgb(230, 230, 230);
  padding: 1px 30px 1px 7px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
.tags1:hover {
  background: rgb(188, 194, 236);
}
.toClose {
  content: "";
  position: absolute;
  right: 0px;
  top: 0px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: rgb(245, 146, 146);
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
}
.isInput {
  padding: 5px;
  outline: none;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 3px;
}
.isButtonTag {
  padding: 3px 8px;
  outline: none;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 3px;
  background: rgb(129, 231, 126);
  color: rgb(255, 255, 255);
  font-weight: bold;
  margin-left: 10px;
}
.isButtonTag:hover {
  color: rgb(224, 129, 129);
  cursor: pointer;
}
.isButtonTag2 {
  padding: 3px 8px;
  outline: none;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 3px;
  background: rgb(72, 239, 245);
  color: white;
  font-weight: bold;
  margin-left: 10px;
}
.isButtonTag2:hover {
  color: rgb(224, 129, 129);
  cursor: pointer;
}

.tags1 {
  background: rgb(240, 240, 240);
  padding: 1px 30px 1px 30px;
  border-radius: 10px;
  position: relative;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
.tags1:hover {
  background: rgb(188, 194, 236);
}
.toClose1 {
  content: "";
  position: absolute;
  left: 0px;
  top: 0px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: rgb(142, 219, 148);
  border-radius: 50%;
  line-height: 19px;
  text-align: center;
}
</style>



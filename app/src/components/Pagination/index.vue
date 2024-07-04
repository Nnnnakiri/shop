<template>
    <div class="pagination">
        <!-- 上 -->
        <button class="left" :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo===1}">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <!-- 中 -->
        <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)" :class="{active:pageNo===page}">{{ page }}</button>

        <!-- 下 -->
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo===totalPage}">{{ totalPage }}</button>

        <button class="right" :disabled="pageNo === totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    // pageNo当前页码  pageSize每页多少数据  total总共多少条数据  continues连续页码
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总共多少页
        totalPage() {
            // 先上取整
            return Math.ceil(this.total / this.pageSize);
        },
        // 计算出来连续的页码的起始数字和结束数字
        startNumAndEndNum() {
            const { pageNo, continues, totalPage } = this;
            let start = 0, end = 0;
            if (continues > totalPage) {
                start = 1;
                end = totalPage;
            } else {
                start = pageNo - (continues - 1) / 2;
                end = pageNo + (continues - 1) / 2;
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end }
        }
    },
}
</script>
  
<style lang="less" scoped>
.pagination {
    position: relative;
    text-align: center;

    .left{
        position: absolute;
        left: 10%;
    }
    .right{
        position: absolute;
        right: 10%;
    }

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

</style>
  
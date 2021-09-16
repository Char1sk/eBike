<template>
    <div class="queryList">
        <div id="top">电动车列表</div>
        <el-container>
            <el-header class="queryForm">
                <el-form inline v-model="queryOptions">
                    <el-form-item label="ID">
                        <el-input v-model="queryOptions.id" placeholder="ID"></el-input>
                    </el-form-item>
                    <el-form-item label="Type">
                        <el-select v-model="queryOptions.type" placeholder="Type" clearable>
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B" value="B"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doQuery">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main class="queryListBody" v-loading="isLoading">
                <el-table :data="nowBikes"
                        :row-class-name="getClassName">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="Type"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="Status"
                            class-name="bike-status">
                        <template slot-scope="scope1">
                            <el-tag :type="getTagType(scope1.row.status)">
                                {{scope1.row.status}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="200">
                        <template slot-scope="scope2">
                            <el-button type="danger" size="small"
                                    :disabled="scope2.row.status!=='abandoned'"
                                    @click="handleDelete">
                                发送信息
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <a href="#top" id="go">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next, jumper"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            :total="total"
                            background>
                    </el-pagination>
                </a>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
    computed: {
        ...mapState("query", [
            "queryOptions",
            "isLoading",
            "currentPage",
            "pageSize",
            "bikes"
        ]),
        total() {
            return this.bikes.length;
        },
        firstIndex() {
            return (this.currentPage-1) * this.pageSize;
        },
        lastIndex() {
            let li = this.currentPage * this.pageSize - 1;
            if (li > this.total-1)
                return this.total-1;
            else
                return li;
        },
        nowBikes() {
            return this.bikes.slice(this.firstIndex, this.lastIndex+1);
        }
    },
    methods: {
        ...mapMutations("query", [
            "changePage",
            "doQuery"
        ]),
        handleCurrentChange: function(num) {
            this.changePage(num);
            console.log(this.currentPage);
        },
        handleDelete: function() {
            console.log("SB");
        },
        getClassName: function({row}) {
            console.log(row.status);
            return row.status
        },
        getTagType: function(status) {
            if (status === "normal")
                return "success";
            if (status === "unused")
                return "warning";
            if (status === "abandoned")
                return "danger";
        }
    }
};
</script>

<style>
.queryList {
    position: relative;
    height: 100%;
}

.queryForm {
    margin-top: 50px;
}

.queryListBody {
    margin-left: 148px;
    width: 1000px;
}

.el-table .normal .bike-status {
    color: rgb(31, 170, 31);
}

.el-table .unused .bike-status {
    color: rgb(255, 195, 85);
}

.el-table .abandoned .bike-status {
    color: rgb(255, 136, 136);
}

#go {
    cursor: default;
}
#top {
    height: 1.5%;
    font-size: 24px;
    margin-top: -11px;
}
</style>
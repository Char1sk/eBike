<template>
    <div>
        <div id="top">请求消息列表</div>
        <el-container>
            <el-main class="messageListBody" v-loading="isLoading">
                <el-table :data="messages">
                    <el-table-column type="expand">
                        <template slot-scope="description">
                            <el-form class="infoForm" label-position="left" label-width="100px">
                                <el-form-item label="请求ID">
                                    <span>{{description.row.id}}</span>
                                </el-form-item>
                                <el-form-item label="请求类型">
                                    <span>{{description.row.type}}</span>
                                </el-form-item>
                                <el-form-item label="请求状态">
                                    <span>{{description.row.status}}</span>
                                </el-form-item>
                                <el-form-item label="请求日期">
                                    <span>{{description.row.date}}</span>
                                </el-form-item>
                                <el-form-item label="请求内容">
                                    <div>{{description.row.content}}</div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="success">
                                        通过
                                    </el-button>
                                    <el-button type="danger">
                                        不通过
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="Time">
                        <template slot-scope="scope2">
                            <i class="el-icon-time"></i>
                            <span>{{scope2.row.date}}</span>
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
        ...mapState("messages", [
            "isLoading",
            "currentPage",
            "pageSize",
            "total",
            "messages"
        ]),
        firstIndex() {
            return (this.currentPage-1) * this.pageSize;
        },
        lastIndex() {
            return this.currentPage * this.pageSize - 1;
        }
    },
    methods: {
        ...mapMutations("messages", [
            "changePage",
            "getMessages"
        ]),
        handleCurrentChange: function(num) {
            this.changePage(num);
            this.getMessages();
            // console.log(this.currentPage);
            // console.log(this.messages);
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
        },
    },
    created() {
        this.getMessages();
    }
};
</script>

<style>
.messageListBody {
    margin-left: 100px;
    width: 1000px;
}
.infoForm .el-form-item__label {
    color: #99a9bf;
}
</style>
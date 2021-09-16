<template>
    <div class="bikeList">
        <div id="top">电动车列表</div>
        <el-container>
            <el-main class="bikeListBody" v-loading="isLoading">
                <el-table :data="bikes"
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
        ...mapState("list", [
            "isLoading",
            "currentPage",
            "pageSize",
            "total",
            "bikes"
        ]),
        // firstIndex() {
        //     return (this.currentPage-1) * this.pageSize;
        // },
        // lastIndex() {
        //     return this.currentPage * this.pageSize - 1;
        // },
        // currentUrl() {
        //     return "/bikes/" + this.currentPage + ".json";
        // }
    },
    methods: {
        ...mapMutations("list", [
            // "loading",
            // "loaded",
            "changePage",
            // "setBikes",
            "getBikes"
        ]),
        handleCurrentChange: function(num) {
            this.changePage(num);
            // this.getCurrentData();
            this.getBikes();
            // console.log(this.currentPage);
        },
        handleDelete: function() {
            console.log("SB");
        },
        // getCurrentData: function() {
        //     this.loading();
        //     console.log(this.isLoading);
        //     this.axios.get(this.currentUrl)
        //         .then(response => {
        //             this.setBikes(response.data);
        //             this.loaded();
        //             console.log(this.isLoading);
        //         })
        //         .catch(error => alert(error));
        // },
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
        // statusFilter: function(value, row) {
        //     return row.status === value;
        // }
    },
    created() {
        // this.getCurrentData();
        this.getBikes();
        // this.axios.get("/bikes.json")
        //     .then(response => {
        //         this.setBikes(response.data);
        //     })
        //     .catch(error => alert(error));
    }
};
</script>

<style>
.bikeList {
    position: relative;
    height: 100%;
}
.bikeListBody {
    margin-top: 23px;
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
<template>
    <div class="bikeItem">
        <span>{{bike.id}}</span>
        <span>{{bike.type}}</span>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"

export default {
    data() {
        return {
            info: {}
        }
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        bike: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("list", [
            "bikes"
        ])
    },
    methods: {
        ...mapMutations//
    },
    created() {
        this.info = this.bikes[this.index];
        // console.log(this.index, this.info);
    }
}
</script>

<style scoped>
.bikeItem {
    border: 1px solid black;
}
</style>
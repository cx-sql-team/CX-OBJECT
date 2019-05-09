<template>
    <cx-dialog :loading="loading" :title="$t('lang.common.searchSet')" :visible="visible" @closeDialog="closeDialog1"
               @ok="onOk" width="750px">
        <div class="drag-wrapper search-set" @drop="nodrop" @dragover="nodrop">
            <ul style="margin-right: 30px" id="searchDrag_bg1" @drop="nodrop" @dragover="nodrop">
                <el-scrollbar style="height: 330px">
                    <li :id="'searchDrag_' + index" draggable="true" @dragstart="($event) => drag($event, index)"
                        @dragend.stop="($event) => $event.preventDefault()" v-for="(it,index) in data" :key="index">
                        <i class="el-icon-arrow-right"></i>
                        <p>{{it.label.indexOf('lang.') > -1 ? $t(it.label) : it.label}}</p>
                    </li>
                </el-scrollbar>
            </ul>

            <ul id="searchDrag_bg2" @drop="drop($event, 9999)" @dragover="dragover($event, 9999)"
                :style="{background: ulColor}">
                <el-scrollbar style="height: 330px">
                    <li :id="'searchDrag_' + index" :draggable="!editFlag"
                        @dragstart="($event) => drag($event, 'r-' +index)"
                        @dragend.stop="($event) => $event.preventDefault()" v-for="(it,index) in data1" :key="index"
                        @drop="($event) => drop($event)" @dragover="(ev) => dragover(ev, index, it)">
                        <template v-if="!it.kong">
                            <i class="el-icon-close" @click.stop="() =>dele(index)"></i>
                            <p>{{it.label.indexOf('lang.') > -1 ? $t(it.label) : it.label}}</p>
                        </template>
                        <template v-else>
                            <div id="searchDrag_kong" style="background: #f1eae1; height: 50px"></div>
                        </template>
                    </li>
                </el-scrollbar>
            </ul>
        </div>
    </cx-dialog>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import { Getter} from 'vuex-class';

    @Component({})
    export default class CxFilter extends Vue {
        @Prop({
            default: false,
        }) public visible!: boolean; // 弹出框是否显示
        @Prop() public allData!: object[]; // 所有的需要筛选的数据
        @Prop() public showData!: object[]; // 被筛选出来的数据

        public ulColor: string = '#fff'; // 选中颜色
        public loading: boolean = false; // 载入状态
        public data: object[] = []; // 数据

        public data1: object[] = []; // 选中数据
        public dropIndex: any = 0; // 开始拖拽行号
        public dropDownIndex: number = 0; // 目标拖拽行号
        public dropData: any = 0; // 拖拽数据
        public editFlag: boolean = false; // 是否编辑
        public editIndex: number = 0; // 编辑行号
        public editValue: string = ''; // 编辑数据


        @Getter public size: any; // 尺寸

        private created() {
            this.data = this.allData;
            this.data1 = this.showData;
        }

        private mounted() {
            this.$el.addEventListener('drop', (ev) => {
                this.data1 = this.data1.filter((it: any) => !it.kong);
                ev.preventDefault();
            }, true);
        }

        // 结束编辑
        private nodrop(ev: any) {
            this.data1 = this.data1.filter((it: any) => !it.kong);
            this.ulColor = '#fff';
            ev.preventDefault();
            ev.stopPropagation();
        }


        // 拖拽中
        private dragover(ev: any, index: number) {
            ev.preventDefault();
            ev.stopPropagation();
            this.dropDownIndex = index;
            if (this.dropIndex.toString().indexOf('r') === -1) {
                if (index === 9999) {
                    this.data1 = this.data1.filter((it: any) => !it.kong);
                    this.data1.push({kong: true});
                } else {
                    this.data1 = this.data1.filter((it: any) => !it.kong);
                    this.data1.splice(index, 0, {kong: true});
                }
            }
        }

        // 放下拖拽
        private drop(ev: any, index: number) {
            ev.preventDefault();
            ev.stopPropagation();
            this.ulColor = '#fff';
            if (this.dropIndex.toString().indexOf('r') === -1) {
                this.data.splice(this.dropIndex, 1);
                this.data1.splice(this.dropDownIndex, 0, this.dropData);
                this.data1 = this.data1.filter((it: any) => !it.kong);
            } else {
                if (index !== 9999) {
                    const startIndex = parseInt(this.dropIndex.split('-')[1], 10);
                    const changeData = this.data1[this.dropDownIndex];
                    this.data1.splice(startIndex, 1, {kong: true});
                    this.data1.splice(this.dropDownIndex, 1, {kong: true});
                    this.data1[this.dropDownIndex] = this.dropData;
                    this.data1[startIndex] = changeData;
                }
            }
        }

        // 开始拖拽
        private drag(ev: any, index: number) {
            this.ulColor = '#fff';
            this.dropIndex = index;
            if (index.toString().indexOf('r') === -1) {
                this.dropData = this.data[index];
            } else {
                const startIndex = parseInt(this.dropIndex.split('-')[1], 10);
                this.dropData = this.data1[startIndex];
            }
            ev.dataTransfer.setData('text', ev.target.id);
        }

        // 删除
        private dele(index: number) {
            const resData = this.data1[index];
            this.data1.splice(index, 1);
            this.data.push(resData);
        }



        // 关闭弹框
        private closeDialog1() {
            this.$emit('close');
        }

        // 弹框确认
        private onOk() {
            if (this.data1.length === 0) {
                this.$alert('至少有一个搜索项', '提示', {
                    type: 'error',
                    confirmButtonText: '确定',
                });
            } else {
                this.$emit('ok', this.data1, this.data);
            }
        }
    }
</script>

<style lang="scss">
    .search-set {
        display: flex;
        justify-content: center;

        ul {
            display: flex;
            flex-direction: column;
            padding: 3px !important;
            width: 350px;
            float: left;
            list-style-type: none;
            overflow-y: auto;
            border: 1px solid #888;
            border-radius: 5px;
            background: #fff;
            color: #555;

            .el-form-item {
                margin-bottom: 5px;
                margin-right: 0;
            }
        }

        /* drop target state */
        ul[aria-dropeffect="move"] {
            border-color: #000000;
            background: #fff;
        }

        /* drop target focus and dragover state */
        ul[aria-dropeffect="move"]:focus,
        ul[aria-dropeffect="move"].dragover {
            outline: none;
            box-shadow: 0 0 0 1px #fff, 0 0 0 3px #68b;
        }

        /* draggable items */
        li {
            color: #fff;
            display: block;
            list-style-type: none;
            margin: 0 0 5px 0;
            padding: 5px 5px 5px 5px;
            border-radius: 5px;
            line-height: 1.3;
            position: relative;

            i {
                float: right;
                font-size: 16px;
                font-weight: bold;
                width: 30px;
                line-height: 40px;
                cursor: pointer;
            }

            p {
                padding-left: 5px;
                overflow: hidden;
                font-size: 16px;
                line-height: 40px;
            }

            .search-set-input {
                position: absolute;
                width: 90px;
                left: 0;
                top: 7px;

                input {
                    height: 32px;
                }
            }
        }


        /* items grabbed state */
        li[aria-grabbed="true"] {
            background: #5cc1a6;
            color: #fff;
        }

        @keyframes nodeInserted {
            from {
                opacity: 0.2;
            }
            to {
                opacity: 0.8;
            }
        }

        .item-dropzone-area {
            height: 2px;
            background: #888;
            opacity: 0.8;
            animation-duration: 0.5s;
            animation-name: nodeInserted;
        }
    }

    #searchDrag_bg1 {
        li:hover {
            background: #2E425D;
        }

        li {
            cursor: pointer;
            background: #C8C8C8;
        }
    }

    #searchDrag_bg2 {
        li {
            background: #2E425D;
        }
    }


</style>

<!--
 * @Author: yuan
 * @Date: 2022-03-31 15:47:07
 * @FilePath: \test\src\page\test.vue
 * @Description: 
-->
<template>
  <div class="main-box">
    <div class="option-box">
      <a-button type="primary" @click="handleClickAdd">
        <template #icon><PlusOutlined /></template>
        新增账单
      </a-button>
      <a-button :disabled="delDisabled" @click="($event) => handleClickDel(null)">
        <template #icon><DeleteOutlined /></template>
        批量删除
      </a-button>
    </div>
    <a-table rowKey="id" :dataSource="dataSource" :columns="columns" :loading="loading" :rowSelection="rowSelection">
      <template #action="{ record, index }">
        <a-tooltip v-if="dataSource && dataSource.length && index != 0">
          <template #title>编辑</template>
          <EditOutlined class="action-icon" @click="handleClickEdit(record)"/>
        </a-tooltip>
        <a-tooltip v-if="dataSource && dataSource.length && index != 0">
          <template #title>删除</template>
          <DeleteOutlined class="action-icon" @click="handleClickDel(record)"/>
        </a-tooltip>
      </template>
    </a-table>
    <add-modal 
    :key="modalParams.key" 
    v-model:value="modalParams.visible" 
    :record="modalParams.data"
    @handleCancelModal="handleCancelModal"
    @handleSubmitModal="handleSubmitModal"/>
  </div>
</template>
<script>

import { Table, Button, Tooltip } from 'ant-design-vue'
import AddModal from './addModal.vue'
import dayjs from 'dayjs'
import _ from 'lodash'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';
export default {
  name: 'test',
  components: { 
    'a-table': Table,
    'a-button': Button,
    'a-tooltip': Tooltip,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    AddModal
  },
  data () {
    return {
      dataSource: [],
      columns: [
        {
          title: '账单名称',
          dataIndex: 'billName',
          key: 'billName',
        },
        {
          title: '账单金额',
          dataIndex: 'billPrice',
          key: 'billPrice',
        },
        {
          title: '账单日期',
          dataIndex: 'billDate',
          key: 'billDate',
          customRender: ({text}) => text ? dayjs(text).format('YYYY-MM-DD') : null
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: '操作',
          width: 200,
          dataIndex: 'action',
          key: 'action',
          align: 'center',
          slots: { customRender: 'action' }
        }
      ],
      loading: false,
      modalParams: {
        key: 0,
        visible: false,
        data: null
      },
      selectedRowKeys: []
    }
  },
  created() {
    this.getBillData()
  },
  computed: {
    rowSelection() {
      return {
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys
        }
      }
    },
    delDisabled() {
      console.log(this.selectedRowKeys.filter(item => item == 0));
      return this.selectedRowKeys && !this.selectedRowKeys.filter(item => item !== 0).length
    }
  },
  methods: {
    // 获取数据
    async getBillData() {
      this.loading = true
      const res = await this.axios.get('http://localhost:8002/billApi/queryAllBill')
      const {code , success, data} = res.data
      this.loading = false
      if(code == 200 && success) {
        this.dataSource = _.cloneDeep(data?.billData)
        if(data?.billData && data?.billData.length) this.dataSource.unshift({id: 0, billName: '合计' ,billPrice: _.sumBy(data?.billData, item => item.billPrice)})
      }
    },
    // 点击新增
    handleClickAdd() {
      this.modalParams = {
        ...this.modalParams,
        key: Math.random(),
        visible: true,
      }
    },
    // 点击删除
    async handleClickDel(record) {
      let ids = []
      if(record) ids.push(record.id)
      else ids = Object.values(this.selectedRowKeys)
      const res = await this.axios.post('http://localhost:8002/billApi/delBill', ids)
      const { code, success } = res.data
      if(code == 200 && success) this.getBillData()
    },
    // 点击编辑
    handleClickEdit(record) {
      this.modalParams = {
        ...this.modalParams,
        key: new Date().getTime(),
        visible: true,
        data: record
      }
    },
    // 关闭弹窗
    handleCancelModal() {
      this.modalParams.visible = false
      this.modalParams.data = null
    },
    // 提交弹窗
    handleSubmitModal() {
      this.modalParams.visible = false
      this.getBillData()
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  width: 96%;
  margin:0 auto;
}
.option-box {
  text-align: right;
  Button {
    margin: 0 0 10px 10px;
  }
}
.action-icon {
  margin: 0 10px;
}
</style>


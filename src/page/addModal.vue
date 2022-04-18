<!--
 * @Author: yuan
 * @Date: 2022-03-31 18:54:36
 * @FilePath: \test\src\page\addModal.vue
 * @Description: 新增弹窗
-->
<template>
  <div>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk" @cancel="handleCancel" okText="确定" cancelText="取消">
      <a-form ref="my-form" :model="form" :rules="{
        billName: [
          { required: true, message: '请输入账单名称', trigger: 'blur' },
        ],
        billPrice: [
          { required: true, validator: (rule, value, callback) => checkPrice(rule, value), trigger: 'blur' },
        ],
        billDate: [
          { required: true, validator: (rule, value, callback) => checkDate(rule, value), trigger: 'change'  },
        ],
      }">
        <a-form-item label="账单名称" name="billName">
          <a-input v-model:value="form.billName" placeholder="请输入"/>
        </a-form-item>
        <a-form-item label="账单金额" name="billPrice">
          <a-input-number v-model:value="form.billPrice" :min="-1000" :max="1000" :step="0.01" placeholder="请输入"  :formatter="limitDecimalsF" :parser="limitDecimalsP"/>
        </a-form-item>
        <a-form-item label="账单日期" name="billDate">
          <a-date-picker v-model:value="form.billDate" placeholder="请选择">
          </a-date-picker>
        </a-form-item>
        <a-form-item label="账单备注" name="remark">
           <a-textarea v-model:value="form.remark" placeholder="请输入" :rows="4" :precision="2"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { Modal, Form, Input, DatePicker } from 'ant-design-vue'
import  _ from 'lodash'
export default {
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-date-picker': DatePicker,
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      title: null,
      form: {},
    }
  },
  computed: {
    visible() {
      return this.value
    },
    limitDecimalsF() {
      return value => {
        let reg = /^(-)*(\d+)\.(\d\d).*$/;
        return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg,'$1$2.$3');
      }
    },
    limitDecimalsP() {
      return value => {
        let reg = /^(-)*(\d+)\.(\d\d).*$/;
        return value.replace(/￥\s?|(,*)/g, '').replace(reg,'$1$2.$3');
      }
    }
  },
  created() {
    if(!this.record) {
      // 新增
      this.title = "新增"
    } else {
      // 编辑
      this.title = "编辑"
      this.form = _.cloneDeep(this.record)
    }
  },
  methods: {
    // 点击确定
    async handleOk() {
      const check_res = await this.$refs['my-form'].validateFields()
      if(check_res) {
        const res = await this.axios.post('http://localhost:8002/billApi/addOrEditBill', this.form)
        const { code, success } = res.data
        if(code == 200 && success) this.$emit('handleSubmitModal')
      }
    },
    // 点击取消
    handleCancel() {
      this.$emit('handleCancelModal')
    },
    // 校验金额
    checkPrice(rule, value) {
      if(value == null || value == undefined ) {
        return Promise.reject('请输入金额')
      } else {
        return Promise.resolve()
      }
    },
    // 校验日期
    checkDate(rule, value) {
      if(!value) {
        return Promise.reject('请输入日期')
      } else {
        return Promise.resolve()
      }
    }

  }
}
</script>

<style lang='less' scoped>

 
</style>

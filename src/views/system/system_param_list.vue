<template>
  <el-form ref="submitForm" class="submit-form" :model="model">
    <el-tabs v-model="activeName" v-loading="dataLoading">
      <el-tab-pane :label="group.groupName" :name="group.groupName" :key="group.id" v-for="(group, index) in model.systemGroups">
        <el-table v-loading="dataLoading" :data="group.systemParams" :cell-style="setRowStyle" border highlight-current-row>
          <el-table-column prop="paramName" label="参数名字">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.groupId === 4" :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.paramName'" :verify="verifyProvince1">
                <el-select v-model="scope.row.paramName" @change="v => changeProvinceCode(v, scope.row, 'SYSTEM_FIRST_WEIGHT_COST_')" filterable clearable class="w100p">
                  <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="scope.row.groupId === 5" :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.paramName'" :verify="verifyProvince2">
                <el-select v-model="scope.row.paramName" @change="v => changeProvinceCode(v, scope.row, 'SYSTEM_ADDITIONAL_WEIGHT_COST_')" filterable clearable class="w100p">
                  <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="scope.row.groupId !== 4 && scope.row.groupId !== 5" :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.paramName'" verify>
                <el-input v-model="scope.row.paramName" maxlength="255" placeholder="请输入参数名字" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="paramValue" label="参数值">
            <template slot-scope="scope">
              <el-form-item :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.paramValue'" verify>
                <el-input v-model="scope.row.paramValue" placeholder="请输入参数值" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="paramCode" label="参数代码">
            <template slot-scope="scope">
              <el-form-item :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.paramCode'" verify>
                <el-input v-model="scope.row.paramCode" maxlength="255" placeholder="请输入参数代码" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" width="200" label="备注信息">
            <template slot-scope="scope">
              <el-form-item :prop="'systemGroups.' + index + '.systemParams.' + scope.$index + '.remark'">
                <el-input v-model="scope.row.remark" maxlength="255" placeholder="请输入备注信息" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" class-name="tdvat">
            <template slot-scope="{ row, $index }">
              <el-button v-permission="['16010200']" class="mb10" type="primary" @click="addSystemParam(row.groupId, $index)">添加</el-button>
              <el-button v-permission="['16010400']" type="danger" @click="deleteSystemParam(group.systemParams, row.id, $index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <submit-button v-permission="['16010300']" submit-text="保存" @submit="createSystemParam" />
  </el-form>
</template>

<script>
import { getSystemParamGroupList, deleteSystemParam, createSystemParam } from '@/api/system/system_param'
import { collectAddress } from '@/api/collect_address'
export default {
  data() {
    return {
      activeName: '系统选项',
      dataLoading: true,
      model: {
        systemGroups: []
      },
      provinceList: collectAddress.province
    }
  },
  created() {
    // 获取参数组列表
    this.getSystemParamGroupList()
  },
  methods: {
    // 获取参数组列表
    getSystemParamGroupList() {
      getSystemParamGroupList({}).then(({ data }) => {
        this.model.systemGroups = data
        this.dataLoading = false
      })
    },
    // 添加参数
    addSystemParam(groupId, i) {
      groupId = groupId == null ? 1 : groupId
      this.model.systemGroups[groupId - 1].systemParams.splice(i + 1, 0, { groupId })
    },
    // 删除参数
    deleteSystemParam(records, id, i) {
      if (id) {
        this.$$confirm('确认删除？').then(() => {
          deleteSystemParam(id).then(() => {
            this.$success('删除成功')
            this.getSystemParamGroupList()
          })
        })
      } else {
        records.splice(i, 1)
      }
    },
    // 保存参数提交
    createSystemParam() {
      this.$refs.submitForm.validate().then(() => {
        this.dataLoading = true
        const data = []
        this.model.systemGroups.forEach(v => {
          v.systemParams.forEach(t => {
            data.push(t)
          })
        })
        createSystemParam(data).then(() => {
          this.$success('保存成功')
          this.getSystemParamGroupList()
        })
      })
    },
    // 省份格式
    changeProvinceCode(value, row, prefix) {
      row.paramCode = prefix + value
    },
    // 校验省份
    verifyProvince1(rule, value, callback) {
      const provinceCodes = this.model.systemGroups[3].systemParams.filter(v => v.paramName === value)
      if (provinceCodes.length > 1) {
        callback(new Error('重复'))
      } else {
        callback()
      }
    },
    // 校验省份
    verifyProvince2(rule, value, callback) {
      const provinceCodes = this.model.systemGroups[4].systemParams.filter(v => v.paramName === value)
      if (provinceCodes.length > 1) {
        callback(new Error('重复'))
      } else {
        callback()
      }
    },
    // 设置样式
    setRowStyle(row) {
      if (!row.row.enabled) {
        return 'background:#c0c0c0'
      }
    }
  }
}
</script>


<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="order" />
            订单管理
          </div>
          <div class="h140">
            <p>
              <el-badge :value="dataSource.stateCount.treatShipCount" :max="99">
                <el-link type="primary" href="order/purchase/order" class="f16">待发货</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.exceed1DayNotShipCount" :max="99">
                <el-link type="primary" href="order/purchase/order" class="f16">超1天未发货</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.exceed2DayNotShipCount" :max="99">
                <el-link type="primary" href="order/purchase/order" class="f16">超2天未发货</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.partInStockCount" :max="99">
                <el-link type="primary" href="order/purchase/order" class="f16">部分入库</el-link>
              </el-badge>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="product" />
            产品管理
          </div>
          <div class="h140">
            <p>
              <el-badge :value="dataSource.stateCount.priceWaitProcessedCount" :max="99">
                <el-link type="primary" href="approval/goodprice?state=1" class="f16">降价待处理</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.hotBidWaitProcessedCount" :max="99">
                <el-link type="primary" href="product/hot/bid?hotState=1" class="f16">爆款竞价待处理</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.shortTermStockOutCount" :max="99">
                <el-link type="primary" href="product/core?markType=3" class="f16">产品短期缺货</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.discontinuedCount" :max="99">
                <el-link type="primary" href="product/core?markType=2" class="f16">产品即将停产</el-link>
              </el-badge>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="user" />
            开发管理
          </div>
          <div class="h140">
            <p>
              <el-badge :value="dataSource.stateCount.supplierNewestCount" :max="99">
                <el-link type="primary" href="product/supplier/newest/product?states=1&states=2&states=3" class="f16">供应商上新</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.developeNewestCount" :max="99">
                <el-link type="primary" href="product/supplier/newest/product?states=4" class="f16">开发上新</el-link>
              </el-badge>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="gift" />
            爆款维护
          </div>
          <div class="h140">
            <p>
              <el-badge :value="0" :max="99">
                <el-link type="primary" href="#" class="f16">待维护SKU</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="0" :max="99">
                <el-link type="primary" href="#" class="f16">客诉反馈</el-link>
              </el-badge>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="bill" />
            对账管理
          </div>
          <div class="h140">
            <p>
              <el-badge :value="dataSource.stateCount.notUploadStatementCount" :max="99">
                <el-link type="primary" href="bill/statement/account?states=1&states=2" class="f16">未上传对账单</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.alreadyStatementUnpaidCount" :max="99">
                <el-link type="primary" href="bill/statement/account?states=3" class="f16">已对账未付款</el-link>
              </el-badge>
            </p>
            <p>
              <el-badge :value="dataSource.stateCount.paidCount" :max="99">
                <el-link type="primary" href="bill/statement/account?states=4" class="f16">已付款</el-link>
              </el-badge>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="performance" />
            绩效评级
            <el-link type="primary" href="user/supplier/grade" class="fr">更多</el-link>
          </div>
          <div class="h155">
            <el-tabs value="performanceLevel" type="card" stretch>
              <el-tab-pane label="绩效评级" name="performanceLevel" class="tc">
                <h2>{{ dataSource.supplierGrade.grade }}级</h2>
                <h2>{{ dataSource.supplierGrade.score }}分</h2>
              </el-tab-pane>
              <el-tab-pane label="评分标准" name="scoreStandard" class="pl30">
                <div>A级：评分 ≥ 80</div>
                <div>B级：80 > 评分 ≥ 60</div>
                <div>C级：60 > 评分 ≥ 40</div>
                <div>D级：40 > 评分 ≥ 20</div>
                <div>E级：20 > 评分</div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="mt20">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="count" />
            上新数量
            <el-link type="primary" href="product/supplier/newest/product" class="fr">更多</el-link>
          </div>
          <div ref="newQuantityChart" class="h400" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="count" />
            下单数量
            <el-link type="primary" href="order/purchase/order" class="fr">更多</el-link>
          </div>
          <div ref="orderQuantityChart" class="h400" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <svg-icon icon-class="company" />
            企业公告
            <el-link type="primary" href="system/notice" class="fr">更多</el-link>
          </div>
          <div class="h400 f16">
            <el-tabs value="notice_0" type="card" stretch>
              <el-tab-pane v-for="(item, index) in dataSource.noticeTypes" :key="item.key" :label="item.value" :name="'notice_' + index">
                <el-scrollbar class="h350">
                  <p v-for="(item, index) in dataSource.companyNotice[index + 1]" :key="item.id">
                    <el-link type="primary" @click="viewNotice(item)">{{ index + 1 }}.{{ item.title }}</el-link>
                  </p>
                </el-scrollbar>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 查看公告 -->
    <el-dialog :title="dataSource.notice.title" :visible.sync="dialogVisible.viewNotice" width="60%" >
      <el-scrollbar class="h600">
        <div class="notice-content" v-html="dataSource.notice.content" />
      </el-scrollbar>
    </el-dialog>

  </div>
</template>

<script>
import { getStateCountMap, getSupplierGradeMap, getCompanyNoticeMap, getNewQuantityChart, getOrderQuantityChart } from '@/api/index'
import { getNoticeTypeList } from '@/api/enum'
import { collectAddress } from '@/api/collect_address'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      dataLoading: true,
      sourceProvinceList: collectAddress.province,
      sourceCityList: [],
      sourceCountyList: [],
      dataSource: {
        notice: {},
        noticeTypes: [],
        stateCount: {},
        supplierGrade: {},
        companyNotice: {}
      },
      dialogVisible: {
        viewNotice: false,
        viewTaskPublish: false,
      },
      newQuantityChart: undefined,
      orderQuantityChart: undefined,
    }
  },
  mounted() {
    // 设置初始图表
    this.newQuantityChart = echarts.init(this.$refs.newQuantityChart)
    this.orderQuantityChart = echarts.init(this.$refs.orderQuantityChart)
    this.getNewQuantityChart()
    this.getOrderQuantityChart()
  },
  created() {
    // 获取公告类型
    getNoticeTypeList().then(({ data }) => {
      this.dataSource.noticeTypes = data
    })

    // 获取状态数量
    getStateCountMap().then(({ data }) => {
      this.dataSource.stateCount = data
    })

    // 获取供应商评级
    getSupplierGradeMap().then(({ data }) => {
      this.dataSource.supplierGrade = data
    })

    // 获取企业公告
    getCompanyNoticeMap().then(({ data }) => {
      this.dataSource.companyNotice = data
    })
  },
  methods: {
    // 新品数量图表
    getNewQuantityChart() {
      this.newQuantityChart.clear()
      this.newQuantityChart.showLoading()
      getNewQuantityChart().then(({ data }) => {
        this.newQuantityChart.hideLoading()
        this.newQuantityChart.setOption({
          xAxis: {
            boundaryGap: false,
            data: ['近第一周', '近第二周', '近第三周', '近第四周']
          },
          yAxis: {},
          tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: { align: 'left' }
          },
          series: [
            {
              name: '新品数量',
              type: 'line',
              data: data
            }
          ]
        })
      })
    },
    // 下单数量图表
    getOrderQuantityChart() {
      this.orderQuantityChart.clear()
      this.orderQuantityChart.showLoading()
      getOrderQuantityChart().then(({ data }) => {
        let keys = data.map(v => v.key);
        let values = data.map(v => v.value);
        this.orderQuantityChart.hideLoading()
        this.orderQuantityChart.setOption({
          xAxis: {
            boundaryGap: false,
            data: keys
          },
          yAxis: {},
          tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: { align: 'left' }
          },
          series: [
            {
              name: '下单数量',
              type: 'line',
              data: values
            }
          ]
        })
      })
    },
    viewNotice(item) {
      this.dialogVisible.viewNotice = true
      this.dataSource.notice = { ...item }
    },
    changeSourceProvince(value) {
      for (let i = 0; i < this.sourceProvinceList.length; i++) {
        const provinceName = this.sourceProvinceList[i].name
        if (provinceName === value) {
          // 清空城市
          this.sourceCityList = []
          this.taskPublishItem.sourceCity = ''
          this.sourceCityList = this.sourceProvinceList[i].city
          break
        }
      }
    },
    changeSourceCity(value) {
      for (let i = 0; i < this.sourceCityList.length; i++) {
        const cityName = this.sourceCityList[i].name
        if (cityName === value) {
          // 清空区县
          this.sourceCountyList = []
          this.taskPublishItem.sourceCounty = ''
          this.sourceCountyList = this.sourceCityList[i].county
          break
        }
      }
    }
  }
}
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
.notice-content img {
  max-width: 100%;
}
</style>

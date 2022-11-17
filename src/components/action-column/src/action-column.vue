<template>
  <el-table-column label="操作" width="110" class-name="p0">
    <template v-slot="{ row }">
      <el-dropdown type="primary" size="medium" trigger="click">
        <el-button-group>
          <el-button v-if="disabled || disabledFun(row)" type="primary" size="mini" disabled>{{ text }}</el-button>
          <router-link v-else-if="link" :to="link | replace(row)" v-slot="{ href, navigate }">
            <a class="el-button el-button--primary el-button--mini" :href="href" @click="navigate" @click.stop>{{ text }}</a>
          </router-link>
          <el-button v-else type="primary" size="mini" @click.stop="handleClick(row)">{{ text }}</el-button>
          <el-button type="primary" size="mini" class="el-dropdown__caret-button">
            <i class="el-dropdown__icon el-icon-arrow-down" />
          </el-button>
        </el-button-group>
        <el-dropdown-menu slot="dropdown">
          <slot :row="row" />
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'ActionColumn',
  props: {
    text: {
      type: String,
      default: '操作'
    },
    link: String,
    disabled: Boolean,
    disabledFun: {
      type: Function,
      default: () => false
    }
  },
  filters: {
    replace(value, row) {
      for (let key in row) {
        value = value.replace(new RegExp('{' + key + '}', 'g'), row[key])
      }
      return value
    }
  },
  methods: {
    handleClick(row) {
      this.$emit('click', row)
    }
  }
}
</script>
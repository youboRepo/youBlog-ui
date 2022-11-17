import SearchFormItem from './src/search-form-item.vue'

SearchFormItem.install = function (Vue) {
  Vue.component(SearchFormItem.name, SearchFormItem)
}

export default SearchFormItem
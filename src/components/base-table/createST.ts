import {
  type Component,
  defineComponent,
  provide,
  reactive,
  type Ref,
  ref,
  unref,
  h,
  inject,
  readonly
} from 'vue'
import type { IParamsInject, IUseTableOption, IUseTableParams, IUserTableReturn } from './types'
import { _token } from './const'
import { useTryCatch } from 'v3-usehook'
import type { DataTableProps } from 'naive-ui'

export function useInject<T = IParamsInject>() {
  return inject(_token) as T
}
// // 创建TableVnode
export function createUseTable(globalOptions: IUseTableOption) {
  if (!globalOptions.component) {
    throw new Error('请配置表格组件模板')
  }
  let _indexName = globalOptions.req?.reName?.index || 'index'
  let _sizeName = globalOptions.req?.reName?.size || 'size'
  let _listName = globalOptions.res?.reName?.list || 'data'
  let _listTotal = globalOptions.res?.reName?.total || 'total'
  return function useTable<T = any>(
    params: IUseTableParams<T>,
    /** 表格属性 */
    tableAttrs?: DataTableProps & { /** 是否使用列表模式 */ listMode?: boolean }
    // options?: Partial<Omit<IUseTableOption, 'component'>>
  ): IUserTableReturn<T> {
    _indexName = params?.req?.reName?.index || _indexName
    _sizeName = params?.req?.reName?.size || _sizeName
    _listName = params?.res?.reName?.list || _listName
    _listTotal = params?.res?.reName?.total || _listTotal
    const loading = ref(false)
    const tableData = ref<T[]>([]) as Ref<T[]>
    const pageInfo = reactive({
      [_indexName]: 1,
      [_sizeName]: 10,
      total: 0
    })

    let searchInfo = reactive({})

    /** 获取表格数据 */
    async function getTalbeData() {
      if (!params?.requestApi) {
        tableData.value = params?.dataSource || []
        pageInfo.total = params.dataSource?.length || 0
        return
      }
      loading.value = true
      const [res, err] = await useTryCatch(params?.requestApi, {
        ...pageInfo,
        ...(params?.req?.params || {}),
        ...searchInfo
      })
      loading.value = false
      if (err || !res.success) return
      if (params.onLoad) {
        params.onLoad(res.data)
      }
      /** 列表模式 */
      if (tableAttrs && tableAttrs?.listMode) {
        pageInfo.total = res.data.length
        tableData.value = res.data
        tableAttrs.pagination = false
      } else {
        /** 表格模式 */
        pageInfo.total = eval(`res.data.${_listTotal}`)
        tableData.value = eval(`res.data.${_listName}`)
      }
    }
    if (!params.req || !params.req.lazyLoad) {
      getTalbeData()
    }

    /** 页数改变事件 */
    async function handlePageChange(currentPage: number) {
      pageInfo[_indexName] = currentPage

      getTalbeData()
    }
    /** 每页条数改变事件 */
    async function handleSizeChange(size: number) {
      pageInfo[_sizeName] = size
      getTalbeData()
    }
    // 搜索
    function search(data: any) {
      searchInfo = { ...searchInfo, ...data }
      pageInfo[_indexName] = 1
      pageInfo.total = 0
      getTalbeData()
    }
    // 重置
    function reload(data: any = {}) {
      pageInfo[_indexName] = 1
      pageInfo.total = 0
      searchInfo = data
      getTalbeData()
    }

    // 设置异步dataSource
    function setDataSource(data: any[]) {
      tableData.value = data
    }

    function getDataSource() {
      return readonly(tableData.value)
    }

    /** 操作按钮时间 */
    function handleActionButtonClick(item: any) {
      item.onClick(getTalbeData)
    }

    const UseTableComponent = defineComponent({
      setup(props, { slots, attrs }) {
        /** 注入params */
        provide(_token, {
          loading: readonly(loading),
          columns: params.columns,
          tableData,
          pageInfo,
          handlePageChange,
          handleSizeChange,
          handleActionButtonClick,
          attrs: { ...tableAttrs, ...attrs }
        })

        // jsx实现
        // return () => <globalOptions.component>{_collectSlots}</globalOptions.component>
        // h实现
        return () => h(globalOptions.component, null)
      }
    })

    return {
      STComponent: UseTableComponent,
      search,
      reload,
      getDataSource,
      setDataSource
    }
  }
}

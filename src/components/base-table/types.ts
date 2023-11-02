import type { DataTableColumn } from 'naive-ui'
import type { Component, Ref } from 'vue'
import type { ISF_Item } from '../base-form/types'

export interface IReq {
  req?: {
    params?: any
    reName?: {
      index?: string
      size?: string
    }
    lazyLoad?: Boolean
  }
}
export interface IRes {
  res?: {
    reName?: {
      total?: string
      list?: string
    }
  }
}
export interface IUseTableOption extends IReq, IRes {
  component: any
}

export interface IUserTableReturn<T = any> {
  STComponent: Component
  search: (...args: any) => any
  reload: (...args: any) => any
  getDataSource: () => any
  setDataSource: (data: any[]) => any
}

export interface IUseTableParams<T = any> extends IReq, IRes {
  requestApi?: (...args: any) => Promise<any>
  onLoad?: (data: any) => any
  dataSource?: T[]
  columns: DataTableColumn[]
  hidePaginator?: boolean
  schema?: { [keyName: string]: ISF_Item }
}

export interface IParamsInject<T = any> {
  /** 加载状态 */
  loading: Ref<boolean>
  /** 静态数据源 */
  tableData?: Ref<T[]>
  /** 表格列 */
  columns: DataTableColumn<T>[]
  // 分页参数
  pageInfo: any
  /** 接口 */
  // requestApi?: (...args: any) => Promise<IBaseResponse>;
  hidePaginator?: boolean
  // 分页条数变换事件
  handleSizeChange: (...args: any) => any
  // 当前页变化事件
  handlePageChange: (...args: any) => any
  // 操作按钮点击事件
  handleActionButtonClick: (...args: any) => any
  /** 表格属性 */
  attrs: any
}

import Vue, { VNode } from 'vue'

import { tableLabelItem } from './components/HosJoyTable/tableLabelItem'
declare global {

  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

    interface TableRenderParam<T = any> {
        row: T,
        column: {
            /** Property name of the source data */
            property: string
            /** Label of the column */
            label: string
            [k: string]: any
        },
        $index: number,
        [k: string]: any
    }
    /** 好橙工通用类型 */
    namespace HCGCommonInterface {
        /** 所属分部 */
        interface Branch {
            /** 机构id */
            crmDeptCode?: string
            /** 机构编码 */
            deptCode?: string | number
            /** 机构名称 */
            deptName?: string
            /** 机构id */
            pkDeptDoc?: string
            /** 父机构id */
            pkFatherDept?: string
        }
    }
    /** hosJoyTable column属性 */
    type tableLabelProps<T extends {} = any> = Array<tableLabelItem<T>>

}
import Vue, { VNode } from 'vue'

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

    /** 好橙工通用类型 */
    namespace CommonInterface {
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
}
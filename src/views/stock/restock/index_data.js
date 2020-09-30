// table表格, 表头字段
export const table_header = [
  {
    key: 'in_time',
    prop: 'in_time',
    label: '日期',
  },
  {
    key: 'serial',
    prop: 'serial',
    label: '单据号',
  },
  {
    key: 'materiel_name',
    prop: 'materiel.materiel_name',
    label: '物料名称',
  },
  {
    prop: 'materiel.standard',
    key: 'standard',
    label: '规格',
  },
  {
    prop: 'materiel.unit',
    key: 'unit',
    label: '单位',
  },
  {
    key: 'in_number',
    prop: 'in_number',
    label: '实收数量',
  },
  {
    key: 'price',
    prop: 'price',
    label: '单价',
  },
  // {
  //   key: 'sum',
  //   prop: 'sum',
  //   label: '实收金额',
  // },
  {
    key: 'comment',
    prop: 'comment',
    label: '备注',
  },
]
// table表格, 表头显示的字段
export const show_header = [
  'in_time',
  'serial',
  'materiel_name',
  'standard',
  'unit',
  'in_number',
  'price',
  'sum',
  'comment',
]
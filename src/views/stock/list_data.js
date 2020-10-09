// table表格, 表头字段
export const table_header = [
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
    prop: 'in_number',
    key: 'in_number',
    label: '数量',
  },
  {
    prop: 'materiel.unit',
    key: 'unit',
    label: '单位',
  },
  {
    prop: 'price',
    key: 'price',
    label: '价格',
  },
  {
    prop: 'created_at',
    key: 'created_at',
    width: '180',
    label: '进货日期',
  },
  {
    prop: 'serial',
    key: 'serial',
    label: '单据号',
  },
  {
    prop: 'comment',
    key: 'comment',
    label: '备注',
  },
]
// table表格, 表头显示的字段
export const show_header = [
  'materiel_name',
  'standard',
  'unit',
  'in_number',
  'price',
  'comment',
  'created_at',
  'serial',
]
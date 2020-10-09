// table表格, 表头字段
export const table_header = [
  {
    key: 'created_at',
    prop: 'created_at',
    label: '进货日期',
  },
  {
    key: 'serial',
    prop: 'serial',
    label: '收货单号',
  },
  {
    key: 'materiel_name',
    prop: 'stock.materiel.materiel_name',
    label: '物料名称',
  },
  {
    prop: 'stock.materiel.standard',
    key: 'standard',
    label: '规格',
  },
  {
    prop: 'stock.materiel.unit',
    key: 'unit',
    label: '单位',
  },
  {
    key: 'in_number',
    prop: 'in_number',
    label: '进货量',
  },
  {
    key: 'price',
    prop: 'price',
    label: '进货价',
  },
]
// table表格, 表头显示的字段
export const show_header = [
  'created_at',
  'serial',
  'materiel_name',
  'standard',
  'unit',
  'in_number',
  'price',
  'sum',
]
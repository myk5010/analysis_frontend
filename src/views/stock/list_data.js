// table表格, 表头字段
export const table_header = [
  {
    key: 'materiel_name',
    prop: 'materiel.materiel_name',
    width: '180px',
    label: '物料名称',
  },
  {
    prop: 'materiel.standard',
    key: 'standard',
    width: '120px',
    label: '规格',
  },
  {
    prop: 'materiel.unit',
    key: 'unit',
    width: '120px',
    label: '单位',
  },
  {
    prop: 'gross',
    key: 'gross',
    width: '120px',
    label: '总量',
  },
  {
    prop: 'amount',
    key: 'amount',
    width: '120px',
    label: '总价',
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
  'gross',
  'amount',
  'comment'
]
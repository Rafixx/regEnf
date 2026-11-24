import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  tableColHeader: {
    width: '16.66%',
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'left',
  },
  tableCol: {
    // width: '16.66%',
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
});

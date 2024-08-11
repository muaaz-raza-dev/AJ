import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { IfilteredTransactionsPdf} from './Types/IfilteredTransactions.pdf';
import moment from 'moment';
import { IShortTransactions } from '@/app/Types/ItransactionsRead';
import { GetTransactionPurposes } from '@/utils/GetEachTransactionPurpose';


const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: "flex",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableRow: {
    flexDirection: "row",
},
    
    tableCol: {
    flexWrap:"wrap",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flexWrap:"wrap",
margin: 5,
    fontSize: 10,
  },
});

const PAGE_SIZE = 19; // Number of transactions per page

const splitTransactions = (transactions: IShortTransactions[], pageSize: number= PAGE_SIZE) => {
  const pages: IShortTransactions[][] = [];
  for (let i = 0; i < transactions.length; i += pageSize) {
    pages.push(transactions.slice(i, i + pageSize));
  }
  return pages;
};


const FilteredTransactions = ({ payload }: { payload:IfilteredTransactionsPdf }) => 
    {
        let PagesTransactions = splitTransactions(payload.TotalTransactions)
        

return (
  <Document>
{PagesTransactions.map((page,pageNo,{length:total})=>{
    return <Page size="A4"  style={styles.page}>
    <View style={styles.header}>
      <Text>Transaction Report ({moment(payload.DateRangeDetails.start).format("DD/MMMM/YY")} - {moment(payload.DateRangeDetails.end).format("DD/MMMM/YY")})  </Text>
    </View>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={{...styles.tableCol,width:"10%"}}>
          <Text style={styles.tableCell}>Invoice</Text>
        </View>
        <View style={{...styles.tableCol,width:"15%"}}>
          <Text style={styles.tableCell}>Date</Text>
        </View>
        <View style={{...styles.tableCol,width:"20%"}}>
          <Text style={styles.tableCell}>Student Name & GRNO</Text>
        </View>
        <View style={{...styles.tableCol,width:"40%"}}>
          <Text style={styles.tableCell}>Purpose</Text>
        </View>
        <View style={{...styles.tableCol,width:"15%"}}>
          <Text style={styles.tableCell}>Total Amount</Text>
        </View>

      </View>
      {page.map((tr,id) => {
          return(
        <View style={styles.tableRow} key={id}>
          <View style={{...styles.tableCol,width:"10%"}}>
            <Text style={styles.tableCell}>{tr.Invoice}</Text>
          </View>
          <View style={{...styles.tableCol,width:"15%"}}>
            <Text style={styles.tableCell}>{moment(tr.Time).format("DD-MMMM-YYYY")}</Text>
          </View>
          <View style={{...styles.tableCol,width:"20%"}}>
            <Text style={styles.tableCell}>{`${tr.Student.GRNO} ${tr.Student.FirstName} ${tr.Student.LastName}`}</Text>
          </View>
          <View style={{...styles.tableCol,width:"40%"}}>
            <Text style={styles.tableCell}>{tr.Transactions.map(purp=>GetTransactionPurposes(purp))}</Text>
          </View>
          <View style={{...styles.tableCol,width:"15%"}}>
            <Text style={styles.tableCell}>{tr.amount.totalAmount} PKR</Text>
          </View>
        </View>
      ) }) }
    </View>
    <Text style={{fontSize:9,marginTop:20}}>{pageNo+1}/{total} </Text>
  </Page>
})}


  </Document>
)
};

export default FilteredTransactions;

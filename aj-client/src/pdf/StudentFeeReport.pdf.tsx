import { IstdFeeReportFilters, IstdFeeReportPayload } from '@/app/Types/IstdFeeReport';
import { PaymentStudentStatus } from '@/Pages/Transactions/Sub pages/Student Fee Report/Components/StudentListTable.std.repo';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';


// Define styles
const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subLabel: {
      fontSize: 12,
      marginTop: 5,
    },
    table: {
      marginTop: 20,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      alignItems: 'center',
    },
    tableCellHeader: {
      paddingVertical: 8,
      fontSize: 10,
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
      textAlign: 'center',
    },
    tableCell: {
      paddingVertical: 8,
      fontSize: 10,
      textAlign: 'center',
    },
    
    studentCount: {
        marginTop: 10,
        textAlign: 'right',
        fontSize: 9,
        fontWeight: 'bold',
      },
  });

// Create Document Component
const StudentFeeReport:FC<{
  filters:IstdFeeReportFilters;
  payload:IstdFeeReportPayload;
  Sessions: {[key: string]: string}
}> = ({filters:{available,selected:{PaymentConfig,Session,Month,Year,Type}},payload},
  Sessions
) => 
  {
    const {PaymentConfigs} = available
    let Session_N = Sessions[Session]
    let PaymentConfig_N = PaymentConfigs[Session]?.find(e=>e.value==PaymentConfig)?.label || ""

    return(
    <Document>
    <Page style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Student Fee Report</Text>
        <Text style={styles.subLabel}>{PaymentConfig_N} {Month? Month + " - " + Year : Session_N}</Text>
        <Text style={styles.subLabel}>Class :{payload.class.name}  ({payload.status})</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCellHeader, { width: '10%' }]}>#</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Full Name</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>GRNO</Text>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Father Name</Text>
          <Text style={[styles.tableCellHeader, { width: '10%' }]}>Class</Text>
          {
            Type == "Paid" && <Text style={[styles.tableCellHeader, { width: '15%' }]}>Invoice No</Text>
          }
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Fee Status</Text>
        </View>

        {/* Table Row - Example */}
          {
            payload.students.map((std,i)=>{
              return <View style={styles.tableRow} key={i}>
              <Text style={{...styles.tableCell, ...{ width: '10%',paddingHorizontal:0 }}}>{i+1}</Text>
              <Text style={[styles.tableCell, { width: '15%' }]}>{std.FirstName} {std.LastName}</Text>
              <Text style={[styles.tableCell, { width: '15%' }]}>{std.GRNO}</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>{std.fatherName}</Text>
              <Text style={[styles.tableCell, { width: '10%' }]}>{payload.class.name} </Text>
              <Text style={[styles.tableCell, { width: '15%' },]}>{PaymentStudentStatus(payload,Type)}</Text>
              {
            Type == "Paid" && <Text style={[styles.tableCell, { width: '15%' }]}>{std?.Invoice}</Text>
              }
            </View>
            })
          }
        
      

        {/* Add more rows as needed */}
        <Text style={styles.studentCount}>Total Students: {payload.students.length}</Text>

      </View>
    </Page>
  </Document>
)};



export default StudentFeeReport
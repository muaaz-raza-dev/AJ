
import { ItransactionDetail } from '@/app/Types/ItransactionDetail';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';
import { FC } from 'react';
const styles = StyleSheet.create({
  page: {
    padding: 18,
    paddingTop:30,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
    ,
    flexDirection:"column"
  },
  schoolName: {
    fontSize: 20,
    fontWeight: 'black',
  },
  address: {
    fontSize: 10,
    marginBottom: 3,
  },
  section: {
    marginBottom: 10,
    display:"flex",
    flexDirection:"column",
    gap:2 ,
  },
  title: {
    fontSize: 16,
    fontWeight: 'black',
    marginBottom: 10,
  },
  label:{
    fontSize:10,
    fontWeight:"bold"
  },
  value:{fontSize:10,fontWeight:"bold",
  },
  table: {
    width: '100%',
    borderBottom:"1px solid #fff",
    paddingBottom:10,
    marginVertical: 5,
    display:"flex",
    flexDirection:"column",
    gap:8,
  },
  tableHeader: {
    display:"flex",
    flexDirection:"row",
    borderBottom:"#fff 1px solid",
    gap:8,
    width:"100%",
    marginBottom:4,
  },
  tableCell: {
    fontSize: 10,
    fontWeight:"ultrabold"
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  rowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1pt solid #1f1f1f',
    borderBottom: '1pt solid #1f1f1f',
    width: '100%', // use '100%' instead of 'full'
    
  },


});
//inch
let Width = 11.69/3 
let height = 8.27 

// convert inch to points
let Width_points = Width*72
let height_points = height*72

// Create Document Component
const Transaction:FC<{data:ItransactionDetail|undefined}> = ({data}) => {
  if(data) {
    return (
      <Document >
    <Page size={{width:Width_points,height:height_points}} style={styles.page}>
 
        <View style={styles.header}>
          <Image style={{width:30,height:30,marginBottom:5}} src={"/images/sampleLogo.jpeg"} />
          <Text style={styles.schoolName}>AJ foundation Academy</Text>
          <Text style={styles.address}>1234 School Lane, City, State, ZIP</Text>
          <Text style={styles.address}>Phone: +923002101017</Text>
        </View>

        <View style={styles.section}>
        <View style={{display:"flex",flexDirection:"row", gap:1}}>
          <Text style={styles.label}>GRNO : </Text>
            <Text style={styles.value}> {data.Student.GRNO}</Text>
          </View>
          <View style={{display:"flex",flexDirection:"row", gap:1}}>
          <Text style={styles.label}>Student Name : </Text>
            <Text style={styles.value}>{data.Student.FirstName} {data.Student.LastName}</Text>
          </View>
          <View style={{display:"flex",flexDirection:"row", gap:1}}>
          <Text style={styles.label}>Class : </Text>
            <Text style={styles.value}> {data.Student.FirstName} </Text>
          </View>
          <View style={{display:"flex",flexDirection:"row", gap:1}}>
          <Text style={styles.label}>Invoice no : </Text>
            <Text style={styles.value}> {data.Invoice}</Text>
          </View>
        <View style={{display:"flex",flexDirection:"row", gap:1, }}>
          <Text style={styles.label}>Recieved By : </Text>
            <Text style={styles.value}> {data.RecievedBy.Name}</Text>
          </View>
          <View style={{display:"flex",flexDirection:"row", gap:1,}}>
          <Text style={styles.label}>Recieved On : </Text>
          <Text style={styles.value}> {moment(data.Time||"").format("D MMMM YYYY hh:mm:ss a")}</Text>
          </View>
        </View>

{/* //Purpose */}
        <View style={{...styles.section}}>
          <View style={{...styles.table,borderBottom:"1px solid black "}}>
            <View style={{...styles.tableHeader,borderBottom:"1px black solid",paddingBottom:2}}>
              <Text style={{...styles.tableCell,width:"10%"}}>S.No</Text>
              <Text style={{...styles.tableCell,width:"45%"}}>Purpose</Text>
              <Text style={{...styles.tableCell,width:"20%"}}>Session</Text>
              <Text style={{...styles.tableCell,width:"20%"}}>Amount</Text>
            </View>
            {data.Transactions.map((tr, index) => (
              <View key={"asdf"} style={styles.tableHeader}>
                <Text style={{...styles.tableCell,width:"10%",fontSize:8}}>{index+1}</Text>
                <Text style={{...styles.tableCell,width:"45%"}}>{tr?.month} {tr?.year} {!tr?.month&&tr?.session} {tr.paymentTitle}</Text>
                <Text style={{...styles.tableCell,width:"20%"}}>{tr.session?.split(" ")[1]} </Text>
                <Text style={{...styles.tableCell,width:"20%"}}>{tr.amount.totalAmount}</Text>
              </View>
              
             
             ))} 
          </View>
        </View>

      {/* Amount Details */}
            <View style={{...styles.tableHeader,display:"flex",flexDirection:"row",marginTop:2,justifyContent:"flex-end",width:"100%"}}>
            <View style={{...styles.tableHeader,width:"50%",flexDirection:"column",alignSelf:"flex-end",gap:4}}>
            <View style={{display:"flex",flexDirection:"row",gap:3}}>
          <Text style={styles.label}>Paid: </Text>
            <Text style={styles.value}> {data.PaidAmount} </Text>
          </View>
              </View>
            <View style={{...styles.tableHeader,width:"50%",flexDirection:"column",gap:4}}>
            <View style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.label}>Total Amount: </Text>
            <Text style={styles.value}> {data.amount.realAmount} </Text>
          </View>
          <View style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.label}>Total Discount: </Text>
            <Text style={styles.value}> {data.amount.discount} </Text>
          </View>
          <View style={{...styles.rowWithBorder,display:"flex",flexDirection:"row", paddingVertical:3
            , justifyContent:"space-between"}}>
          <Text style={styles.label}>Grand Total: </Text>
            <Text style={styles.value}>{data.amount.totalAmount} </Text>
          </View>
     
              </View>
              </View>

        <View style={{...styles.rowWithBorder,paddingVertical:5 }} >
          <Text style={{fontSize:8}}>This receipt is unique to AJ foundation Academy. Any alterations or duplications are prohibited and may result in disciplinary action. Please retain this receipt for your records.</Text>
        </View>

        <View style={{display:"flex",width:"100%",paddingVertical:10 }} >
        <Text style={{fontSize:14,textAlign:"center"}}>Thanks for the payment</Text>
        </View>
      </Page>
    </Document>
  )
}
}

export default Transaction
const OneTimeFee = require("../../../../models/OneTimeFee");
const { getExpandedTransactions } = require("./CalculateFeeRecordYearBased");

const CalculateOneTimeFee = async(student)=>{
    const payload= []
    const oneTimeFees = await OneTimeFee.find({session:student.firstSession,isDeprecated:false});
    const transactions = await getExpandedTransactions(student._id,OneTimeFees.map(e=>e._id));

    oneTimeFees.forEach(tr=>{
        let amount = 0
        if(tr.feeStatus.includes("Different")) {
            amount = config.classes.find(cl=>cl.classId.toString()== student.firstClass.toString()).amount
        }
        else { amount = tr.classes[0].amount }
        const localPayload = {feeTitle:tr.feeTitle,amount,status:"Paid"}
        let transaction = transactions.find(t=>t.Transactions.paymentConfigId._id.toString()==tr._id.toString())
        const isPaid = transaction ? true : false;
        if(isPaid) {
            localPayload.Invoice = transaction.Invoice
            localPayload.Time = transaction.Time
        }
        else localPayload.status = "Not Paid"
        payload.push(localPayload)
    })
    return payload
}
module.exports = {CalculateOneTimeFee}
import { ItransactionDetail } from '@/app/Types/ItransactionDetail';
import Transaction from '@/pdf/Transaction.pdf';
import { pdf } from '@react-pdf/renderer';
import toast from 'react-hot-toast';


const usePrintTransaction = () => {
    const Print = async (data:ItransactionDetail|undefined,) => {
        if (!data) return toast.error("Print fail . Try again later!");
        const blob = await pdf(<Transaction data={data}  />).toBlob();
        console.log(blob);
        const url = URL.createObjectURL(blob);
        // Wait for the iframe to load and then print
        const iframe = document.getElementById('PDFView') as HTMLIFrameElement;
        if (!iframe) return toast.error("Print fail . Try again later!");

        iframe.src = url;
    
        // Wait for the iframe to load and then print
        iframe.onload = () => {
          const iframeDocument = iframe.contentDocument;
          if (iframeDocument) {
            iframe.contentWindow?.print();
            URL.revokeObjectURL(url)
        }
            // Clean up URL object after print
            // iframeRef.current.onloadeddata = () => URL.revokeObjectURL(url);
      };
      
    } 
    return { Print }
}

export default usePrintTransaction
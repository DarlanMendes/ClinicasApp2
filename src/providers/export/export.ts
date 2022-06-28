
import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import * as papa from 'papaparse';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
@Injectable()
export class ExportProvider {

  public static EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'
  public static EXCEL_EXTENSION = '.xlsx';

  public static PDF_TYPE = 'aplication/pdf'
  public static PDF_EXTENSION = '.pdf';

  constructor() {
    console.log('Hello ExportProvider Provider');
  }
  gerarPDF(JsonArr:any[], nomeArquivo:string){
    const headerText = 'Clinicas';
    let col=[];
    let rows=[];

    Object.keys(JsonArr[0]).forEach(key => {
      col.push(key);
    });
    for (let i = 0; i < JsonArr.length; i++) {
      const element = JsonArr[i];
      let tempArr =[];

      Object.keys(element).forEach(key => {
        const value = element[key];
        tempArr.push(value);
        
      });
      rows.push(tempArr);
    }


    let doc = jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(8);

     

    //HEADER
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text(headerText, doc.internal.pageSize.getWidth()/2,45,{align: 'center'});
    //conteudo 
     doc.autoTable(col, rows,{
      margin: {top:65}
     });
     //FOOTER - PAGE NUMBERS
     const pages = doc.internal.getNumberOfPages();
     const pageWidth = doc.internal.pageSize.width;
     const pageHeight = doc.internal.pageSize.height;
     doc.setFontSize(10);

     for(let j=1; j<pages +1 ;j++){
      let horizontalPos = pageWidth/2;
      let verticalPos = pageHeight -10;
      doc.setPage(j);
      doc.text(`${j}- ${pages}`, horizontalPos, verticalPos, {align:'center'});
     }
     
     const bufferPDF = doc.output('blob')
     this.saveAsPDFFile(bufferPDF ,nomeArquivo );
    }


  gerarCSV(JsonArr:any[], nomeArquivo:string){
    const csv = papa.unparse(JsonArr);
    this.downloadFile(csv, nomeArquivo + '.csv');
  }

  
  gerarExcel(JsonArr:any[], nomeArquivo:string){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(JsonArr);
    const workbook: XLSX.WorkBook = {Sheets: {'data':worksheet},SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType:'xlsx',type: 'array'});
    this.saveAsExcelFile(excelBuffer, nomeArquivo);
  }

  private saveAsExcelFile(buffer: any, FileName:string){
    const data: Blob = new Blob([buffer], {type: ExportProvider.EXCEL_TYPE});
    FileSaver.saveAs(data, FileName+ ExportProvider.EXCEL_EXTENSION);
  }
  private saveAsPDFFile(buffer: any, FileName:string){
    const data: Blob = new Blob([buffer], {type: ExportProvider.PDF_TYPE});
    FileSaver.saveAs(data, FileName+ ExportProvider.PDF_EXTENSION);
  }

  private downloadFile(conteudo: string, filename: string){
    let blob = new Blob ([conteudo]);
    let a = window.document.createElement('a');
    a.href= window.URL.createObjectURL(blob);

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

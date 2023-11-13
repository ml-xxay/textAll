import ExcelJs from 'exceljs';
import FileSaver from 'file-saver';
export async function portTable(name, t, titleName, tableData, title, widths) {
  // name:下载的文件标题、工作簿名称
  // t: 表头需要合并的单元格
  // titleName: 表格第一行内容，是一个数组
  // tableData: 数据
  // title: 表头名
  // width: 各列的宽度

  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet(name);
  const row1 = worksheet.addRow(titleName);
  row1.font = { bold: true, size: 20, color: { argb: 'FFFF0000' } }; // 第一行标题样式
  worksheet.mergeCells(t); // 合并单元格
  worksheet.getRow(1).getCell(1).alignment = { // 找到第一行的第一个单元格
    vertical: 'middle', horizontal: 'center' // 垂直居中，水平居中
  }
  worksheet.getCell("A1").fill = {  // getCell("A1") == getRow(1).getCell(1)
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0000FF' }  // 设置单元格背景色
  }
  const handleData = tableData;
  const columns = title;
  worksheet.addTable({
    name: name,
    ref: 'A2', // 从A2单元格添加表格
    style: {
      theme: '',
      showRowStripes: true
    },
    columns: columns, // 列
    rows: handleData // 行
  });
  const width = widths;
  columns.forEach((r, i) => { // 控制列的宽度，以及对齐方式
    worksheet.getColumn(i + 1).width = width[i];
    worksheet.getColumn(i + 1).alignment = { vertical: 'middle', horizontal: 'center' }
  })
  // 添加边框
  for (let num = 0; num < worksheet.lastRow._number; num++) { // 循环出每一行
    for (let index = 0; index < columns.length; index++) { // 循环出每一个单元格
      worksheet.getRow(num + 1).getCell(index + 1).border = { // 为单元格添加边框
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    }
  }
  // console.log(worksheet.lastRow._number);
  const buffer = await workbook.xlsx.writeBuffer();
  return FileSaver(new Blob([buffer]), name + '.xlsx')
}

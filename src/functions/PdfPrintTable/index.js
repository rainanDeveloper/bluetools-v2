import jsPDF from 'jspdf'
import 'jspdf-autotable'

function printTable(title="Impressão",fontSize,margin, data={
	columns: [
		{ header: 'Name', dataKey: 'name'},
		{ header: 'Email', dataKey: 'email' },
		{ header: 'Date', dataKey: 'date' },
		{ header: 'Time', dataKey: 'time' }
	],
	body: [
		{ name: 'John Doe', email: 'johndoe@example.com', date: '01/10/2020', time: '22:34' }
	]
}){
	
	const defaultFontSize = fontSize || 12
	const defaultMargin = margin || 8
	const pdf = new jsPDF()
	
	var cursor = 0

	pdf.setFontSize(defaultFontSize*1.5)
	pdf.text(title, pdf.internal.pageSize.width/2, defaultMargin, null, null, 'center')

	cursor+=defaultMargin+pdf.getTextDimensions(title).h

	pdf.autoTable({
		theme: 'plain',
		styles: {lineColor: '#888',lineWidth: 0.01},
		margin: {top: defaultMargin, right: defaultMargin, bottom: defaultMargin, left: defaultMargin},
		tableWidth: pdf.internal.pageSize.width-(2*defaultMargin),
		headStyles: {
			cellPadding: {top: 0.8, right: 1.6, bottom: 0.8, left: 1.6},
			fillColor: '#2E6AD1',
			textColor: 'white',
			lineColor: '#0c3882'
		},
		bodyStyles: {cellPadding: {top: 0.5, right: 1, bottom: 0.5, left: 1}, fontSize: (defaultFontSize), fillColor: '#eee'},
		alternateRowStyles: {fillColor: '#fff'},
		startY: cursor,
		...data
	})
	
	var blob = pdf.output("blob")
    window.open(URL.createObjectURL(blob))
}

export default printTable
const YeuCauBaoGia = () => {

	const textareaKichThuoc = document.querySelector('.box-hiden-dai-rong-cao');
	const textareaSoLuong = document.querySelector('.box-so-luong');
	const textareaTrongLuong = document.querySelector('.box-trong-luong');
	const bodyTableBaoGia = document.querySelector('.yeu-cau-bao-gia table tbody');

	const getDataPerRow = row => {
		let rowData = {};
		if (row.querySelector('.dai').value) {
			rowData.dai = row.querySelector('.dai').value
		} else {
			rowData.dai = 0;
		}
		if (row.querySelector('.rong').value) {
			rowData.rong = row.querySelector('.rong').value
		} else {
			rowData.rong = 0
		}
		if (row.querySelector('.cao').value) {
			rowData.cao = row.querySelector('.cao').value
		} else {
			rowData.cao = 0
		}
		if (row.querySelector('.soluong').value) {
			rowData.soLuong = row.querySelector('.soluong').value
		} else {
			rowData.soLuong = 0;
		}
		if (row.querySelector('.trongluong').value) {
			rowData.trongLuong = row.querySelector('.trongluong').value
		} else {
			rowData.trongLuong = 0;
		}
		return rowData;
	};

	const getAllDataToArea = (rowArray) => {
		let kichThuoc = '';
		let soLuong = '';
		let trongLuong = '';
		rowArray.forEach(input => {
			const rowData = getDataPerRow(input);
			kichThuoc += `${rowData.dai}x${rowData.rong}x${rowData.cao}\n`;
			soLuong += `${rowData.soLuong}\n`;
			trongLuong += `${rowData.trongLuong}\n`;
		})
		textareaKichThuoc.value = kichThuoc;
		textareaSoLuong.value = soLuong;
		textareaTrongLuong.value = trongLuong;
	};

	const calculateRow = (row) => {
		const rowData = getDataPerRow(row);
		const tongTheTich = (rowData.dai * rowData.rong * rowData.cao) / 1000000 * rowData.soLuong;
		const tongtrongluongAIR = (rowData.dai * rowData.rong * rowData.cao) / 6000 * rowData.soLuong;
		const tongtrongluongCourier = (rowData.dai * rowData.rong * rowData.cao) / 5000 * rowData.soLuong;
		const tongTrongLuong = rowData.soLuong * rowData.trongLuong;

		row.querySelector('.tongthetich').value = tongTheTich;
		row.querySelector('.tongtrongluongAIR').value = tongtrongluongAIR;
		row.querySelector('.tongtrongluongCourier').value = tongtrongluongCourier;
		row.querySelector('.tongtrongluong').value = tongTrongLuong;

		if (rowData.dai && rowData.rong && rowData.cao && rowData.soLuong && rowData.trongLuong) {
			const lastInputRow = document.querySelectorAll('.yeu-cau-bao-gia .table-input')[document.querySelectorAll('.yeu-cau-bao-gia .table-input').length - 1]
			const valueLastRow = getDataPerRow(lastInputRow);
			if (valueLastRow.dai && valueLastRow.rong && valueLastRow.cao && valueLastRow.soLuong && valueLastRow.trongLuong) {
				return addRow(row);
			}
		}
	};

	const addRow = row => {
		const newRow = row.cloneNode(true);
		bodyTableBaoGia.insertBefore(newRow, bodyTableBaoGia.querySelector('.table-tong-cong'));
		Array.from(newRow.querySelectorAll('input[type="number"]')).forEach(input => {
			input.value = null;
		})
		newRow.querySelector('input[type="button"]').removeAttribute('disabled')
		const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia .table-input'));
		Array.from(newRow.querySelectorAll('input')).forEach(input => {
			input.addEventListener('change', () => {
				calculateRow(newRow);
				getAllDataToArea(rowArray);
			})
		})
		const btn = newRow.querySelector('input[type="button"]')
		btn.addEventListener('click', () => {
			console.log(btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode));
		})
	}

	const removeRow = () => {
		const removeButtonArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia .table-input .remove input'));
		if (removeButtonArray) {
			removeButtonArray.forEach(btn => {
				btn.addEventListener('click', () => {
					btn.parentNode.removeChild(btn);
				})
			})
		}
	}

	const run = () => {
		const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia .table-input'));
		if (rowArray) {
			rowArray.forEach(row => {
				Array.from(row.querySelectorAll('input')).forEach(input => {
					input.addEventListener('change', () => {
						calculateRow(row);
						getAllDataToArea(rowArray);
					})
				})
			})
		}
	}

	// init
	(() => {
		run();
		removeRow();
	})();
}

module.exports = YeuCauBaoGia;
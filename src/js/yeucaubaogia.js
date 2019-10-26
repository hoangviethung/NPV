const YeuCauBaoGia = () => {

	const textareaKichThuoc = document.querySelector('.box-hiden-dai-rong-cao');
	const textareaSoLuong = document.querySelector('.box-so-luong');
	const textareaTrongLuong = document.querySelector('.box-trong-luong');
	const bodyTableBaoGia = document.querySelector('.yeu-cau-bao-gia-table table tbody');

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
		row.querySelector('.tongtrongluong').value = tongTrongLuong;

		// SO SÁNH 2 CỘT AIR VÀ  COURIER -> NẾU NHỎ HƠN CỘT TỔNG TRỌNG LƯỢNG THÌ LẤY DATA CỦA TỔNG TRỌNG LƯỢNG
		if (tongTrongLuong > tongtrongluongAIR || tongTrongLuong > tongtrongluongCourier) {
			row.querySelector('.tongtrongluongAIR').value = tongTrongLuong;
			row.querySelector('.tongtrongluongCourier').value = tongTrongLuong;
			console.log('Tổng trọng lượng LỚN HƠN 1 trong 2');
		} else {
			row.querySelector('.tongtrongluongAIR').value = tongtrongluongAIR;
			row.querySelector('.tongtrongluongCourier').value = tongtrongluongCourier;
			console.log('Tổng trọng lượng NHỎ 1 trong 2');
		}


		if (rowData.dai && rowData.rong && rowData.cao && rowData.soLuong && rowData.trongLuong) {
			const lastInputRow = document.querySelectorAll('.yeu-cau-bao-gia-table .table-input')[document.querySelectorAll('.yeu-cau-bao-gia-table .table-input').length - 1]
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
		const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia-table .table-input'));
		Array.from(newRow.querySelectorAll('input')).forEach(input => {
			input.addEventListener('change', () => {
				calculateRow(newRow);
				getAllDataToArea(rowArray);
			})
		})
		const btn = newRow.querySelector('input[type="button"]')
		btn.addEventListener('click', () => {
			btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
			const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia-table .table-input'));
			getAllDataToArea(rowArray);
		})
		tinhtong();
	}

	const removeRow = () => {
		const removeButtonArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia-table .table-input .remove input'));
		if (removeButtonArray) {
			removeButtonArray.forEach(btn => {
				btn.addEventListener('click', () => {
					btn.parentNode.removeChild(btn);
					const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia-table .table-input'));
					getAllDataToArea(rowArray);
				})
			})
		}
		tinhtong();
	}

	const run = () => {
		const rowArray = Array.from(document.querySelectorAll('.yeu-cau-bao-gia-table .table-input'));
		if (rowArray) {
			rowArray.forEach(row => {
				Array.from(row.querySelectorAll('input')).forEach(input => {
					input.addEventListener('change', () => {
						calculateRow(row);
						getAllDataToArea(rowArray);
						tinhtong(row);
					})
				})
			})
		}
	}

	const tinhtong = () => {
		$('.yeu-cau-bao-gia-table input[type="number"]').on('change', function(e) {
			let SUM_soluong = 0;
			let SUM_trongluong = 0;
			let SUM_tongthetich = 0;
			let SUM_tongtrongluong = 0;
			let SUM_trongluongtinhcuocAir = 0;
			let SUM_trongluongtinhcuocCourier = 0;

			$('.soluong').each(function() {
				SUM_soluong += Number($(this).val());
			})

			$('.trongluong').each(function() {
				SUM_trongluong += Number($(this).val());
			})

			$('.tongthetich').each(function() {
				SUM_tongthetich += Number($(this).val());
			})

			$('.tongtrongluong').each(function() {
				SUM_tongtrongluong += Number($(this).val());
			})

			$('.tongtrongluongAIR').each(function() {
				SUM_trongluongtinhcuocAir += Number($(this).val());
			})

			$('.tongtrongluongCourier').each(function() {
				SUM_trongluongtinhcuocCourier += Number($(this).val());
			})

			$('.SUM_soluong').val(SUM_soluong);
			// $('.SUM_trongluong').val(SUM_trongluong);
			$('.SUM_tongthetich').val(SUM_tongthetich);
			$('.SUM_tongtrongluong').val(SUM_tongtrongluong);
			$('.SUM_trongluongtinhcuocAir').val(SUM_trongluongtinhcuocAir);
			$('.SUM_trongluongtinhcuocCourier').val(SUM_trongluongtinhcuocCourier);
		});
	}

	// init
	(() => {
		run();
		removeRow();
	})();
}

module.exports = YeuCauBaoGia;
const YeuCauBaoGia = () => {
	const hiddenKichThuoc = document.querySelector('.box-hiden-dai-rong-cao');
	const hiddenSoLuong = document.querySelector('.box-so-luong');
	const hiddenTrongLuong = document.querySelector('.box-trong-luong');
	const body = document.querySelector('.yeu-cau-bao-gia-table table tbody');
	const rowSum = document.querySelector('.table-tong-cong');

	const getAllRow = () => {
		return Array.from(document.querySelectorAll('.table-input'));
	};

	const getRowData = row => {
		return {
			dai: Number(row.querySelector('.dai').value),
			rong: Number(row.querySelector('.rong').value),
			cao: Number(row.querySelector('.cao').value),
			soluong: Number(row.querySelector('.soluong').value),
			trongluong: Number(row.querySelector('.trongluong').value),
			isFull: !!(row.querySelector('.dai').value && row.querySelector('.rong').value && row.querySelector('.cao').value && row.querySelector('.soluong').value && row.querySelector('.trongluong').value),
		};
	};

	const getRowResult = (row, data) => {
		const rusult_TheTich = (data.dai * data.rong * data.cao) / 1000000 * data.soluong;
		const rusult_TrongluongAIR = (data.dai * data.rong * data.cao) / 6000 * data.soluong;
		const rusult_TrongluongCourier = (data.dai * data.rong * data.cao) / 5000 * data.soluong;
		const rusult_TrongLuong = data.soluong * data.trongluong;
		row.querySelector('.tongthetich').value = rusult_TheTich;
		row.querySelector('.tongtrongluong').value = rusult_TrongLuong;
		if (rusult_TrongLuong > rusult_TrongluongAIR) {
			row.querySelector('.tongtrongluongAIR').value = rusult_TrongLuong;
		} else {
			row.querySelector('.tongtrongluongAIR').value = rusult_TrongluongAIR;
		}
		if (rusult_TrongLuong > rusult_TrongluongCourier) {
			row.querySelector('.tongtrongluongCourier').value = rusult_TrongLuong;
		} else {
			row.querySelector('.tongtrongluongCourier').value = rusult_TrongluongCourier;
		}
		addRow(data.isFull);
	};

	const setRowHandler = row => {
		row.addEventListener('change', () => {
			getRowResult(row, getRowData(row));
		});
	};

	const setRowRemoveHandler = row => {
		const btnRemove = row.querySelector('.remove input[type="button"]');
		btnRemove.addEventListener('click', () => {
			btnRemove.parentNode.parentNode.parentNode.removeChild(btnRemove.parentNode.parentNode);
			UpdateDataEveryTableChange();
		});
	};

	const addRow = check => {
		if (check) {
			const newRow = body.querySelector('.table-input').cloneNode(true);
			Array.from(newRow.querySelectorAll('input[type="text"], input[type="number"]')).forEach(input => {
				input.value = null;
			});
			newRow.querySelector('input[type="button"]').removeAttribute('disabled');
			setRowHandler(newRow);
			setRowRemoveHandler(newRow);
			body.insertBefore(newRow, rowSum);
		}
	};

	const UpdateDataEveryTableChange = () => {
		// get sum result per column data
		let SUM_soluong = 0;
		let SUM_tongthetich = 0;
		let SUM_tongtrongluong = 0;
		let SUM_trongluongtinhcuocAir = 0;
		let SUM_trongluongtinhcuocCourier = 0;

		Array.from(document.querySelectorAll('.soluong')).forEach(item => {
			SUM_soluong += Number(item.value);
		});

		Array.from(document.querySelectorAll('.tongthetich')).forEach(item => {
			SUM_tongthetich += Number(item.value);
		});

		Array.from(document.querySelectorAll('.tongtrongluong')).forEach(item => {
			SUM_tongtrongluong += Number(item.value);
		});

		Array.from(document.querySelectorAll('.tongtrongluongAIR')).forEach(item => {
			SUM_trongluongtinhcuocAir += Number(item.value);
		});

		Array.from(document.querySelectorAll('.tongtrongluongCourier')).forEach(item => {
			SUM_trongluongtinhcuocCourier += Number(item.value);
		});

		SUM_soluong = Math.round(SUM_soluong * 100) / 100;
		SUM_tongthetich = Math.round(SUM_tongthetich * 100) / 100;
		SUM_tongtrongluong = Math.round(SUM_tongtrongluong * 100) / 100;
		SUM_trongluongtinhcuocAir = Math.round(SUM_trongluongtinhcuocAir * 100) / 100;
		SUM_trongluongtinhcuocCourier = Math.round(SUM_trongluongtinhcuocCourier * 100) / 100;

		// IN RA MÀN HÌNH GIÁ TRỊ TỔNG => LÀM TRÒN ĐẾN 2 CHỮ SÓ THẬP PHÂN CUỐI
		document.querySelector('.SUM_soluong').value = SUM_soluong;
		document.querySelector('.SUM_tongthetich').value = SUM_tongthetich;
		document.querySelector('.SUM_tongtrongluong').value = SUM_tongtrongluong;
		document.querySelector('.SUM_trongluongtinhcuocAir').value = SUM_trongluongtinhcuocAir;
		document.querySelector('.SUM_trongluongtinhcuocCourier').value = SUM_trongluongtinhcuocCourier;

		// Set list data to hidden textarea
		let kichThuoc = '';
		let soLuong = '';
		let trongLuong = '';
		getAllRow().forEach(row => {
			const rowData = getRowData(row);
			kichThuoc += `${rowData.dai}x${rowData.rong}x${rowData.cao}\n`;
			soLuong += `${rowData.soluong}\n`;
			trongLuong += `${rowData.trongluong}\n`;
		});
		hiddenKichThuoc.value = kichThuoc;
		hiddenSoLuong.value = soLuong;
		hiddenTrongLuong.value = trongLuong;
	};

	(() => {
		if (document.querySelector('.yeu-cau-bao-gia-table')) {
			getAllRow().forEach(row => {
				setRowHandler(row);
				setRowRemoveHandler(row);
			});

			document.addEventListener('change', () => {
				UpdateDataEveryTableChange();
			})
		}
	})();
};

module.exports = YeuCauBaoGia;
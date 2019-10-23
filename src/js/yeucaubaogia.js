function getTotal(selector) {
	let tempValue = 0;
	$(selector).each(function () {
		tempValue += Number($(this).val())
	})
	return tempValue;
}

export const YeuCauBaoGia = () => {
	$('.table-input').each(function (index) {
		let thisTableInput = $(this);

		thisTableInput.find('input').on('keyup', function (e) {
			e.preventDefault();

			// CÁC THÔNG SỐ NGƯỜI DÙNG NHẬP VÀO
			let dai = Number(thisTableInput.find('input.dai').val());
			let rong = Number(thisTableInput.find('input.rong').val());
			let cao = Number(thisTableInput.find('input.cao').val());
			let trongluong = Number(thisTableInput.find('input.trongluong').val());
			let soluong = Number(thisTableInput.find('input.soluong').val());

			// CÁC CÔNG THỨC TÍNH
			let tongthetich = (dai * rong * cao) / 1000000 * soluong;
			let tongtrongluong = trongluong * soluong;
			let tongtrongluongAIR = (dai * rong * cao) / 6000 * soluong;
			let tongtrongluongCourier = (dai * rong * cao) / 5000 * soluong;

			// IN CÁC KẾT QUẢ RA NGOÀI MÀN HÌNH
			thisTableInput.find('input.tongthetich').val(tongthetich);
			thisTableInput.find('input.tongtrongluong').val(tongtrongluong);
			thisTableInput.find('input.tongtrongluongAIR').val(tongtrongluongAIR);
			thisTableInput.find('input.tongtrongluongCourier').val(tongtrongluongCourier);

			//
			console.log(thisTableInput);
		});
	})
}
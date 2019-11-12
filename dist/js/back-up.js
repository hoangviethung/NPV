// let i = 0;

// $('body').on('click', '.tac-vu .add', function() {

// 	// Giá trị Type Container
// 	let TypeContainer = $('.tableForm').eq(i).find('.TypeContainer option:selected').val();
// 	let nameTypeContainer = 'containers[' + i + '].TypeContainer';

// 	// Giá trị ContainerNo
// 	let ContainerNo = $('.tableForm').eq(i).find('.ContainerNo').val();
// 	let nameContainerNo = 'containers[' + i + '].ContainerNo';

// 	// Giá trị SealNo
// 	let SealNo = $('.tableForm').eq(i).find('.SealNo').val();
// 	let nameSealNo = 'containers[' + i + '].SealNo';

// 	// Giá trị GW
// 	let dataGW = $('.tableForm').eq(i).find('.GW').val();
// 	let nameGW = 'containers[' + i + '].GW';

// 	// Giá trị CBM
// 	let dataCBM = $('.tableForm').eq(i).find('.CBM').val();
// 	let nameCBM = 'containers[' + i + '].CBM';

// 	// Giá trị NumberOfPackage
// 	let NumberOfPackage = $('.tableForm').eq(i).find('.NumberOfPackage').val();
// 	let nameNumberOfPackage = 'containers[' + i + '].NumberOfPackage';

// 	// Giá trị Unit
// 	let Unit = $('.tableForm').eq(0).find('.Unit option:selected').val();
// 	let nameUnit = 'containers[' + i + '].Unit';


// 	// Khi nhập vào nút thêm sẽ copy ra thêm 1 table
// 	var item_news = $(this).parents('.tableForm');
// 	item_news.parent().append(item_news.prop('outerHTML'));

// 	// Giá trị thứ i của containers[i] tăng lên sau mỗi lần click
// 	i++;

// 	// Tạo thành Array
// 	let rowList = Array.from($('.tableForm'));

// 	// Quăng value đã chọn vào đối tượng mới
// 	$(rowList[rowList.length - 1]).find('.TypeContainer').val(TypeContainer);
// 	$(rowList[rowList.length - 1]).find('.ContainerNo').val(ContainerNo);
// 	$(rowList[rowList.length - 1]).find('.SealNo').val(SealNo);
// 	$(rowList[rowList.length - 1]).find('.GW').val(dataGW);
// 	$(rowList[rowList.length - 1]).find('.CBM').val(dataCBM);
// 	$(rowList[rowList.length - 1]).find('.NumberOfPackage').val(NumberOfPackage);
// 	$(rowList[rowList.length - 1]).find('.Unit select').val(Unit);

// 	// Thêm Name cho các trường
// 	$(rowList[rowList.length - 1]).find('.TypeContainer').attr('name', nameTypeContainer);
// 	$(rowList[rowList.length - 1]).find('.ContainerNo').attr('name', nameContainerNo);
// 	$(rowList[rowList.length - 1]).find('.SealNo input').attr('name', nameSealNo);
// 	$(rowList[rowList.length - 1]).find('.GW').attr('name', nameGW);
// 	$(rowList[rowList.length - 1]).find('.CBM').attr('name', nameCBM);
// 	$(rowList[rowList.length - 1]).find('.NumberOfPackage').attr('name', nameNumberOfPackage);
// 	$(rowList[rowList.length - 1]).find('.Unit select').attr('name', nameUnit);
// });

// // XÓA ĐỐI TƯỚNG KHI CLICK VÀO
// $('body').on('click', '.tac-vu .delete', function() {
// 	var item_delete = $(this).parents('.tableForm');
// 	item_delete.remove();
// });














	// // TABLE XUẤT DATA RA NGOÀI MÀN HÌNH
	// let tableHidden = $('.box-hidden-data');

	// const getAllRow = () => {
	// 	return Array.from(document.querySelectorAll('.tableForm'));
	// };

	// // LẤY HẾT DATA BIẾN THÀNH JSON
	// const getRowData = row => {
	// 	return {
	// 		TypeContainer: $(row).find('.TypeContainer').val(),
	// 		ContainerNo: Number($(row).find('.ContainerNo').val()),
	// 		SealNo: Number($(row).find('.SealNo').val()),
	// 		dataGW: Number($(row).find('.GW').val()),
	// 		dataGBM: Number($(row).find('.CBM').val()),
	// 		NumberOfPackage: Number($(row).find('.NumberOfPackage').val()),
	// 		Unit: $(row).find('.Unit').val(),

	// 		// CHECK DATA CÓ ĐẦU ĐỦ CHƯA
	// 		isFull: !!(row.querySelector('.TypeContainer').value && row.querySelector('.ContainerNo').value && row.querySelector('.SealNo').value && row.querySelector('.GW').value && row.querySelector('.CBM').value && row.querySelector('.NumberOfPackage').value && row.querySelector('.Unit').value)
	// 	};
	// };

	// const getRowResult = (row, data) => {
	// 	const rusult_TypeContainer = data.TypeContainer;
	// 	const rusult_ContainerNo = data.ContainerNo;
	// 	const rusult_SealNo = data.SealNo;
	// 	const rusult_GW = data.dataGW;
	// 	const rusult_CBM = data.dataGBM;
	// 	const rusult_NumberOfPackage = data.NumberOfPackage;
	// 	const rusult_Unit = data.Unit;

	// 	console.log(rusult_TypeContainer);
	// 	console.log(rusult_ContainerNo);
	// 	console.log(rusult_SealNo);
	// 	console.log(rusult_GW);
	// 	console.log(rusult_CBM);
	// 	console.log(rusult_NumberOfPackage);
	// 	console.log(rusult_Unit);
	// }

	// const setRowHandler = row => {
	// 	$(row).change(function(e) {
	// 		getRowResult(row, getRowData(row));
	// 	});
	// };

	// // CHECK XEM USER ĐÃ NHẬP ĐỦ DATA CHƯA
	// const checkAllTableInputField = () => {
	// 	let field = true;

	// 	Array.from(document.querySelectorAll('.tableForm input')).forEach(item => {
	// 		if (!item.value) {
	// 			field = false
	// 		}
	// 	})

	// 	return field;
	// }

	// // THÊM HÀNG
	// const addRow = () => {
	// 	$('.add').click(function(e) {
	// 		if (checkAllTableInputField()) {
	// 			// BIẾN ĐẠI DIỆN CHO HÀNG ĐƯỢC IN RA (  => newRow)
	// 			const newRow = $('.tableForm').clone(true)
	// 			// DISABLED ALL INPUT (NEW)
	// 			$(newRow).find('input, select').attr('disabled', 'disabled')
	// 			// THÊM ROW KHI BẤM NÚT CỘNG
	// 			setRowHandler(newRow);
	// 			$('.form-table-wrapper').append(newRow)
	// 			console.log('add');
	// 		}
	// 	});
	// }

	// // UPDATE DATA KHI USER THAY ĐỔI
	// const UpdateDataEveryTableChange = () => {
	// 	// Set list data to hidden textarea

	// 	let allData = []
	// 	for (let i = getAllRow().length - 1; i >= 0; i--) {
	// 		const row = getAllRow()[i];
	// 		allData.push(getRowData(getAllRow()[i]))
	// 	}
	// 	console.log(allData);
	// };


	// // GỌI CÁC HÀM RA ĐỂ XỬ LÝ
	// (() => {
	// 	if ($('.tableForm')) {
	// 		getAllRow().forEach(row => {
	// 			setRowHandler(row);
	// 		});

	// 		$('.tableForm').change(function(e) {
	// 			UpdateDataEveryTableChange();
	// 		});
	// 	}
	// })();
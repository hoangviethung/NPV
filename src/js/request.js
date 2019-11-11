function RequestForm() {

	let i = 0;

	$('body').on('click', '.tac-vu .add', function() {

		// Giá trị Type Container
		let TypeContainer = $('.tableForm').eq(0).find('.TypeContainer option:selected').val();
		let nameTypeContainer = 'containers[' + i + '].TypeContainer';

		// Giá trị ContainerNo
		let ContainerNo = $('.tableForm').eq(0).find('.ContainerNo input').val();
		let nameContainerNo = 'containers[' + i + '].ContainerNo';

		// Giá trị SealNo
		let SealNo = $('.tableForm').eq(0).find('.SealNo input').val();
		let nameSealNo = 'containers[' + i + '].SealNo';

		// Giá trị GW
		let GW = $('.tableForm').eq(0).find('.GW input').val();
		let nameGW = 'containers[' + i + '].GW';

		// Giá trị CBM
		let CBM = $('.tableForm').eq(0).find('.CBM input').val();
		let nameCBM = 'containers[' + i + '].CBM';

		// Giá trị NumberOfPackage
		let NumberOfPackage = $('.tableForm').eq(0).find('.NumberOfPackage input').val();
		let nameNumberOfPackage = 'containers[' + i + '].NumberOfPackage';

		// Giá trị Unit
		let Unit = $('.tableForm').eq(0).find('.Unit option:selected').val();
		let nameUnit = 'containers[' + i + '].Unit';

		// Khi nhập vào nút thêm sẽ copy ra thêm 1 table
		var item_news = $(this).parents('.tableForm');
		item_news.parent().append(item_news.prop('outerHTML'));

		// Giá trị thứ i của containers[i] tăng lên sau mỗi lần click
		i++;

		// Tạo thành Array
		let rowList = Array.from($('.tableForm'));

		// Quăng value đã chọn vào đối tượng mới
		$(rowList[rowList.length - 1]).find('.TypeContainer select').val(TypeContainer);
		$(rowList[rowList.length - 1]).find('.ContainerNo input').val(ContainerNo);
		$(rowList[rowList.length - 1]).find('.SealNo input').val(SealNo);
		$(rowList[rowList.length - 1]).find('.GW input').val(GW);
		$(rowList[rowList.length - 1]).find('.CBM input').val(CBM);
		$(rowList[rowList.length - 1]).find('.NumberOfPackage input').val(NumberOfPackage);
		$(rowList[rowList.length - 1]).find('.Unit select').val(Unit);
		// Thêm Name cho các trường
		$(rowList[rowList.length - 1]).find('.TypeContainer select').attr('name', nameTypeContainer);
		$(rowList[rowList.length - 1]).find('.ContainerNo input').attr('name', nameContainerNo);
		$(rowList[rowList.length - 1]).find('.SealNo input').attr('name', nameSealNo);
		$(rowList[rowList.length - 1]).find('.GW input').attr('name', nameGW);
		$(rowList[rowList.length - 1]).find('.CBM input').attr('name', nameCBM);
		$(rowList[rowList.length - 1]).find('.NumberOfPackage input').attr('name', nameNumberOfPackage);
		$(rowList[rowList.length - 1]).find('.Unit select').attr('name', nameUnit);
	});

	// XÓA ĐỐI TƯỚNG KHI CLICK VÀO
	$('body').on('click', '.tac-vu .delete', function() {
		var item_delete = $(this).parents('.tableForm');
		item_delete.remove();
	});
}

module.exports = RequestForm;
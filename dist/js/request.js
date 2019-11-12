function RequestForm() {

	function getDataRow() {
		// OPTION DATA
		const TypeContainer = $('.TypeContainer').val();
		const Unit = $('.Unit').val();
		// NUMBER DATA
		const SealNo = Number($('.SealNo').val());
		const Gw = Number($('.GW').val());
		const ContainerNo = Number($('.ContainerNo').val());
		const Cbm = Number($('.CBM').val());
		const NumberOfPackage = Number($('.NumberOfPackage').val());
		// DATA IS FULL ???
		const isFull = !!(ContainerNo && Unit && SealNo && Gw && TypeContainer && Cbm && NumberOfPackage);

		return {
			TypeContainer,
			Unit,
			SealNo,
			Gw,
			ContainerNo,
			Cbm,
			NumberOfPackage,
			isFull
		}
	}

	function addRow(cb) {
		$('.add').on('click', function() {
			let rowData = getDataRow();
			if (rowData.isFull) {
				let newRow = $('.tableForm').eq(0).clone(true);
				newRow.find('input, select').attr('disabled', 'disabled');
				$(newRow).find('.TypeContainer').val(rowData.TypeContainer)
				$(newRow).find('.Unit').val(rowData.Unit)
				// RESET DATA
				$('.tableForm').eq(0).find('input').each(function() {
					$(this).val('');
				})
				$('.form-table-wrapper').append(newRow);
			}
			cb();
		});

	}

	function remove(cb) {
		$('.delete').on('click', function() {
			$(this).parents('.tableForm').remove()
			cb();
		});
	}

	function returnJson() {
		var dataJson = [];
		$('.tableForm').each(function(index) {
			if (index !== 0) {
				let item = {
					TypeContainer: $(this).find('.TypeContainer').val(),
					Unit: $(this).find('.Unit').val(),
					SealNo: Number($(this).find('.SealNo').val()),
					Gw: Number($(this).find('.GW').val()),
					ContainerNo: Number($(this).find('.ContainerNo').val()),
					Cbm: Number($(this).find('.CBM').val()),
					NumberOfPackage: Number($(this).find('.NumberOfPackage').val()),
				}
				dataJson.push(item)
			}
		})
		$('.tableFormHidden textarea').val(JSON.stringify(dataJson));
	}

	// Run here
	addRow(returnJson);
	remove(returnJson);
}

module.exports = RequestForm;
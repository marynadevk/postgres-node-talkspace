export const GenderCheckbox = () => {
	return (
		<div className='flex p-2'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-base-100'>Male</span>
					<input type='checkbox' className='checkbox border-green-200' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-base-100'>Female</span>
					<input type='checkbox' className='checkbox border-green-200' />
				</label>
			</div>
		</div>
	);
};

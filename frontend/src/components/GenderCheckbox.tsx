import { EGender } from './sidebar/enums/EGender';

type Props = {
  selectedGender: string;
	onCheckboxChange: (gender: string) => void;
}

export const GenderCheckbox: React.FC<Props> = ({ selectedGender, onCheckboxChange }) => {
	return (
<div className='flex p-2'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-green-200' 
						checked={selectedGender === EGender.male}
						onChange={() => onCheckboxChange(EGender.male)}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-green-200' 
						checked={selectedGender === EGender.female}
						onChange={() => onCheckboxChange(EGender.female)}
					/>
				</label>
			</div>
		</div>
	);
};

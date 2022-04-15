import React from 'react';
import CheckBox from './CheckBox';

const Formallergens = ({handleCheckBox, filterBy}) => {
    const allergensArr = ["gluten", "milk", "vegetarian", "caca"]

    const isChecked = (el) => { return filterBy.includes(el) }

    return (
        <form>
            {allergensArr.map((el, index )=> {
                return (
                    <CheckBox key={index} 
                    name={el} 
                    handleCheckBox={handleCheckBox} 
                    checked={isChecked(el)}
                    />
                )
            })}
        </form>
    );
}

export default Formallergens;

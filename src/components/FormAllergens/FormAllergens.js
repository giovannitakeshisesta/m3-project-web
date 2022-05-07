import React from 'react';
import CheckBox from './CheckBox';

const Formallergens = ({handleCheckBox, filterBy}) => {
    const allergensArr = ["Vegetarian", "Vegan", "Gluten","Crustaceans","Eggs","Fish","Peanuts","Soybeans","Milk","Nuts","Celery","Mustard","Sesame seeds","Sulphites","Lupin","None"]
    const isChecked = (el) => { return filterBy.includes(el) }

    return (
        <div className='formAllergensMainDiv'>
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
        </div>
    );
}

export default Formallergens;

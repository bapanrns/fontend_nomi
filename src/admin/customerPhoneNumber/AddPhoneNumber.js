import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axiosInstance from '../../components/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/css/phoneNumber.css'

const AddPhoneNumber = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [mobileNumbers, setMobileNumbers] = useState(['']); // State to manage mobile numbers
    const [mobileNumbersError, setMobileNumbersError] = useState(['']); // State to manage mobile numbers
    const [duplicatesNumber, setDuplicatesNumber] = useState([]); 

    // Function to handle changes in mobile number inputs
    const handleMobileNumberChange = (index, value) => {
        const newMobileNumbers = [...mobileNumbers];
        newMobileNumbers[index] = value;
        setMobileNumbers(newMobileNumbers);
    };

    // Function to add a new row
    const handleAddRow = () => {
        setMobileNumbers([...mobileNumbers, '']);
    };

    // Function to remove a row
    const handleRemoveRow = (index) => {
        const newMobileNumbers = [...mobileNumbers];
        newMobileNumbers.splice(index, 1);
        setMobileNumbers(newMobileNumbers);
    };

    // Render each row dynamically
    const renderMobileNumberInputs = () => {
        return mobileNumbers.map((number, index) => (
            <div className="col-md-12 phoneNoDiv" key={index}>
                <div className="col-md-3 inputDiv" key={index}>
                    <input
                        type="text"
                        className="form-control"
                        value={number}
                        onChange={(e) => handleMobileNumberChange(index, e.target.value)}
                        placeholder="Enter mobile number"
                    />
                    {mobileNumbersError.includes(index) && <div className='phoneError'>Please enter a valid mobile number</div>}
                </div>
                
                {
                    index !== 0 &&
                    <button className='btn btn-danger removeBtn' onClick={() => handleRemoveRow(index)}>Remove</button>
                }
            </div>
        ));
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return mobileRegex.test(mobile);
    };

    const mobileNoValidation = () =>{
        const invalidMobiles = mobileNumbers.map((row, index) => ({
            mobileNumber: row,
            index: index,
        })).filter(item => !validateMobile(item.mobileNumber));
    
        const invalidMobileIndices = invalidMobiles.map(item => item.index);
        setMobileNumbersError(invalidMobileIndices);
        if(invalidMobileIndices.length > 0){
            return false;
        }else{
            return true;
        }
    }

    const addMobileNoFn = () => {
        setDuplicatesNumber([]);
        if(mobileNoValidation()){

            let jsonData = {}
            if (localStorage.hasOwnProperty('ioc')) {
                const encodedData = localStorage.getItem('ioc');
                jsonData = JSON.parse(window.atob(encodedData));
            }

            const formattedMobileNumbers = mobileNumbers.map(number => {
                const formattedNumber = number.replace(/^\+91/, '');
                return formattedNumber.slice(-10);
            });

            let data = {user_id: jsonData.user_id, mobileNumbers: formattedMobileNumbers};
            setIsLoading(true);
            axiosInstance.post('/addMobileNumbre', {data})
            .then((response) => {
                setIsLoading(false);
                setDuplicatesNumber(response.data.duplicates);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            })

        }
    }

    return (
        <>
            <div className='addNewAddress' style={{padding: '10px'}}>
                {duplicatesNumber.length > 0 &&
                <div className='duplicatesNumber'>Duplicate No: {duplicatesNumber.join(', ')}</div>
                }
                {renderMobileNumberInputs()}

                <div className="mb-12 phoneNoDiv" style={{clear: 'both'}}>
                    <div className="col-md-3 inputNewNoDiv">
                        <button type="button" className="btn btn-primary addBtn" onClick={handleAddRow} style={{float: 'right'}}>+ Add</button>
                    </div>
                    
                </div>
                
                <div className="mb-3 formValidation">
                    <button type="submit" className="signupButton btn btn-primary" onClick={addMobileNoFn}>Save Number</button>
                </div>
            </div>
        </>
    )
}

export default AddPhoneNumber;

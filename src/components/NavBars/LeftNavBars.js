import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import global from "../../components/global";

import Accordion from 'react-bootstrap/Accordion';
import '../../components/css/leftNavBars.css';

const LeftNavBars = (props) => {
    const { itemType, subCatId } = props;
    console.log("subCatId:", subCatId);
    useEffect(() => {
        getFabricDetails();
        getItemsList(itemType);
        ///console.log(localStorage);
        setSelectedItemsForType([...selectedItemsForType, subCatId.toString()]);
    }, []);

    /* ============================ Fabric Start ============================ */
    function getFabricDetails(){
        //setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post(global["axios_url"]+'/fetchFabric', data, {
            headers: headers
        })
        .then((response) => {
            setCheckboxOptionsFabric(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    const [searchTermForFabric, setSearchTermForFabric] = useState('');
    const handleSearchChangeForFabric = (event) => {
        setSearchTermForFabric(event.target.value);
    };
    const [selectedItemsForFabric, setSelectedItemsForFabric] = useState([]);

    const handleCheckboxChangeForFabric = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForFabric([...selectedItemsForFabric, value]);
        } else {
            setSelectedItemsForFabric(selectedItemsForFabric.filter((item) => item !== value));
        }
        props.getFilterHash("fabric", checked, value);
    };

    const [checkboxOptionsFabric, setCheckboxOptionsFabric] = useState([]);
     // Filter the checkbox options based on the search term
    const filteredOptionsForFabric = checkboxOptionsFabric.filter((option) =>
        option.label.toLowerCase().includes(searchTermForFabric.toLowerCase())
    );
    /* ============================ Fabric End ============================ */

    /* ================================= Color end ================================= */

    const [searchTermForColor, setSearchTermForColor] = useState('');
    const handleSearchChangeForColor = (event) => {
        setSearchTermForColor(event.target.value);
    };
    const [selectedItemsForColor, setSelectedItemsForColor] = useState([]);

    const handleCheckboxChangeForColor = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForColor([...selectedItemsForColor, value]);
        } else {
            setSelectedItemsForColor(selectedItemsForColor.filter((item) => item !== value));
        }
        props.getFilterHash("color", checked, value);
    };

    const [checkboxOptionsColor, setCheckboxOptionsColor] = useState(global["color"]);
     // Filter the checkbox options based on the search term
    const filteredOptionsForColor = checkboxOptionsColor.filter((option) =>
        option.label.toLowerCase().includes(searchTermForColor.toLowerCase())
    );

    /* ================================= Color end ================================= */

    /* ================================= Price option start ======================== */
    const [priceOption, setPriceOption] = useState(global["priceOptionForWomen"]);

    const [selectedItemsForPrice, setSelectedItemsForPrice] = useState([]);

    const handleCheckboxChangeForPrice = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForPrice([...selectedItemsForPrice, value]);
            console.log("value", value);
        } else {
            setSelectedItemsForPrice(selectedItemsForPrice.filter((item) => item !== value));
        }
        props.getFilterHash("price", checked, value);
        console.log(selectedItemsForPrice);
    };
    /* ================================= Price option end ======================== */
    
    /* ================================= Occassion start ======================== */
    const [occassionOption, setOccassionOption] = useState(global["occassion"]);

    const [selectedItemsForOccassion, setSelectedItemsForOccassion] = useState([]);

    const handleCheckboxChangeForOccassion = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForOccassion([...selectedItemsForOccassion, value]);
        } else {
            setSelectedItemsForOccassion(selectedItemsForOccassion.filter((item) => item !== value));
        }
        props.getFilterHash("occassion", checked, value);
    };
    /* ================================= Occassion option end ======================== */
    
    /* ================================= Care Instruction start ======================== */
    const [careInstructionOption, setCareInstructionOption] = useState(global["careInstruction"]);

    const [selectedItemsForCareInstruction, setSelectedItemsForCareInstruction] = useState([]);

    const handleCheckboxChangeForCareInstruction = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForCareInstruction([...selectedItemsForCareInstruction, value]);
        } else {
            setSelectedItemsForCareInstruction(selectedItemsForCareInstruction.filter((item) => item !== value));
        }
        props.getFilterHash("careInstruction", checked, value);
    };
    /* ================================= Care Instruction option end ======================== */

    /* ================================= item type end ========================  */
    const [checkboxOptionsType, setCheckboxOptionsType] = useState([]);
    function getItemsList(items){
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {items: items};
        axios.post(global["axios_url"]+'/fetchItemTypeList', data, {
            headers: headers
        })
        .then((response) => {
            setCheckboxOptionsType(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    const [searchTermForType, setSearchTermForType] = useState('');
    const handleSearchChangeForType = (event) => {
        setSearchTermForType(event.target.value);
    };

    const [selectedItemsForType, setSelectedItemsForType] = useState([]);

    const handleCheckboxChangeForType = (event) => {
        const { value, checked } = event.target;
        
        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItemsForType([...selectedItemsForType, value.toString()]);
        } else {
            setSelectedItemsForType(selectedItemsForType.filter((item) => item !== value.toString()));
        }
        props.getFilterHash("type", checked, value);
    };

    
     // Filter the checkbox options based on the search term
    const filteredOptionsForType = checkboxOptionsType.filter((option) =>
        option.label.toLowerCase().includes(searchTermForType.toLowerCase())
    );
    /* ================================= item type end ========================  */
    /* ================================= Discount end ========================  */
    const handlChangeForDiscount = (event) => {
        const { value, checked } = event.target;
        props.getFilterHash("discount", false, value);
    }
    /* ================================= Discount end ========================  */
        return (
            <Accordion defaultActiveKey={['1']} className='leftNavBarsForItems'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Fabric</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        <Form.Group className='search-container'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchTermForFabric}
                                onChange={handleSearchChangeForFabric}
                            />
                        </Form.Group>

                        {filteredOptionsForFabric.map((option) => (
                            <Form.Check
                                key={option.id}
                                type="checkbox"
                                id={`checkbox-${option.id}`}
                                label={option.label}
                                value={option.id}
                                checked={selectedItemsForFabric.includes(option.id.toString())}
                                onChange={handleCheckboxChangeForFabric}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Type</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        <Form.Group className='search-container'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className='search-input'
                                value={searchTermForType}
                                onChange={handleSearchChangeForType}
                            />
                        </Form.Group>
                        {filteredOptionsForType.map((option, key) => (
                            <Form.Check
                                key={"type"+key}
                                type="checkbox"
                                id={`checkbox-type-${key}`}
                                label={option.label}
                                value={option.id}
                                checked={selectedItemsForType.includes(option.id.toString())}
                                onChange={handleCheckboxChangeForType}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        {priceOption.map((option) => (
                            <Form.Check
                                key={"price"+option.price}
                                type="checkbox"
                                id={`checkbox-price-${option.price}`}
                                label={option.label}
                                value={option.price}
                                checked={selectedItemsForPrice.includes(option.price)}
                                onChange={handleCheckboxChangeForPrice}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Occassion</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        {occassionOption.map((option, key) => (
                            <Form.Check
                                key={"occassion"+key}
                                type="checkbox"
                                id={`checkbox-occassion-${key}`}
                                label={option.label}
                                value={option.value}
                                checked={selectedItemsForOccassion.includes(option.value)}
                                onChange={handleCheckboxChangeForOccassion}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        <Form.Group className='search-container'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className='search-input'
                                value={searchTermForColor}
                                onChange={handleSearchChangeForColor}
                            />
                        </Form.Group>

                        {filteredOptionsForColor.map((option) => (
                            <div className='colorPanel' key={option.code}>
                                <Form.Check
                                    type="checkbox"
                                    id={`checkbox-color-${option.code}`}
                                    label={option.label}
                                    value={option.label}
                                    checked={selectedItemsForColor.includes(option.label)}
                                    onChange={handleCheckboxChangeForColor}
                                />
                                <span  className='colorSpan' style={{background: option.code}}></span>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Care Instructions</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        {careInstructionOption.map((option, key) => (
                            <Form.Check
                                key={"careInstruction"+key}
                                type="checkbox"
                                id={`checkbox-careInstruction-${key}`}
                                label={option.label}
                                value={option.value}
                                checked={selectedItemsForCareInstruction.includes(option.value)}
                                onChange={handleCheckboxChangeForCareInstruction}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>Discount</Accordion.Header>
                    <Accordion.Body className='accordionBody'>
                        {[10, 20, 30, 40, 50, 60, 70].map((option, key) => (
                            <div className="form-check" key={"discount"+key}>
                                <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="color"
                                    value={option}
                                    onChange={handlChangeForDiscount}
                                    />
                                {option} % Discount</label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
}

export default LeftNavBars

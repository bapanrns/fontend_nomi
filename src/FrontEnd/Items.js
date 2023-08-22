import React, { useEffect, useState } from 'react'
import {Container, Row, Col, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/css/home.css';
import axios from "axios";
import Loader from '../components/Loader'
import global from "../components/global";
import SubNavBars from '../components/SubNavBars';

import LeftNavBars from '../components/NavBars/LeftNavBars';


import {
    useNavigate,
    useParams
} from "react-router-dom";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    

    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("../product-details/"+id);
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        // Update the selected items based on checkbox state
        if (checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getFilterOption = (items="", searchFor="", search="") =>{
        console.log('getFilterOption');
    }

    let subCatId = "";
    if (localStorage.hasOwnProperty('searchTermForType')) {
        subCatId = localStorage.getItem('searchTermForType');
    }
    const [filterHash, setfilterHash] = useState({
        fabric: [],
        color: [],
        price: [],
        occassion: [],
        careInstruction: [],
        type: [subCatId],
        discount: [],
        serchFor: useParams()['id']
    });

    /** Collect filter hash from leftNavBar js */
    const getFilterHash = (type, checked, value) =>{
        console.log("getFilterHash", type, checked, value);
        if(type === "discount"){
            setfilterHash({...filterHash, [type]: [value]});
        }else{
            let innerArray = filterHash[type];
            if(checked){
                innerArray.push(value);
                setfilterHash({...filterHash, [type]: innerArray});
            }else{
                innerArray = filterHash[type].filter((item) => item !== value);
                setfilterHash({...filterHash, [type]: innerArray});
            }
        }
        //console.log(filterHash);
    }
    const [itemsListArray, setItemsListArray] = useState([]);
    const getItemsDetails = () => {
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = filterHash;
        axios.post(global["axios_url"]+'/getItemsList', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data);
            setItemsListArray(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }
    
    useEffect(() => {
        getItemsDetails();
    }, [filterHash]);

    const parameter = useParams();

        return (
            <div>
                {isLoading ? <Loader /> : ""}
                <SubNavBars getFilterOption={getFilterOption} parameter={parameter.id} />
                
                <Container className='HomeContainer'>
                    <Row>
                        <Col xs={6} md={2} style={{/*height: '1500px'*/}}>
                            <LeftNavBars itemType={parameter.id} getFilterHash={getFilterHash} subCatId={subCatId} />
                        </Col>
                        <Col xs={12} md={10}>
                            <Row>
                                {itemsListArray.map((object, key) => (
                                    <Col md={3} key={"list"+key}>
                                        <div className='sareeList'>
                                            <div className='product'>
                                                <Image className='saree'
                                                    src={require(`../images/product/${object.image_name}`)} 
                                                    onClick={(e) => { 
                                                        productDetailsFn(object.items_id)
                                                    }}
                                                />
                                            </div>
                                            <div className='productDesc' title={object.product_name}>{object.product_name} </div>
                                            <div className='productDesc' title={object.company_name}>{object.company_name} </div>  
                                            <div className='productPrice'>
                                                <span className='offerPrice'>₹{object.price}</span>
                                                <span className='actualPrice'>₹{object.offerPrice}</span>
                                                <span className='offerPercentage'>{object.product_offer_percentage}% OFF</span>
                                            </div>       
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    
}

export default Home
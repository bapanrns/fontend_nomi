import React, { useState, useEffect } from 'react'
import './css/SubNavBars.css';
import {
    useNavigate
} from "react-router-dom";

const SubNavBars = (props) => {
    const navigate = useNavigate();

    const { parameter } = props;
    console.log("parameter"+parameter);

   /* const props.getFilterOption = (items="", searchFor="", search="") =>{
        const searchHash = {
            items: items,
            searchFor: searchFor,
            search: search
        }
        localStorage.setItem("search", JSON.stringify(searchHash));
        console.log('===', searchHash);
        navigate("items/"+items);
    }*/

    useEffect(() => {
        console.log("========");
        console.log(props['getFilterOption']['name']);
    }, []);
    return (<>
        <nav className="navbar navbar-expand-md navbar-light bg-light subNavBar768">
            {/*<span className="navbar-brand pb-2" style={{paddingLeft: '12px'}}>BsKart</span>*/}
            {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>*/}
            <div className="collapse navbar-collapse mobileTopMenuCollaps" id="navbarNavDropdown">
                <ul className="navbar-nav mobileTopMenu">
                   {/* <li className="nav-item">
                        <span className="nav-link dropdown-toggle menuLink">Sarees</span>
                        <div className='dropdown-div dropdown-menu' style={{padding: '0px'}}>
                            <ul style={{float: 'left', background: '#e6f6f9', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={() => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "all sarees")
                                        }}
                                    >All Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "silk")
                                        }}>Silk Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "chiffon")
                                        }}>Chiffon Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "cotton")
                                        }}>Cotton Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "georgette")
                                        }}>Georgette Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "linen")
                                        }}>Linen Sarees</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "fabrics", 
                                                "Velvet")
                                        }}>Velvet Sarees</span>
                                </li>
                            </ul>
                            <ul style={{float: 'left'}}>
                                <li><span className='dropdown-item' onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "subcategory", 
                                                "Banarasi")
                                        }}>Banarasi</span></li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "subcategory", 
                                                "Baluchari")
                                        }}>Baluchari</span></li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "subcategory", 
                                                "Jaal")
                                        }}>Jaal</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "subcategory", 
                                                "Jamdani")
                                        }}>Jamdani</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "subcategory", 
                                                "Kanchipuram")
                                        }}>Kanchipuram</span>
                                </li>
                            </ul>
                            <ul style={{float: 'left', background: '#e6f6f9', borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}}>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "price", 
                                                "0-450")
                                        }}>Under ₹450</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "price", 
                                                "450-750")
                                        }}>₹450 - ₹750</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "price", 
                                                "750-1000")
                                        }}>₹750 - ₹1,000</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "price", 
                                                "1000-1500")
                                        }}>₹1,000 - ₹1,500</span>
                                </li>
                                <li>
                                    <span 
                                        className='dropdown-item' 
                                        onClick={(e) => { 
                                            props.getFilterOption("saree", 
                                                "price", 
                                                "1500")
                                        }}>Over ₹1,500</span>
                                </li>
                            </ul>
                        </div>
                    </li>*/}
                    <li 
                        className="nav-item menuLink" 
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("saree")
                        }}
                        >
                        <span className="nav-link">Saree</span>
                    </li>
                    <li className="nav-item menuLink"
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("kurti")
                        }}
                        >
                        <span className="nav-link">Kurti</span>
                    </li>
                    
                    <li className="nav-item menuLink"
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("gown")
                        }}>
                        <span className="nav-link" >Gown</span>
                    </li>
                    <li className="nav-item menuLink"
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("palozzos")
                        }}
                        >
                        <span className="nav-link" >Palazzos</span>
                    </li>
                    <li className="nav-item menuLink"
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("kurta sets & Salwar suits")
                        }}
                        >
                        <span className="nav-link" >Kurta Sets & Salwar Suits</span>
                    </li>
                    <li className="nav-item menuLink"
                        onClick={(e) => { 
                            props.SubNavBarsUrlChange("jewellery")
                        }}
                    >
                        <span className="nav-link" >Jewellery</span>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container MoSubCatContainerScrollable">
            <div className="row">
                <div className="col-12">
                    <div
                        className="scrollable-div MoSubCatScrollable"
                        style={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        }}
                    >
                        {/* Content inside the scrollable div */}
                        
                        <div 
                            className="d-inline-block px-3 MoSubCat" 
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("saree")
                            }}
                            >
                            Saree
                        </div>
                        <div className="d-inline-block px-3 MoSubCat"
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("kurti")
                            }}
                            >
                            Kurti
                        </div>
                        
                        <div className="d-inline-block px-3 MoSubCat"
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("gown")
                            }}>
                            Gown
                        </div>
                        <div className="d-inline-block px-3 MoSubCat"
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("palozzos")
                            }}
                            >
                            Palazzos
                        </div>
                        <div className="d-inline-block px-3 MoSubCat"
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("kurta sets & Salwar suits")
                            }}
                            >
                            Kurta Sets & Salwar Suits
                        </div>
                        <div className="d-inline-block px-3 MoSubCat"
                            onClick={(e) => { 
                                props.SubNavBarsUrlChange("jewellery")
                            }}
                        >
                            Jewellery
                        </div>
                        {/* Add more items as needed */}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SubNavBars
import React, { useEffect } from 'react'
import { useState } from 'react';
import './SideMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router';
import axios from 'axios';
import Select from 'react-select';

function FoodFront() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCuisine, setSelectedCuisine] = useState(null);

    const initialValue = {
        categorydata: [],
        searched: false,
        firstLetter: '',
        categorysearchdata: [],
        foodcountry: [],
        basedOnCategory: [],
        categoryname: '',
        categoryClicked: false,
        homeclick: true,
        addcartproduct: [],
        addclick: false
    }

    const [datas, setdatas] = useState(initialValue)
    const randomSubtraction = 50000;


    const cuisines = [
        { value: 'American', label: 'American Cuisine' },
        { value: 'British', label: 'British Cuisine' },
        { value: 'Canadian', label: 'Canadian Cuisine' },
        { value: 'Chinese', label: 'Chinese Cuisine' },
        { value: 'Croatian', label: 'Croatian Cuisine' },
        { value: 'Dutch', label: 'Dutch Cuisine' },
        { value: 'Egyptian', label: 'Egyptian Cuisine' },
        { value: 'Filipino', label: 'Filipino Cuisine' },
        { value: 'French', label: 'French Cuisine' },
        { value: 'Greek', label: 'Greek Cuisine' },
        { value: 'Indian', label: 'Indian Cuisine' },
        { value: 'Irish', label: 'Irish Cuisine' },
        { value: 'Italian', label: 'Italian Cuisine' },
        { value: 'Japanese', label: 'Japanese Cuisine' },
        { value: 'Kenyan', label: 'Kenyan Cuisine' },
        { value: 'Malaysian', label: 'Malaysian Cuisine' },
        { value: 'Mexican', label: 'Mexican Cuisine' },
        { value: 'Moroccan', label: 'Moroccan Cuisine' },
        { value: 'Polish', label: 'Polish Cuisine' },
        { value: 'Portuguese', label: 'Portuguese Cuisine' },
        { value: 'Russian', label: 'Russian Cuisine' },
        { value: 'Spanish', label: 'Spanish Cuisine' },
        { value: 'Thai', label: 'Thai Cuisine' },
        { value: 'Tunisian', label: 'Tunisian Cuisine' },
        { value: 'Turkish', label: 'Turkish Cuisine' },
        { value: 'Vietnamese', label: 'Vietnamese Cuisine' },
        { value: 'Unknown', label: 'Unknown Cuisine' },
    ];



    const name = useLocation()
    const navigate = useNavigate();

    const handleFilterClick = () => {
        setFilterVisible(!isFilterVisible);

    };

    const logout = () => {
        navigate('/')
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event) => {
        const firstchar = event.target.value;
        setdatas((prev) => ({
            ...prev, firstLetter: firstchar
        }))

    };

    const searchs = () => {
        if (datas.firstLetter) {
            setdatas((prev) => ({
                ...prev, searched: true,addclick:false
            }))
        }

        setSelectedCuisine(null);

    }

    const handleCuisineSelect = (selectedOption) => {
        setSelectedCuisine(selectedOption.value);
        setFilterVisible(false);

    };

    const handleBoxClick = (name) => {
        setdatas((prev) => ({
            ...prev, categoryname: name, categoryClicked: true, homeclick: false, searched: false
        }))

    };

    const homeChange = () => {
        setdatas((prev) => ({
            ...prev, homeclick: true, categoryClicked: false, addclick: false
        }))
    }

    const addCart = (price, image, name) => {
        const newCartProduct = [...datas.addcartproduct, { price, image, name, count: 1 }];
        setdatas((prev) => ({
            ...prev, addcartproduct: newCartProduct
        }))
    }

    const showaddcart = () => {
        setdatas((prev) => ({
            ...prev, addclick: true, homeclick: false, categoryClicked: false,searched:false
        }))
        setSelectedCuisine(null)
    }

    const decre = (index) => {
        const newCartProduct = [...datas.addcartproduct];
        if (newCartProduct[index].count > 1) {
            newCartProduct[index].count -= 1;
            setdatas({ ...datas, addcartproduct: newCartProduct });
        }
    }

    const increment = (index) => {

        const newCartProduct = [...datas.addcartproduct];
        newCartProduct[index].count += 1;
        console.log(newCartProduct[index].count)
        setdatas({ ...datas, addcartproduct: newCartProduct });

    }

    const cancelorder = (index) => {
        const newCartProduct = [...datas.addcartproduct];
        newCartProduct.splice(index, 1);
        setdatas({ ...datas, addcartproduct: newCartProduct });
    }

    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(res => { const responsedata = Array.isArray(res?.data?.categories) ? res?.data?.categories : []; setdatas((prev) => ({ ...prev, categorydata: responsedata })) })
            .catch(err => console.log(err))

        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${datas.firstLetter}`)
            .then(res => {console.log(res); const responsedata = Array.isArray(res?.data?.meals) ? res?.data?.meals : []; setdatas((prev) => ({ ...prev, categorysearchdata: responsedata })) })
            .catch(err => console.log(err))

        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`)
            .then(res => { const responsedata = Array.isArray(res?.data?.meals) ? res?.data?.meals : []; setdatas((prev) => ({ ...prev, foodcountry: responsedata })) })
            .catch(err => console.log(err))

        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${datas.categoryname}`)
            .then(res => { const responsedata = Array.isArray(res?.data?.meals) ? res?.data?.meals : []; setdatas((prev) => ({ ...prev, basedOnCategory: responsedata })) })
            .catch(err => console.log(err))


        if (datas.firstLetter === '' || selectedCuisine) {
            setdatas((prev) => ({
                ...prev, searched: false
            }))
        }
    }, [datas.firstLetter, selectedCuisine, datas.categoryname])


    return (
        <div>
            <div className="heading">
                <div>
                    <span className="menu-icon" onClick={toggleMenu}>☰</span>
                    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                        <span className="menu-icon-1" onClick={toggleMenu}>✕</span>
                        <ul>
                            <li>Drinks</li>
                            <li>Veg</li>
                            <li>Non-Veg</li>
                            <li style={{ borderBottom: 'none' }}>
                                <p className='logout' onClick={logout}>
                                    Logout
                                </p>
                                <img onClick={logout} width="20" className='logout-1' height="20" src="https://img.icons8.com/fluency-systems-regular/20/exit--v1.png" alt="logout" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='cmpyname'>🍽️TNBP</div>
                <div className='image-name'>
                    <Avatar
                        name={name.state}
                        round={true}
                        size="35"
                        className='round-image'
                    />    {name.state}
                </div>

                <p className='addcarts' onClick={showaddcart}>Add to Cart</p>

            </div>
            <div className='hearder_image' >
                <div className='search-icons'>
                    <input type='text' placeholder='Search recipies here  ...' className='search-inputs' onChange={handleInputChange}>
                    </input>
                    <img className='filter-icons' width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/sorting-options.png" alt="filter-icons" onClick={handleFilterClick} />
                    {isFilterVisible && (
                        <Select
                            options={cuisines}
                            value={selectedCuisine}
                            onChange={handleCuisineSelect}
                            placeholder="Select a cuisine"
                            className='filter-select'
                        />
                    )}
                    <p className='search-fa'> <FontAwesomeIcon icon={faSearch} onClick={searchs} /></p>
                </div>
                <p className='fa-below'>What are your favorite cuisines?</p>
                <p className='fa-below-1'>PERSONALIZE YOUR EXPERIENCE</p>
            </div>
            {
                selectedCuisine ? <div className='category-heading'>
                    <p className='category-name'>Meals Based On {selectedCuisine}</p>
                    <p className='category-name-below'></p>
                    <div className='category-diplay'>
                        {datas.foodcountry?.map((item, index) => (
                            <div key={index} className="box" >
                                <img src={item.strMealThumb} alt={item.strMeal} className="box-image" />
                                <div className="box-content" >
                                    <h3 className="box-title">{item.strMeal}</h3>
                                </div>
                                <p style={{ marginLeft: '10px', color: 'black' }}>₹ {item.idMeal - randomSubtraction}<span className='addtocartpro' onClick={() => addCart(item.idMeal - randomSubtraction, item.strMealThumb, item.strMeal)}>Add to cart</span></p>
                            </div>
                        ))}
                    </div>
                </div> : <div></div>
            }

            {
                datas.searched ? <div className='category-heading'>
                    <p className='category-name'>meals</p>
                    <p className='category-name-below'></p>
                    <div className='category-diplay'>
                        {datas.categorysearchdata?.map((item, index) => (
                            <div key={index} className="box">
                                <img src={item.strMealThumb} alt={item.strCategory} className="box-image" />
                                <div className="box-content">
                                    <h3 className="box-title">{item.strCategory}</h3>
                                </div>
                                <p style={{ marginLeft: '10px', color: 'black' }}>₹ {item.idMeal - randomSubtraction}<span className='addtocartpro' onClick={() => addCart(item.idMeal - randomSubtraction, item.strMealThumb, item.strMeal)}>Add to cart</span></p>
                            </div>
                        ))}
                    </div>
                </div> : <div></div>
            }
            {
                datas.homeclick ?
                    <div className='category-heading'>
                        <p className='category-name'>CATEGORIES</p>
                        <p className='category-name-below'></p>
                        <div className='category-diplay'>
                            {datas.categorydata?.map((item, index) => (
                                <div key={index} className="box" onClick={() => handleBoxClick(item.strCategory)}>
                                    <img src={item.strCategoryThumb} alt={item.strCategory} className="box-image" />
                                    <div className="box-content">
                                        <h3 className="box-title">{item.strCategory}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> : <div></div>
            }
            {
                datas.categoryClicked ? <div className='category-heading'>
                    <img className='home-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nO3TMUoDQRQG4M80ok3Awl4bvYFVeqts5REsbVPbCLbeQRG2yCFSBI+QxgNY2BisEtiw8AbWZV3jriCCD34Y5s18xRuGX6qjyI/UOd7wjnFf7BIrFJE1rrpAO7iuQPXcYbAttovHFixlir2vsAPMtsBSnnD4GXaMxTewlGec1LEzvHTAisgrRgkbYtkDKyLLsD5U3gHK2x6lCZzHfh7r3uBFpV+u/0GtM3xomFFW6WcN/fs28BQ3uI1Mav91P/ZSvzxb3vlDtQFfyKNgQZ1oBQAAAABJRU5ErkJggg==" alt='home-icon' onClick={homeChange} />
                    <span style={{ color: 'black', marginLeft: '5px', fontWeight: 'bold', cursor: "pointer" }} onClick={homeChange}>Home</span>
                    <p className='category-name'>
                        {datas.categoryname}</p>
                    <p className='category-name-below'></p>
                    <div className='category-diplay'>
                        {datas.basedOnCategory?.map((item, index) => (
                            <div key={index} className="box">
                                <img src={item.strMealThumb} alt={item.strMeal} className="box-image" />
                                <div className="box-content">
                                    <h3 className="box-title">{item.strMeal}</h3>
                                </div>
                                <p style={{ marginLeft: '10px', color: 'black' }}>₹ {item.idMeal - randomSubtraction}<span className='addtocartpro'  onClick={() => addCart(item.idMeal - randomSubtraction, item.strMealThumb, item.strMeal)}>Add to cart</span></p>
                            </div>
                        ))}
                    </div>
                </div> : <div></div>
            }

            {
                datas.addclick ?
                    <>
                        <div className='category-heading'>
                            <img className='home-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nO3TMUoDQRQG4M80ok3Awl4bvYFVeqts5REsbVPbCLbeQRG2yCFSBI+QxgNY2BisEtiw8AbWZV3jriCCD34Y5s18xRuGX6qjyI/UOd7wjnFf7BIrFJE1rrpAO7iuQPXcYbAttovHFixlir2vsAPMtsBSnnD4GXaMxTewlGec1LEzvHTAisgrRgkbYtkDKyLLsD5U3gHK2x6lCZzHfh7r3uBFpV+u/0GtM3xomFFW6WcN/fs28BQ3uI1Mav91P/ZSvzxb3vlDtQFfyKNgQZ1oBQAAAABJRU5ErkJggg==" alt='home-icon' onClick={homeChange} />
                            <span style={{ color: 'black', marginLeft: '5px', fontWeight: 'bold', cursor: "pointer" }} onClick={homeChange}>Home</span>
                            <p className='category-name'>Order Now</p>
                            <p className='category-name-below'></p>
                            <div className='category-diplay'>
                                {datas.addcartproduct?.map((item, index) => (
                                    <div key={index} className="box1">
                                        <img src={item.image} alt={item.name} className="box-image" />
                                        <div className="box-content">
                                            <h3 className="box-title">{item.name}</h3>
                                        </div>
                                        <p className='rs' >₹ {item.price * item.count}<span className='dec'  onClick={() => decre(index)}>-</span><span className='cou' >{item.count}</span><span className='inc'  onClick={() => increment(index)}>+</span> <span className='can'  onClick={() => cancelorder(index)}>Cancel</span></p>

                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='category-heading'>
                            <p className='category-name'>Confirm Order</p>
                            <p className='category-name-below'></p>
                            <div className='category-diplay'>
                                <div className="box1" style={{ width: 'fit-content' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas.addcartproduct.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.count}</td>
                                                    <td>{item.price * item.count}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th>Total</th>
                                                <td>=</td>
                                                <td>
                                                    {datas.addcartproduct.reduce((total, item) => total + item.price * item.count, 0)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style={{display:'flex',justifyContent:'flex-end'}}><span style={{  backgroundColor: "#FFA500",padding: "5px"}}>Order Now</span></p>
                                </div>

                            </div>
                        </div>
                    </>
                    : <div></div>
            }




        </div>
    );

}

export default FoodFront

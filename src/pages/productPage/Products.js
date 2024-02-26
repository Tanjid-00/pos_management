/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import style from '../../styles/pages/product/product.module.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num);
        } else {
            return str;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products')
                .then((res) => {
                    if (!res.ok) {
                        throw Error('fetching is not successful');
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    setProducts(data.products);
                    setFilteredProducts(data.products); // Initialize filteredProducts with products

                    console.log(data.products);
                })
                .catch((error) => {
                    console.log('error re vai');
                });
        }, 50);
    }, []);

    return (
        <div id={style.container}>
            <SearchBar className={style.inpField} products={products} setFilteredProducts={setFilteredProducts} />
            <div className={style.products}>
                {filteredProducts.map((product) => {
                    const { id, title, description, discountPercentage, brand, category, price, rating, stock, images } = product;
                    return (
                        <div key={id} className={style.product}>
                            <h4 className={style.title}>{truncateString(title, 15)}</h4>

                            <img className={style.image} src={images[0]} alt="Product demo" />

                            <div className={style.priceRate}>
                                <p>${price}</p>
                                <p>
                                    <span>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    {rating}
                                </p>
                            </div>
                            <Link to={`/singleProduct/${id}`} state={{ id, title, description, brand, category, discountPercentage, price, rating, stock, images }}>
                                Details
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Product;

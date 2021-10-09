import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import './ProductList.css'

export default function ProductList() {

    const [products, setProducts] = useState([])

    const API_KEY = '78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0'

    const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v2/list',
        params: {
          store: 'US',
          offset: '0',
          categoryId: '4209',
          limit: '48',
          country: 'US',
          sort: 'freshness',
          currency: 'USD',
          sizeSchema: 'US',
          lang: 'en-US'
        },
        headers: {
          'x-rapidapi-host': 'asos2.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      }

    

    useEffect(() => {
        // axios.all([axios.get("https://fakestoreapi.com/products/category/women's%20clothing"),
        //             axios.get("https://fakestoreapi.com/products/category/men's%20clothing"),
        //             axios.get("https://fakestoreapi.com/products/category/jewelery")])
        //             .then(axios.spread((res1, res2, res3) => {
        //                 setProducts([...res1.data, ...res2.data, ...res3.data])
        //             }))
        axios.request(options).then((response) => {
            console.log(response.data)
            setProducts(response.data.products)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="product-list">

            <div className="product-list__filter">

                    <select className="filter__item" placeholder="Category" name="category" value="Category">
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                    </select>
                    <select className="filter__item" placeholder="Brand" name="brand" value="Brand">
                        <option value="ASOS">ASOS</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                    </select>
                    <select className="filter__item" placeholder="Brand" name="brand" value="Brand">
                        <option value="ASOS">ASOS</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                    </select>
                    <select className="filter__item" placeholder="Brand" name="brand" value="Brand">
                        <option value="ASOS">ASOS</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                    </select>
                    
            </div>

            <ul className="product-list__list">
                { products && products.map(product =>
                    <ListItem key={product.id} id={product.id} name={product.name} price={product.price.current.text} image={product.imageUrl} />
                )}
            </ul>
        </div>
    )
}

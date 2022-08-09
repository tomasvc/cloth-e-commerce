import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../categorySlice'
import { fetchProductsByCategoryId, updateCategoryId, updateCategoryName } from '../../product/productSlice'

import './styles.css'

export default function Categories() {

    const history = useHistory()

    const dispatch = useDispatch()
    const categories = useSelector(state => {
        console.log(state.categories)
        return state.categories
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        console.log(categories)
    }, [categories])

    const handleSelect = (id, name) => {
        dispatch(fetchProductsByCategoryId({page: 1, category: id}))
        dispatch(updateCategoryId(id))
        dispatch(updateCategoryName(name))
        history.push('/products')
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories?.categories?.items?.map(item => {
                        return <li onClick={() => handleSelect(item.id, item.name)} key={item.id}>{item.name}</li>
                    })
                }
                {/* <li>Sale</li>
                <li>New in</li>
                <li>Clothing</li>
                <li>Dresses</li>
                <li>Shoes</li>
                <li>Sportswear</li>
                <li>Accessories</li>
                <li>Summer</li>
                <li>Trending now</li>
                <li>Topshop</li>
                <li>Face + Body</li>
                <li>Brands</li>
                <li>Outlet</li>
                <li>Marketplace</li> */}
            </ul>
            <div className="category-slide"></div>
        </div>
    )
}

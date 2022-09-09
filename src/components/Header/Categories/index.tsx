import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { fetchCategories } from '../../../slices/categorySlice'
import { fetchProductsByCategoryId, updateCategoryId, updateCategoryName } from '../../../slices/productSlice'

import './styles.css'

export default function Categories() {

    const history = useHistory()

    const dispatch = useDispatch()
    const categories = useSelector((state: RootState) => {
        console.log(state.categories)
        return state.categories
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        console.log(categories)
    }, [categories])

    const handleSelect = (id: string, name: string) => {
        dispatch(fetchProductsByCategoryId({page: 1, category: id}))
        dispatch(updateCategoryId(id))
        dispatch(updateCategoryName(name))
        history.push('/products')
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories?.categories?.map((item: any) => {
                        return <li onClick={() => handleSelect(item.id, item.name)} key={item.id}>{item.name}</li>
                    })
                }
            </ul>
            <div className="category-slide"></div>
        </div>
    )
}

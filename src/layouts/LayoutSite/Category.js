import React, { useEffect, useState } from 'react';
import CategoryServices from '../../services/CategoryServices';
import { Link, useNavigate } from 'react-router-dom';

function Category() {
    const [categories, setCategories] = useState([]);
 

    useEffect(() => {
        CategoryServices.getAll()
            .then(response => {
                setCategories(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const renderSubCategory = parentCategory => {
        const subCategories = categories.filter(category => category.parentId == parentCategory.id);

        if (subCategories.length === 0) {
            return null;
        }

        return (
            <ul>
                {subCategories.map((subCategory, index) => (
                    <li key={index} style={{ borderTop: '1px solid black' }}>
                        <Link to={`/shop/${subCategory.id}`} className={subCategory.parentId !== 0 ? '' : 'sf-with-ul'}>
                            {subCategory.name}
                        </Link>
                        {renderSubCategory(subCategory)}
                    </li>
                ))}
            </ul>
        );
    };

  

    return (
        <div className="dropdown category-dropdown">
            <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
                title="Browse Categories"
            >
                Danh mục
            </a>
            <div className="dropdown-menu">
                <nav className="side-nav">
                    <ul className="menu-vertical sf-arrows">
                        {categories
                            .filter(category => category.parentId == 0)
                            .map((category, index) => (
                                <li key={index}>
                                    <Link  to={`/shop/category/${category.id}`} className={category.parentId == 0 ? '' : 'sf-with-ul'}>
                                        {category.name}
                                    </Link>
                                    {renderSubCategory(category)}
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Category;
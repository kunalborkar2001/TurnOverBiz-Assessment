'use client'

import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { selectedCategory, addSelectedCategory } from "../../APIs/index";

const CategoryPage = () => {
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(6);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    console.log(selectedCategories);
    // Generate mock categories data
    const generateCategoriesData = () => {
        const generatedCategories = [];
        for (let i = 0; i < 100; i++) {
            generatedCategories.push({
                id: i,
                name: faker.commerce.department()
            });
        }
        setCategories(generatedCategories);
    };

    // Check if the user is verified based on the presence of a token
    useEffect(() => {
        setVerifiedUser(token ? true : false);
        generateCategoriesData();
    }, [token]);

    // Fetch selected categories when component mounts and user is verified
    useEffect(() => {

        const getData = async () => {
            try {
                const response = await selectedCategory(token);
                if (response.status == 200) {
                    setSelectedCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching selected categories:', error);
                // Handle the error as needed, such as setting a default value for selected categories
            }
        };
        getData();

    }, []);


    // Logic for pagination
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    // Handle checkbox change
    const handleCheckboxChange = async (categoryName) => {
        const updatedSelectedCategories = selectedCategories.includes(categoryName)
            ? selectedCategories.filter(name => name !== categoryName)
            : [...selectedCategories, categoryName];
        setSelectedCategories(updatedSelectedCategories);
        await addSelectedCategory(token, updatedSelectedCategories);


    };



    return (

        <div className='h-screen flex items-center justify-center'>

            {verifiedUser ? (<div className="min-h-[500px] w-[576px] border rounded-lg flex flex-col items-center pt-[20px] gap-5">
                <h1 className="font-bold text-[1.5rem] mb-2">Please mark your interests!</h1>
                <h1 className="font-light text-[1rem] mb-2">We will keep you notified.</h1>
                {/* Render categories here */}
                <ul className='flex flex-col gap-2'>
                    {currentCategories.map(category => (
                        <li key={category.id}>
                            {/* Render checkbox for each category */}
                            <input
                                type="checkbox"
                                id={`category-${category.id}`} // Set a unique id for each checkbox
                                name={category.name} // Set the name attribute to the category name
                                className='mr-2'
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => handleCheckboxChange(category.name)} // Pass the category name to the handler
                            />
                            <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </li>
                    ))}
                </ul>
                {/* Pagination */}
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(categories.length / categoriesPerPage)}
                        page={currentPage}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            </div>) : (
                <div>
                    UnAuthorized User
                </div>
            )}


        </div>
    );
};

export default CategoryPage;

import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Modal } from "./modal";

import '../styles/bodyStyle.sass'
import '../styles/modalStyle.sass'
import styled from "styled-components";

import { productService } from '../api'

const sortSelection = [
    '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const emptyProd = {
    id: 0,
    productName: "",
    productDescription: "",
    image: ""
};

const Products = () => {
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([])
    const [prod, setProd] = useState(emptyProd)
    const [itemCount, setItemCount] = useState([])

    const [sortValue, setSortValue] = useState('')
    const [action, setAction] = useState('')
    const [search, setSearch] = useState('')

    const [imageName, setImageName] = useState('');

    const [msg, setMsg] = useState([]);


    //#region Useeffect
    useEffect(() => getData(), [search]);

    const getData = () => {
        setLoading(true);

        if (search === "") {
            productService.get(0, 21)
                .then((res) => {
                    if (res.success) {
                        setItemCount(res.result.length)
                        setItems(res.result);
                    }

                })
                .finally(() => setLoading(false));
        } else {
            setSortValue('')
            productService.search(search, 0, 21)
                .then((res) => {
                    if (res.success) {
                        setItemCount(res.result.length)
                        setItems(res.result);
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    const handleSort = (obj) => {
        setSortValue(obj)
        productService.sort(obj, 0, 20)
            .then((res) => {
                if (res.success) {
                    setItemCount(res.result.length)
                    setItems(res.result);
                }
            })
            .finally(() => setLoading(false));
    }

    const handleSearch = (obj) => {
        setSearch(obj)
    }

    const handleAdd = async () => {
        setProd(_.cloneDeep(emptyProd));
        setAction("add");
        setImageName('')
        toggleShowModal();
    }

    const handleUpdate = (obj) => {
        setProd(_.cloneDeep(obj));

        setAction("edit");

        toggleShowModal();
    }

    const handleEnableDisable = (obj) => {
        setProd(_.cloneDeep(obj));

        setAction("enableDisable");

        toggleShowModal();
    }

    const handleDelete = (obj) => {
        setProd(_.cloneDeep(obj));

        setAction("delete");

        toggleShowModal();
    }

    const handleAction = async () => {

        let tempProd = { ...prod };

        const formData = new FormData()
        formData.append('id', tempProd.id)
        formData.append('productName', tempProd.productName)
        formData.append('productDescription', tempProd.productDescription)
        formData.append('file', tempProd.image)

        switch (action) {
            case "add":
                setMsg(["Creating new Product..."]);
                await productService.add(formData)
                break;
            case "edit":
                setMsg(["Editing Product..."]);

                await productService.edit(formData)
                break;
            case "enableDisable":
                setMsg(["Enabling/Disabling Product..."]);

                await productService.enableDisable(tempProd.id)
                break;
            case "delete":
                setMsg(["Deleting Product..."]);

                await productService.delete(tempProd.id)
                break;
        }

        getData()
        setAction('')
        setImageName('')
        toggleShowModal()
    }

    const handleFieldChange = (obj, field) => {
        let tempProd = { ...prod }
        tempProd[field] = obj
        setProd(tempProd)
    }

    const handleDrop = (event) => {
        let obj;

        if (event.target.files[0].type.includes("image/")) {
            var file = event.target.files[0]
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = (e) => {
                obj = { fileName: file.name, file: file }

                handleFieldChange(file, "image")
                setImageName(file.name)
            }
        }
    }

    const handleLoadMore = async () => {
        let tempItems = [...items]
        let tempCount = itemCount
        let from = tempCount === 0 ? 0 : tempCount === 21 ? 21 : tempCount + 21

        let newItems = []
        let newCount = tempCount

        tempItems.forEach((x) => {
            newItems.push(x)
        })

        if (sortValue) {
            productService.sort(sortValue, from, 21)
                .then((res) => {
                    if (res.success) {
                        if (res.result)
                            res.result.forEach((x) => {
                                newItems.push(x)
                            })
                        newCount = tempCount + res.result.length
                        setItemCount(newCount)
                        setItems(newItems);
                    }
                })
                .finally(() => setLoading(false));
        }
        else {
            productService.get(from, 21)
                .then((res) => {
                    if (res.success) {
                        if (res.result)
                            res.result.forEach((x) => {
                                newItems.push(x)
                            })
                        newCount = tempCount + res.result.length
                        setItemCount(newCount)
                        setItems(newItems);
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    const toggleShowModal = () => {
        setShow(!show);
    };

    const resetModal = () => {
        setProd(_.cloneDeep(emptyProd));
        getData()
        setAction('')
        setImageName('')
        toggleShowModal()
    }

    const modalBody = {
        header: {
            title: prod.productName,
        },
        content: (
            <>
                <div className="modalWrapperContent">
                    <div className='input-field img'>
                        {prod.imagePath ?
                            <img
                                src={prod.imagePath} />

                            : <img src='../assets/images/noImage.jpg' />
                        }
                    </div>
                    <div>
                        <label for="imagePath" style={{ textDecoration: 'underline', cursor: 'pointer', color: '#0000EE', paddingRight: '5em' }}>Upload Image</label>
                        <input hidden={true} type="file" name="imagePath" id="imagePath" accept="image/*" onChange={handleDrop} />

                        <label>
                            {imageName ? imageName : ''}
                        </label>
                    </div>
                </div>
                <div className="modalWrapperContent">
                    <div>
                        <label>
                            Product Name
                        </label>
                    </div>
                    <div>
                        <input type="text"
                            name="productName"
                            value={prod.productName}
                            onChange={(e) => handleFieldChange(e.target.value, 'productName')} />
                    </div>
                </div>
                <div className="modalWrapperContent">
                    <div>
                        <label>
                            Description
                        </label>
                    </div>
                    <div>
                        <input type="text"
                            name="productDescription"
                            value={prod.productName}
                            onChange={(e) => handleFieldChange(e.target.value, 'productDescription')} />
                    </div>
                </div>

            </>
        ),
        footer: (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "right",
                    width: "100%",
                }}
            ><button type="button"
                onClick={() => toggleShowModal()}
            >Cancel</button>
                <button type="button"
                    onClick={() => handleAction()}
                >{action === 'add' ? 'ADD' : action === 'edit' ? 'UPDATE' : action === 'enableDisable' ? 'DISABLE' : 'DELETE'}</button>

            </div>
        ),
    };



    return (
        <>
            <Modal
                show={show}
                width="50vw"
                body={modalBody}
                backDrop={false}
                onClose={() => resetModal()}
            />
            <div className='content'>
                <div className='breadcrumbs'><span>Home &#10093; PRODUCT LIST &#10093;</span></div>
                <div className='searchBox-LG'>
                    <div>
                        <font color='white'>SORT:</font>
                        {
                            sortSelection.map((x) => {
                                return (
                                    <>
                                        <button type="button"
                                            onClick={() => handleSort(x)}
                                        >{x}</button>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button type="button" style={{ marginRight: '1em', backgroundColor: '#ff7142', padding: '0em 1em 0em 1em' }}
                            onClick={() => handleAdd()}
                        >ADD PRODUCT</button>
                        <input type='Text' placeholder='Search'
                            onChange={(e) => handleSearch(e.target.value)}></input>
                    </div>
                </div>
                <div className='productList'>
                    {
                        items.map((x, index) => {
                            return (
                                <div className='productCard'>
                                    <div style={{ border: '1px solid #808080' }}>
                                        <img src={x.imagePath ? x.imagePath : '../assets/images/noImage.jpg'} />
                                    </div>
                                    <div>
                                        <span>{x.productName}</span>
                                        <span>
                                            <button type="button" className="productUpdateButton"
                                                onClick={(e) => handleUpdate(x)}
                                            >Update</button>
                                        </span>
                                        <span>
                                            <button type="button" className="productDisableButton"
                                                onClick={(e) => handleEnableDisable(x)}
                                            >Disable</button>
                                        </span>
                                        <span>
                                            <button type="button" className="productDeleteButton"
                                                onClick={(e) => handleDelete(x)}
                                            >Delete</button>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div style={{ width: '90vw', display: 'flex', justifyContent: 'center' }}>
                        <button type="button"
                            onClick={() => handleLoadMore()}
                        >Load More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;
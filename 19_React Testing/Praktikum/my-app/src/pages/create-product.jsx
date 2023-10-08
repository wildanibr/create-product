/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct, editProduct } from '../utils/action';


export default function CreateProduct () {
    const [randomNumber, setRandomNumber] = useState(null);
    const [productNameError, setProductNameError] = useState("");
    const [productPriceError, setProductPriceError] = useState("");
    const [productCategoryError, setProductCategoryError] = useState("");
    const [productFreshnessError, setProductFreshnessError] = useState("");
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productFreshness, setProductFreshness] = useState("Brand New");
    const [productPrice, setProductPrice] = useState("");
    const [setProductList] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [productImageError, setProductImageError] = useState("");
    const productList = useSelector((state) => state.productList);
    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    const [setEditingProductId, editingProductId] = useState(null);

    const handleEditClick = (product) => {
      setEditing(true);
      setEditingProductId(product.id);
      setProductName(product.name);
      setProductCategory(product.category);
      setProductFreshness(product.freshness);
      setProductPrice(product.price);
      setProductImage(product.image);
    };
    


    const generateRandomNumber = () => {
        const random = Math.floor(Math.random() * 100);
        setRandomNumber(random);
    };

  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        setProductImage(file);
        setProductImageError("");
      } else {
        setProductImage(null);
        setProductImageError("Hanya gambar dengan format JPEG atau PNG yang diperbolehkan.");
      }
    }
  };

    const handleProductNameChange = (event) => {
      const value = event.target.value;
  
      const regex = /^[a-zA-Z0-9\s]*$/;
      const isValid = regex.test(value);
  
      if (!isValid) {
          setProductNameError("Product Name hanya boleh mengandung huruf, angka, dan spasi.");
          setIsFormValid(false);
      } else if (value.length > 25) {
          setProductNameError("Product Name tidak boleh melebihi 25 karakter.");
          setIsFormValid(false);
      } else if (value.trim() === "") {
          setProductNameError("Product Name tidak boleh kosong.");
          setIsFormValid(false);
      } else {
          setProductNameError("");
          setIsFormValid(true);
      }
  
      setProductName(value);
  };  

   
  const handleProductCategoryChange = (event) => {
    const value = event.target.value;

    if (["T-Shirt", "Pants", "Shoes", "Cap"].includes(value)) {
        setProductCategory(value);
        setIsFormValid(true);
      } else if (value.trim() === "") {
        setProductCategoryError("Product Name tidak boleh kosong.");
        setIsFormValid(false);
    } else {
        setProductCategoryError("Pilih kategori produk yang valid.");
        setIsFormValid(false);
    }
};

const handleProductFreshnessChange = (event) => {
    const value = event.target.value;
    // Validasi: pastikan nilai ada dalam daftar pilihan yang valid
    if (["Brand New", "Second Hand", "Refurbished"].includes(value)) {
        setProductFreshness(value);
        setIsFormValid(true);
      } else if (value.trim() === "") {
        setProductFreshnessError("Product Name tidak boleh kosong.");
        setIsFormValid(false);
    } else {
        setProductFreshnessError("Pilih tingkat kesegaran produk yang valid.");
        setIsFormValid(false);
    }
};


    const handleProductPriceChange = (event) => {
      const value = event.target.value;
  
      const regex = /^\d+(\.\d{1,2})?$/;
      const isValid = regex.test(value);
  
      if (!isValid) {
          setProductPriceError("Harga produk harus dalam format yang valid (contoh: 100 atau 100.50).");
          setIsFormValid(false);
      } else {
          setProductPriceError("");
          setIsFormValid(true);
      }
  
      setProductPrice(value);
  };
  
  const handleImageRemove = () => {
    setProductImage(null);
    setProductImageError("");
  };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid) {
          return;
        }
    
        if (!productImage) {
          setProductImageError("Silakan unggah gambar produk.");
          return;
        }

      if (isEditing) {
  
    dispatch(editProduct(editingProductId, {
      id: editingProductId,
      name: productName,
      category: productCategory,
      freshness: productFreshness,
      price: productPrice,
      image: productImage,
    }));
    setEditing(false);

  } else {
    // Jika tidak dalam mode pengeditan, gunakan action addProduct
    dispatch(addProduct({
      id: uuidv4(),
      name: productName,
      category: productCategory,
      freshness: productFreshness,
      price: productPrice,
      image: productImage,
    }));
  }
        
        // dispatch(addProduct(newProduct));

      
        setProductName("");
        setProductCategory("");
        setProductFreshness("Brand New");
        setProductPrice("");
        setProductImage(null);
        setEditingProductId(null);

        alert ("Data berhasil dikirim");
    };

    const handleDeleteConfirmation = (productId) => {
        setDeleteConfirmation(productId);
      };
    
      // Function to handle actual delete
      const handleDelete = () => {
        const updatedProductList = productList.filter(
          (product) => product.id !== deleteConfirmation
        );
    
        setProductList(updatedProductList);
        setDeleteConfirmation(null); // Clear delete confirmation
      };
      
    useEffect(() => {
        setShowWelcomeAlert(true);

        const timeout = setTimeout(() => {
            setShowWelcomeAlert(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const handleSubmitUpdate = (productId) => {
      // Lakukan validasi dan pengiriman data update produk
      if (!isFormValid) {
        return;
      }
    
      // Implementasikan logika update produk dengan action Redux atau metode lainnya
      dispatch(updateProduct(productId, {
        id: productId,
        name: productName,
        category: productCategory,
        freshness: productFreshness,
        price: productPrice,
        image: productImage,
      }));
    
      // Setelah update, keluar dari mode edit
      setEditing(false);
      setEditingProductId(null);
    
      // Reset state atau lakukan perubahan lain yang diperlukan
      setProductName("");
      setProductCategory("");
      setProductFreshness("Brand New");
      setProductPrice("");
      setProductImage(null);
    
      alert("Produk berhasil diupdate");
    };
    
    return (
        <><nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Simple Header</a>
                <div className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
                        <li className="nav-item">
                            <a className="btn btn-outline-primary active" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="#">FAQs</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="#">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="container">

        {showWelcomeAlert && (
                <div className="alert alert-success mt-2">Welcome</div>
            )}

        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" viewBox="0 0 72 57" fill="none">
    <g clipPath="url(#clip0_405_4737)">
      <path d="M8.12608 7.44912C7.99112 3.57368 11.0106 0 15.092 0H56.9133C60.9947 0 64.0142 3.57368 63.8792 7.44912C63.7496 11.1719 63.9179 15.9942 65.1315 19.9263C66.3491 23.8704 68.4022 26.3635 71.7648 26.6838V30.3162C68.4022 30.6365 66.3491 33.1296 65.1315 37.0737C63.9179 41.0058 63.7496 45.8281 63.8792 49.551C64.0142 53.4263 60.9947 57 56.9133 57H15.092C11.0106 57 7.99112 53.4263 8.12622 49.551C8.25573 45.8281 8.08738 41.0058 6.87362 37.0737C5.65622 33.1296 3.59807 30.6365 0.235352 30.3162V26.6838C3.59793 26.3635 5.65622 23.8704 6.87362 19.9263C8.08738 15.9942 8.25573 11.1719 8.12608 7.44912Z" fill="url(#paint0_linear_405_4737)"/>
      <g filter="url(#filter0_d_405_4737)">
        <path d="M37.5512 43.6521C44.1588 43.6521 48.1406 40.4168 48.1406 35.0805C48.1406 31.0467 45.2995 28.1265 41.081 27.6642V27.4961C44.1803 26.9919 46.6125 24.1137 46.6125 20.8993C46.6125 16.3194 42.9966 13.3359 37.4866 13.3359H25.0891V43.6521H37.5512ZM29.9104 17.1806H36.3244C39.8112 17.1806 41.7912 18.7353 41.7912 21.5505C41.7912 24.5549 39.4883 26.2355 35.3128 26.2355H29.9104V17.1806ZM29.9104 39.8075V29.8282H36.2812C40.8442 29.8282 43.2118 31.5089 43.2118 34.7864C43.2118 38.0637 40.9088 39.8075 36.5611 39.8075H29.9104Z" fill="url(#paint1_linear_405_4737)"/>
        <path d="M37.5512 43.6521C44.1588 43.6521 48.1406 40.4168 48.1406 35.0805C48.1406 31.0467 45.2995 28.1265 41.081 27.6642V27.4961C44.1803 26.9919 46.6125 24.1137 46.6125 20.8993C46.6125 16.3194 42.9966 13.3359 37.4866 13.3359H25.0891V43.6521H37.5512ZM29.9104 17.1806H36.3244C39.8112 17.1806 41.7912 18.7353 41.7912 21.5505C41.7912 24.5549 39.4883 26.2355 35.3128 26.2355H29.9104V17.1806ZM29.9104 39.8075V29.8282H36.2812C40.8442 29.8282 43.2118 31.5089 43.2118 34.7864C43.2118 38.0637 40.9088 39.8075 36.5611 39.8075H29.9104Z" stroke="white" strokeWidth="0.139706"/>
      </g>
    </g>
    <defs>
      <filter id="filter0_d_405_4737" x="22.784" y="11.5896" width="27.6618" height="34.9264" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="0.558824"/>
        <feGaussianBlur stdDeviation="1.11765"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_405_4737"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_405_4737" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_405_4737" x1="10.864" y1="1.50855" x2="73.3686" y2="51.1247" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9013FE"/>
        <stop offset="1" stopColor="#6610F2"/>
      </linearGradient>
      <linearGradient id="paint1_linear_405_4737" x1="27.2695" y1="15.3314" x2="41.2409" y2="38.9601" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="#F1E5FC"/>
      </linearGradient>
      <clipPath id="clip0_405_4737">
        <rect width="71.5294" height="57" fill="white" transform="translate(0.235352)"/>
      </clipPath>
    </defs>
  </svg>

                <h1 className="create">Create Product</h1>
                <p className="describe">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                <p className="detail">Detail Product</p>
                <form className="g-3">
                    <div className="col-md-12">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={productName}
                            onChange={handleProductNameChange}
                            required />

                            {productNameError && (
                            <div className="alert alert-danger mt-2">{productNameError}</div>
                )}
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="productCategory" className="form-label"
                        >Product Category </label>
                        <select className="form-select"
                         id="productCategory"
                         value={productCategory}
                         onChange={handleProductCategoryChange}
                        required>
                            <option selected disabled value="">Choose...</option>
                            <option>T-Shirt</option>
                            <option>Pants</option>
                            <option>Shoes</option>
                            <option>Cap</option>
                        </select>
                        {productCategoryError && (
                            <div className="alert alert-danger mt-2">{productCategoryError}</div>
                )}
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="imageProduct" className="form-label"
                        >Image of Product</label>
                        <input
                            type="file"
                            className="form-control text-bg-primary"
                            id="imageProduct"
                            accept="image/jpeg, image/png"
                            onChange={handleProductImageChange}
                            required />

{productImage && (
        <img
          src={URL.createObjectURL(productImage)}
          alt="Product"
          style={{ maxWidth: "200px", marginTop: "10px" }}
        />
      )}
   {productImageError && (
        <div className="alert alert-danger mt-2">{productImageError}</div>
      )}
    </div>
                    <div className="col-md-5 mb-3">
                        <label htmlFor="productFreshness" className="form-label"
                        >Product Freshness</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="Brand New"
                                checked={productFreshness === "Brand New"}
                                onChange={handleProductFreshnessChange}
                            />
                            <label className="form-check-label" htmlFor="productFreshness">
                                Brand New
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                value="Second Hand"
                                checked={productFreshness === "Second Hand"}
                                onChange={handleProductFreshnessChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Second Hand
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                value="Refurbished"
                                checked={productFreshness === "Refurbished"}
                                onChange={handleProductFreshnessChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Refurbished
                            </label>
                                
                        {productFreshnessError && (
                            <div className="alert alert-danger mt-2">{productFreshnessError}</div>
                )}
                    </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="description" className="form-label"
                        >Additional Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="col-md">
                        <label htmlFor="productPrice" className="form-label"
                        >Product Price</label>
                        <input
                            type="text"
                            className="form-control mb-5"
                            id="productPrice"
                            value={productPrice}
                            onChange={handleProductPriceChange}
                            placeholder="$1" 
                            required />

                            
                        {productPriceError && (
                            <div className="alert alert-danger mt-2">{productPriceError}</div>
                )}
                    </div>
                    <div className="col-12">
                   
                      <button
                      className="btn btn-primary w-100"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      {isEditing ? "Update" : "Submit"}
                    </button>


                    </div>

                    <div className="col-12">
                        <button className="btn btn-danger w-100" onClick={generateRandomNumber} type="submit">Random Number</button>

                        {randomNumber !== null && (
                <p>Angka Acak: {randomNumber}</p>
            )}
                    </div>
                </form>

                <table border="1" id="productTable">
                <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Freshness</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {productList.map((product, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.freshness}</td>
    <td>
      {product.image && (
        <img
          src={URL.createObjectURL(product.image)}
          alt="Product"
          style={{ maxWidth: "100px" }}
        />
      )}
    </td>
    <td>${product.price}</td>
    <td>
      {isEditing && editingProductId === product.id ? (
        <button
          className="btn btn-warning"
          onClick={() => handleSubmitUpdate(product.id)}
        >
          Update
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => handleEditClick(product)}
        >
          Edit
        </button>
      )}
      <button
        className="btn btn-danger"
        onClick={() => dispatch(deleteProduct(product.id))}
      >
        Delete
          </button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
      {deleteConfirmation !== null && (
  <div className="modal" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Konfirmasi Hapus Produk</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteConfirmation(null)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          Apakah Anda yakin ingin menghapus produk ini?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setDeleteConfirmation(null)}
          >
            Tidak
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleDelete();
              setDeleteConfirmation(null);
            }}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}


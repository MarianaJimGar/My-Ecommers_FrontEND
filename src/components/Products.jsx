import React, { useState, useEffect } from "react";
import { effect } from "vue";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }
            return () => {
                componentMounted = false;
            };
        };
        getProducts();
    }, []);

    const Loading = () => {
        return <>Loading...</>;
    };
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2">Ropa para dama</button>
                    <button className="btn btn-outline-dark me-2">Ropa para caballero</button>
                    <button className="btn btn-outline-dark me-2">Joyas y Accesorios</button>
                    <button className="btn btn-outline-dark me-2">Electronicos</button>
                    <button className="btn btn-outline-dark me-2">Cosas para el hogar</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3">
                                <div class="card">
                                    <img src={product.image} class="card-img-top" alt={product.title}/>
                                        <div class="card-body">
                                            <h5 class="card-title">{product.title}</h5>
                                            <p class="card-text">${product.price}</p>
                                            <a href="#" class="btn btn-primary">Checar Producto</a>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">
                            Lista de productos
                        </h1>{" "}
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;

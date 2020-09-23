import React, { useState, useEffect } from 'react';
import { Container, Filter, Price, Product, ProductSection, Info } from './style';

import api from '../../services/api'
/*
TODO: -Improve price filter
        -should not be able to set price below 0
        -should not be able to set minPrice above maxPrice and vice versa
        -should reset to infinty when empty
        -add easier way to clear filter
*/

const Products = () => {
  const [products, setProducts] = useState(['']);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [minValue, setMinValue] = useState(-Infinity);
  const [maxValue, setMaxValue] = useState(Infinity);


  const loadProducts = async () => {
    const response = await api.get("produto")

    if (filters.length > 0)
      response.data = response.data.filter(product => filters.includes(product.nomeCategoria))

    response.data = response.data.filter(product => product.valor <= maxValue && product.valor >= minValue)

    setProducts(response.data)
  }


  const loadCategories = async () => {
    const response = await api.get("categoria");

    setCategories(response.data);

  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters])


  const addFilter = (e) => {
    if (e.checked) {
      setFilters(filters.concat(e.value))
    } else {
      setFilters(filters.filter(f => f !== e.value))
    }

    console.log(filters)
  }

  return (
    <Container>
      <Filter>
        <h2>Filtros</h2>
        <h4>Categorias</h4>
        {categories.map(category => (

          <div key={category.id} >
            <input
              onClick={e => addFilter(e.target)}
              type="checkbox"
              id={category.id}
              value={category.nome} />
            <label htmlFor={category.id}>{category.nome}</label>
          </div>

        ))}

        <h4>Preço</h4>
        <Price>
          <input
            type="number"
            value={minValue}
            onChange={e => setMinValue(e.target.value)}
            placeholder="min"
          />
          <input
            type="number"
            value={maxValue}
            onChange={e => setMaxValue(e.target.value)}
            placeholder="max"
          />
          <input
            type="button"
            value="Aplicar"
            onClick={() => loadProducts()}
          />
        </Price>


      </Filter>

      <ProductSection>
        {!products.length ? "Nenhum produto encontrado :(" :
          products.map(product => (

            <Product key={product.id}>
              <img src={product.fotoLink}
                alt={product.nome}
                onError={(e)=>{e.target.onerror = null; e.target.src="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"}}>
                
              </img>
              <Info>
                <p className="nome">{product.nome} - {product.descricao}</p>
                <p className="categoria">{product.nomeCategoria}</p>
                <h3>R${product.valor}</h3>
              </Info>

            </Product>
          )
          )
        }

      </ProductSection>
    </Container>

  )
}

export default Products

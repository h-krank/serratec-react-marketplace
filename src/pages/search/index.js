import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Filter, Price, ProductSection } from './style';

import Product from '../../components/product'

import api from '../../services/api'


const Search = () => {
  const history = useHistory();
  const [products, setProducts] = useState(['']);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [minValue, setMinValue] = useState(-Infinity);
  const [maxValue, setMaxValue] = useState(Infinity);

  const [query, setQuery] = useState([]);

  const loadProducts = useCallback(
    async () => {
      const response = await api.get("produto")
      const query = history.location.search.replace('?', '').split('&')
      setQuery(query)

      if (query.length > 0) {
        response.data = response.data.filter(product => (
          query.some(q => product.nome.toLowerCase().includes(q))
        ))
      }

      if (filters.length > 0) {
        response.data = response.data.filter(product => (
          filters.includes(product.nomeCategoria)
        ))
      }

      response.data = response.data.filter(product => (
        product.valor <= maxValue && product.valor >= minValue
      ))

      setProducts(response.data)
    }, [filters, maxValue, minValue, history.location.search])


  const loadCategories = async () => {
    const response = await api.get("categoria");
    setCategories(response.data);
  }


  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters, loadProducts, history.location])


  const addFilter = (e) => {
    if (e.checked) {
      setFilters(filters.concat(e.value))
    } else {
      setFilters(filters.filter(f => f !== e.value))
    }

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
            min='0'
            max={maxValue}
            onChange={e => setMinValue(e.target.value)}
            placeholder="min"
          />
          <input
            type="number"
            value={maxValue}
            min={minValue}
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
        <p><strong>Busca: </strong>{query.join(' ')}</p>
        {!products.length ? "Nenhum produto encontrado :(" :
          products.map(product => (
            <>
              <Product key={product.id} product={product} />
              <hr style={{color:'#eee'}}/>
            </>
          )
          )
        }
      </ProductSection>
    </Container>

  )
}

export default Search

import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import Product from '../../components/product'
import { FiX } from 'react-icons/fi'
import api from '../../services/api'

import { Container, Filter, Blur, Price, PriceActive, ProductSection } from './style';

const Search = () => {
  const history = useHistory();
  const [products, setProducts] = useState(['']);
  const [filteredProducts, setFilteredProducts] = useState([''])
  const [categories, setCategories] = useState([]);
  
  const [filters, setFilters] = useState([]);
  const [activePriceFilter, setActivePriceFilter] = useState(false);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  const [searchQuery, setSearchQuery] = useState([]);

  const loadProducts = useCallback(
    async () => {
      const response = await api.get("produto")

      setProducts(response.data)
    }, [])

  const loadFiltered = useCallback(
    () => {
      const query = history.location.search.replace('?', '').split('&')
      setSearchQuery(query)
      let filtered = products;

      try {
        if (query.length > 0) {
          filtered = filtered.filter(product => (
            query.some(q => product.nome.toLowerCase().includes(q)
              || product.nomeCategoria.toLowerCase().includes(q)
              || product.descricao.toLowerCase().includes(q))
          ))
        }

        if (filters.length > 0) {
          filtered = filtered.filter(product => (
            filters.includes(product.nomeCategoria)
          ))
        }
        if (activePriceFilter) {
          filtered = filtered.filter(product => (
            product.valor <= maxValue && product.valor >= minValue
          ))
        }
      } catch (error){
        console.log(error)
      }

      setFilteredProducts(filtered)

    }, [products, filters, maxValue, minValue, activePriceFilter, history.location.search])

  const loadCategories = async () => {
    const response = await api.get("categoria");
    setCategories(response.data);
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts])

  useEffect(() => {
    loadFiltered();
  }, [filters, loadFiltered, history.location])


  const addFilter = (e) => {
    if (e.checked) {
      setFilters(filters.concat(e.value))
    } else {
      setFilters(filters.filter(f => f !== e.value))
    }
  }

  function convertPrice(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
        {!activePriceFilter ?
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
              onClick={() => minValue && maxValue && setActivePriceFilter(true)}
            />
          </Price> :
          <PriceActive>
            de {convertPrice(minValue)} até {convertPrice(maxValue)}
            <div onClick={() => {
              setMinValue();
              setMaxValue();
              setActivePriceFilter(false)
            }} >
              <FiX /><span>remover</span>
            </div>


          </PriceActive>
        }
      </Filter>

      <ProductSection>
        <p><strong>Busca: </strong>{searchQuery.join(' ')}</p>
        {!filteredProducts.length ? <span>Nenhum produto encontrado :( </span> :
          filteredProducts.map(product => (
            <Blur >
              <Product key={product.id} product={product} />
              {product.qtdEstoque < 1 && <p id='unavailable'>Produto indisponivel</p>}
              <hr style={{ color: '#eee' }} />
            </Blur>
          )
          )
        }
      </ProductSection>
    </Container>

  )
}

export default Search

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { Container, Filter, Price, Product, ProductSection, Info } from './style';


import api from '../../services/api'
/*
TODO: -Improve price filter
        -Deve voltar ao padrão quando vazio
        -Adicionar forma mais simples de limpar o filtro
*/

const Search = () => {
  const [products, setProducts] = useState(['']);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [minValue, setMinValue] = useState(-Infinity);
  const [maxValue, setMaxValue] = useState(Infinity);

  const [query, setQuery] = useState('');

  const loadQuery = () => {
    try{
      let link = window.location.href.toLowerCase().split('q=')[1];
      let q = link.split('&')
      setQuery(q)
    } catch (error){
      console.log(error)
    }
  }

  const loadProducts = useCallback(
    async () => {
      const response = await api.get("produto")
      loadQuery();      
      
      if (query.length > 0) {
        response.data = response.data.filter(product => query.some(q => product.nome.toLowerCase().includes(q)))
      }

      if (filters.length > 0) {
        response.data = response.data.filter(product => filters.includes(product.nomeCategoria))
      }


      response.data = response.data.filter(product => product.valor <= maxValue && product.valor >= minValue)

      setProducts(response.data)
    }, [filters, maxValue, minValue, query])


  const loadCategories = async () => {
    const response = await api.get("categoria");

    setCategories(response.data);

  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters, query])


  const addFilter = (e) => {
    if (e.checked) {
      setFilters(filters.concat(e.value))
    } else {
      setFilters(filters.filter(f => f !== e.value))
    }

    console.log(filters)
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
        {!products.length ? "Nenhum produto encontrado :(" :
          products.map(product => (

            <Product key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.fotoLink}
                  alt={product.nome}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
                  }}>
                </img>
              </Link>

              <Info>
                <Link to={`/product/${product.id}`}>
                  <p className="nome">{product.nome} - {product.descricao}</p>
                </Link>
                <p className="categoria">{product.nomeCategoria}</p>
                <h3>{convertPrice(product.valor)}</h3>
              </Info>

            </Product>
          )
          )
        }
      </ProductSection>
    </Container>

  )
}

export default Search

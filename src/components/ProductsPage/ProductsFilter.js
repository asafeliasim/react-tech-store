import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from "../../context";

export default function ProductsFilter(){

  return(
      <ProductConsumer>
        {
          value=>{
            const{search,min,max,company,price,handleChange,storedProducts} = value;
            let companies = new Set();
            companies.add('all');
            for(let index in storedProducts){
              companies.add(storedProducts[index]["company"])
            }
            companies = [...companies];
            return(
                <div className="row my-5">
                  <div className="col-10 mx-auto">
                    <FilterWrapper>
                      {/*text search*/}
                      <div>
                        <label htmlFor="search">search products</label>
                        <input type="text" name="search" id="search"
                               onChange={handleChange} value={search}
                               className="filter-item"
                        />
                      </div>
                      {/*end of text search*/}
                      {/*category search*/}
                      <div>
                        <label htmlFor="company">company</label>
                        <select name="company"
                                id="company"
                                value={company}
                                onChange={handleChange}
                                className="filter-item"
                        >
                          {
                            companies.map((company,index)=>{
                               return <option key={index} value={company}>{company}</option>
                            })
                          }
                          {/*<option value="all">all</option>
                          <option value="fuji">fuji</option>
                          <option value="all">apple</option>*/}
                        </select>
                      </div>
                      {/*end category search*/}
                      {/*price range*/}
                      <div>
                        <label htmlFor="price">
                          <p className="mb-2">product price:
                            <span>${price}</span>
                          </p>
                        </label>
                        <input type="range" name="price" id="price" min={min} max={max}
                               className="filter-price" value={price} onChange={handleChange}/>
                      </div>

                      {/*end of price range*/}

                    </FilterWrapper>
                  </div>
                </div>
            )
          }
        }
      </ProductConsumer>
  )
};
const FilterWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    label{
      font-weight: bold;
      text-transform: capitalize;
    }
    .filter-item,
    .filter-price{
      display: block;
      width: 100%;
      background: transparent;
      border-radius: 0.5rem;
      border:2px solid var(--darkGray);
    }
`;

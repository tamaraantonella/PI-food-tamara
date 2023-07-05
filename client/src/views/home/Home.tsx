import { getDiets, getRecipes, resetRecipes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Filters } from '../../components/Filters/Filters';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { Navbar } from '../../components/Navbar/Navbar';
import { Pagination } from '../../components/Pagination/Pagination';
import React from 'react';
import s from './home.module.css';
import { Card } from '../../components/Card';
import { Diet, NotFound, Recipe, State } from '../../reducer/types';

export const Home = () => {
  const dispatch = useDispatch();
  const diets = useSelector<State, Diet[]>((state) => state.diets);
  const allRecipes = useSelector<State, Recipe[]>((state) => state.recipes);
  const notFound = useSelector<State, NotFound | undefined>(
    (state) => state.notFound
  );
  const errorServer = useSelector<State, string>((state) => state.errorServer);
  const [, setOrder] = useState('');
  const [isActive, setIsActive] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const pagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    return () => {
      dispatch(resetRecipes());
    };
  }, [dispatch]);

  if (errorServer) {
    return (
      <div className={s.homeContainer}>
        <Navbar />
        <div className={s.errorCont}>
          <h1 className={s.errorTitle}>Server Error</h1>
          <h3>Sorry this site can't be reached. </h3>
          <p>Error: {errorServer}</p>
          <p>Please try again later</p>
          <Link
            to="/"
            className={s.errorButton}
          >
            Refresh
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={s.homeContainer}>
        <Navbar />
        <div className={s.homeFilter}>
          <Filters
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
            diets={diets}
            setIsActive={setIsActive}
          />
        </div>
        {notFound && (
          <div className={s.notFound}>
            <h1>No recipes found</h1>
          </div>
        )}
        {allRecipes.length > 0 && !notFound && (
          <>
            <Pagination
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              pagination={pagination}
              setIsActive={setIsActive}
              isActive={isActive}
              currentPage={currentPage}
            />
            <div className={s.homeList}>
              {currentRecipes &&
                currentRecipes.map((recipe) => {
                  return (
                    <Card
                      key={recipe.id}
                      id={recipe.id}
                      image={recipe.image}
                      name={recipe.name}
                      healthScore={recipe.healthScore}
                      diets={recipe.diets}
                      vegetarian={recipe.vegetarian}
                      vegan={recipe.vegan}
                      glutenFree={recipe.glutenFree}
                      dairyFree={recipe.dairyFree}
                    />
                  );
                })}
            </div>
          </>
        )}
        {!notFound && allRecipes.length === 0 && <Loading />}
      </div>
    );
  }
};

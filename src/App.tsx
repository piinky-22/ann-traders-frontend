import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ProductDetail } from './layouts/ProductDetailPage/ProductDetail';
import { SearchProductsPage } from './layouts/SearchProduct/SearchProductsPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { Cart } from './layouts/CartPage/Cart';
import { AddNewProduct } from './layouts/ManageProducts/AddNewProduct';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path='/search'>
              <SearchProductsPage />
            </Route>
            <Route path='/add'>
              <AddNewProduct />
            </Route>
            <Route path='/cart/:productId'>
              <Cart />
            </Route>
            <Route path='/product/:productId'>
              <ProductDetail />
            </Route>
            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}
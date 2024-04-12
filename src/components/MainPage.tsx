import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Converter from './Converter.tsx';
import CurrencyCourses from './CurrencyCourses.tsx';
import Offices from './Offices.tsx';
import '../App.css';

const MainPage: React.FC = () => (
  <>
    <ToastContainer />
    <div className="container h-100 my-5 overflow-hidden rounded shadow bg-light">
      <div className="row h-100 bg-white flex-md-row" />
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active w33"
            id="nav-convert-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-convert"
            type="button"
            role="tab"
            aria-controls="nav-convert"
            aria-selected="true"
          >
            Convert currency
          </button>
          <button
            className="nav-link w33"
            id="nav-currency-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-currency"
            type="button"
            role="tab"
            aria-controls="nav-currency"
            aria-selected="false"
          >
            Currency rates
          </button>
          <button
            className="nav-link w33"
            id="nav-offices-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-offices"
            type="button"
            role="tab"
            aria-controls="nav-offices"
            aria-selected="false"
          >
            Bank offices
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-convert"
          role="tabpanel"
          aria-labelledby="nav-convert-tab"
        >
          <Converter />
        </div>
        <div
          className="tab-pane fade pb-4"
          id="nav-currency"
          role="tabpanel"
          aria-labelledby="nav-currency-tab"
        >
          <CurrencyCourses />
        </div>
        <div
          className="tab-pane fade pb-4"
          id="nav-offices"
          role="tabpanel"
          aria-labelledby="nav-offices-tab"
        >
          <Offices />
        </div>
      </div>
    </div>
  </>
);

export default MainPage;

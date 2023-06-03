import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
function ErrorPage() {
  return (
    <div className="error-page-main">
      <div className="error-page-container">
        <h1>404-Nothing to see here</h1>
        <h2>Looks like this page is missing</h2>
        <div className="btn-action">
          <button className="btn-home">
            <Link to="/" className="btn-home">
              Go to Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

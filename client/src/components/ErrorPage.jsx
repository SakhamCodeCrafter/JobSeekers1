import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ErrorPage() {
  return (
    <>
      <div>
        <Link to='/'>
        <img src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png"></img>
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;

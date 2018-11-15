import React, { Component } from 'react';
import { ErrorImage } from '../assets/error'
import '../style.css';

export function ErrorPage() {
  return (
    (
      <div className='w3-card w3-white'>
        <center>
          <ErrorImage />
        </center>
      </div>
    )
  )
}
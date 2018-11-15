import React, { Component } from 'react';
import { FullWidthCard } from '../page/structural'
import '../style.css';

export function LoadingPage() {
  return (
    (
      <div className='w3-card w3-white'>
        <center>
          <img src='https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-10.gif' />
        </center>
      </div>
    )
  )
}
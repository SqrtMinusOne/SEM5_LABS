import React, { Component } from 'react';
import { Icon } from '../assets/icons'
import '../style.css'

function getStockPercentDynamicText(stock) {
  if (stock.dynamic > 0) {
    return `+${Math.trunc(stock.dynamic / stock.price * 100)}%`;
  }
  return `${Math.trunc(stock.dynamic / stock.price * 100)}%`;
}

function getStockDynamicText(stock) {
  if (stock.dynamic > 0) {
    return `+${stock.dynamic}`;
  }
  return `${stock.dynamic}`;
}

export function Dynamic(props) {
  let type = 'stable';
  if (props.stock.dynamic > 0) {
    type = 'up'
  }
  else if (props.stock.dynamic < 0) {
    type = 'down'
  }
  return (
    <div>
      <Icon type={type} width='25' height='25' /> {'\u00A0'}
      {getStockDynamicText(props.stock)} {'\u00A0'}
      {getStockPercentDynamicText(props.stock)}
    </div>
  )
}

export function LargeDynamic(props) {
  let type = 'stable';
  if (props.stock.dynamic > 0) {
    type = 'up'
  }
  else if (props.stock.dynamic < 0) {
    type = 'down'
  }
  return (
    <div className='price_container'>
      <div className='price_img'>
      <Icon type={type} width='40' height='40' /> {'\u00A0'}
      </div>
      <span className='price_text'>
        {props.stock.price} {'\u00A0'}
      </span>
      <span className='price_dynamic_text'>
        {getStockDynamicText(props.stock)} {'\u00A0'}
        {getStockPercentDynamicText(props.stock)}
      </span>
    </div>
  )
}
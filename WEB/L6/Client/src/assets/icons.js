import React from 'react';
import {DownIcon} from '../assets/downicon'
import {UpIcon} from '../assets/upicon'
import {StableIcon} from '../assets/stableicon'

export function Icon(props){
  let width = props.width || 42;
  let heigth = props.heigth || 42;
  switch(props.type){
    case 'stable':
      return <StableIcon width={width} heigth={heigth} />
    case 'up':
      return <UpIcon width={width} heigth={heigth} />
    case 'down':
      return <DownIcon width={width} heigth={heigth} />
  }
}
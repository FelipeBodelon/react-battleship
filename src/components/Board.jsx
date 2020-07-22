import React from 'react';

export default function Board({ children }) {
  return (
    <div className='grid-container'>
      <div className='label-letras'>
        <div className='label-text'>A</div>
        <div className='label-text'>B</div>
        <div className='label-text'>C</div>
        <div className='label-text'>D</div>
        <div className='label-text'>E</div>
        <div className='label-text'>F</div>
        <div className='label-text'>G</div>
        <div className='label-text'>H</div>
        <div className='label-text'>I</div>
        <div className='label-text'>J</div>
      </div>
      <div className='label-numeros'>
        <div className='label-text'>1</div>
        <div className='label-text'>2</div>
        <div className='label-text'>3</div>
        <div className='label-text'>4</div>
        <div className='label-text'>5</div>
        <div className='label-text'>6</div>
        <div className='label-text'>7</div>
        <div className='label-text'>8</div>
        <div className='label-text'>9</div>
        <div className='label-text'>10</div>
      </div>
      {children}
    </div>
  );
}
import React, { useMemo } from 'react';
import L from 'leaflet';

const createDefaultSVG = (color) => `
  <g>
    <path transform="rotate(90 50 38.9325)" stroke="#000" d="m24.97458,-9.69499l62.56354,0c-6.91058,0 -12.51271,21.77126 -12.51271,48.62745c0,26.8562 5.60213,48.62745 12.51271,48.62745l-62.56354,0l0,0c-6.91058,0 -12.51271,-21.77125 -12.51271,-48.62745c0,-26.8562 5.60213,-48.62745 12.51271,-48.62745z" fill="${color}"/>
    <rect height="25.70806" width="97.16776" y="59.69499" x="1.41612" stroke="#000" fill="gray"/>
    <rect stroke="#000" height="90" width="25" y="85.83878" x="8.32711" fill="gray"/>
    <path transform="rotate(180 20.813 186.893)" stroke="#000" d="m8.50358,197.78651l4.61601,-21.78651l15.38671,0l4.61601,21.78651l-24.61873,0z" fill="gray"/>
    <path d="m17.68802,160.72423l6.40669,0l0,12.25627l-6.40669,0l0,-12.25627z" stroke="#000" fill="black"/>
    <rect height="90" width="25" y="86" x="66" stroke="#000" fill="gray"/>
    <path transform="rotate(180 78.3955 186.864)" stroke="#000" d="m66,197.72703l4.64833,-21.72703l15.49443,0l4.64833,21.72703l-24.79109,0z" fill="gray"/>
    <rect stroke="#000" height="12.81337" width="6.40669" y="159.88858" x="75.9053" fill="black"/>
  </g>`;

const createJackingSVG = (color) => `
  <g>
    <path transform="rotate(90 50 38.9325)" stroke="#000" d="m24.97458,-9.69499l62.56354,0c-6.91058,0 -12.51271,21.77126 -12.51271,48.62745c0,26.8562 5.60213,48.62745 12.51271,48.62745l-62.56354,0l0,0c-6.91058,0 -12.51271,-21.77125 -12.51271,-48.62745c0,-26.8562 5.60213,-48.62745 12.51271,-48.62745z" fill="${color}"/>
    <rect height="25.70806" width="97.16776" y="59.69499" x="1.41612" stroke="#000" fill="gray"/>
    <rect stroke="#000" height="90" width="25" y="85.83878" x="8.32711" fill="gray"/>
    <path transform="rotate(180 20.813 186.893)" stroke="#000" d="m8.50358,197.78651l4.61601,-21.78651l15.38671,0l4.61601,21.78651l-24.61873,0z" fill="gray"/>
    <path d="m17.68802,160.72423l6.40669,0l0,12.25627l-6.40669,0l0,-12.25627z" stroke="#000" fill="black"/>
    <rect height="90" width="25" y="86" x="66" stroke="#000" fill="gray"/>
    <path transform="rotate(180 78.3955 186.864)" stroke="#000" d="m66,197.72703l4.64833,-21.72703l15.49443,0l4.64833,21.72703l-24.79109,0z" fill="gray"/>
    <rect stroke="#000" height="12.81337" width="6.40669" y="159.88858" x="75.9053" fill="black"/>
    <rect height="104.45682" width="93.31476" y="88.02228" x="3.48189" stroke="#000" fill="#E6C36A"/>
    <rect transform="rotate(41 50.2697 140.116)" stroke="#000" height="126.05237" width="10.86351" y="77.09031" x="44.8379" fill="#E6C36A"/>
    <rect transform="rotate(-41 50.2591 140.551)" stroke="#000" height="127.14668" width="11" y="76.97742" x="44.75913" fill="#E6C36A"/>
  </g>`;

const CustomIcon = ({ rotationAngle = 0, name = '', color = 'white', jacking = 0 }) => {
  const selectedSVG = useMemo(() => jacking === 2 ? createJackingSVG(color) : createDefaultSVG(color), [jacking, color]);

  const icon = useMemo(() => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div>
               <div style="color: black;margin-left: -5px;" >${name}</div>
               <svg class="marker-image" style="transform: rotate(${rotationAngle}deg);" width="30" height="60" viewBox="0 0 100 220" xmlns="http://www.w3.org/2000/svg">
                 ${selectedSVG}
               </svg>
             </div>`,
      iconSize: [30, 60],
      iconAnchor: [15, 50],
    });
  }, [rotationAngle, name, selectedSVG]);

  return icon;
};

export default CustomIcon;

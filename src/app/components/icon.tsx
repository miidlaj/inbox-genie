import React from 'react';

interface ResizableIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
}

const ResizableIcon: React.FC<ResizableIconProps> = ({ width = 100, height = 100, fill = 'none', ...props }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 100 100" 
    fill={fill} 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#f1bc19" d="M77,12c-0.552,0-1,0.448-1,1s0.448,1,1,1s1-0.448,1-1S77.552,12,77,12z"></path>
    <path fill="#f3dea3" d="M50,13c-20.435,0-37,16.565-37,37s16.565,37,37,37s37-16.565,37-37S70.435,13,50,13z"></path>
    <path fill="#f1bc19" d="M83,11c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S85.209,11,83,11z"></path>
    <path fill="#cd4054" d="M87,22c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S88.105,22,87,22z"></path>
    <path fill="#fbcd59" d="M81,74c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S82.105,74,81,74z M15,59c-2.209,0-4,1.791-4,4 s1.791,4,4,4s4-1.791,4-4S17.209,59,15,59z"></path>
    <path fill="#cd4054" d="M25,85c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S26.105,85,25,85z"></path>
    <path fill="#fff" d="M18.5,49c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5S19.881,49,18.5,49z M79.5,32c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5S80.328,32,79.5,32z"></path>
    <path fill="#78a0cf" d="M36.224,48.245v20.633h-8.163C26.367,68.878,25,67.694,25,66V39.47L36.224,48.245z"></path>
    <path fill="#c4211f" d="M36.224,34v14.245L25,39.47v-2.735c0-1.306,0.449-2.51,1.194-3.459 c1.848-2.401,5.477-2.883,7.878-0.959L36.224,34z"></path>
    <polygon fill="#eb4235" points="63.775,34 63.775,48.235 50,59 36.224,48.245 36.224,34 50,44.755"></polygon>
    <path fill="#f1bc19" d="M75,36.735v2.735l-11.224,8.765V34l2.153-1.684c1.031-0.806,2.245-1.194,3.459-1.194 C72.408,31.094,75.035,33.659,75,36.735z"></path>
    <path fill="#9ca74c" d="M75,39.47v26.347c0,1.694-1.367,3.061-3.061,3.061h-8.163V48.235L75,39.47z"></path>
    <line x1="28.061" x2="28.061" y1="63.776" y2="65.816" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <line x1="28.061" x2="28.061" y1="57.653" y2="60.714" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <line x1="28.061" x2="28.061" y1="47.449" y2="54.534" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <path fill="none" stroke="#472b29" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.4" d="M36.224,34.236v34.641 h-8.163c-1.691,0-3.061-1.371-3.061-3.061V36.735c0-3.1,2.513-5.612,5.612-5.612"></path>
    <path fill="none" stroke="#472b29" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.4" d="M73.81,33.28 c-1.908-2.442-5.435-2.876-7.878-0.967L50,44.76l0,0L34.067,32.312c-2.442-1.908-5.969-1.475-7.878,0.967"></path>
    <line x1="51.412" x2="56.052" y1="54.002" y2="50.331" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <line x1="45.648" x2="49.26" y1="51.676" y2="54.534" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <line x1="41.651" x2="44.047" y1="48.513" y2="50.409" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <line x1="39.017" x2="40.05" y1="46.429" y2="47.247" fill="none" stroke="#472b29" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"></line>
    <polyline fill="none" stroke="#472b29" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.4" points="25.163,39.6 50,59.004 50,59.004 74.819,39.614"></polyline>
    <path fill="none" stroke="#472b29" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.4" d="M69.387,31.123 c3.1,0,5.612,2.513,5.612,5.612v29.081c0,1.691-1.371,3.061-3.061,3.061h-8.163v-34.71"></path>
  </svg>
);

export default ResizableIcon;

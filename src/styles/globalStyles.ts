import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '@/assets/css/font.css';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
 }
 #root, html, body {
   height: 100%;
   font-family: 'Noto Sans KR', sans-serif;
 }
 h1 {
   font-weight: 700;
 }
 a {
  text-decoration: none;
 }
 input {
   background: none;
 }
 button, svg, input, select, label {
    cursor: pointer;
 }
`;

export default GlobalStyles;

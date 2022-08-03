import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
 }
 #root, html, body {
   height: 100%;
 }
 h1 {
   font-weight: 700;
 }
 a {
  text-decoration: none;
 }
 button, svg, input, select, label {
  cursor: pointer;
 }
`;

export default GlobalStyles;

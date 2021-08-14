import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNav = styled.nav`
position: sticky;
position: -webkit-sticky;
z-index:10;
top:0;
padding: 0.5em;
border: none;
background: #fff;
`;


export const StyledLink = styled(Link)`
color:#1f1f1f;
text-decoration: none;
display:block;
font-size: 2em;
margin-top: auto;
margin-bottom: 1em;
font-weight: 100;
:hover
{
    cursor: pointer;
    text-decoration: none;
    opacity:1;
}
.active{
  text-decoration: none;
  opacity:1;
}
}
@media (max-width: 991px) {
  margin-bottom: 3em!important;
}
`;
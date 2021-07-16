import styled from "styled-components";
import THEME from "../theme/Theme";

const style = (Component) => styled(Component)`
  
  .container {
   
    width: 100%;
    height: calc(100vh - 100px);   
    overflow-y: scroll;    
    display: grid;
    scroll-snap-type: y mandatory;
    grid-gap: 2px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
    grid-template-areas:
    "preview"
    "map" 
    "section"
    "stages"
    "time"   
    "debug";

    .child {      
      height: calc(100vh - 100px);
      scroll-snap-align: center;         
      width: 100%;    
      position: relative; 
    }
    
    .map-container {
      grid-area: map;     
    }
    
    .preview-container {
      grid-area: preview;
    }
    
    .time-table-container {
      grid-area: time;
    }
    
    .profile-container {
      grid-area: race-profile;     
      display: none;
      
    }
    
    .debug-container {
      grid-area: debug;    
    }
    
    .stage-container {
      grid-area: stages;
    }
    
    .current-section-container {
      grid-area: section;
    }

    .b {
      display: none;
    }
    .a {
      display: flex;
    }

    @media screen and (min-width: ${THEME.breakpoints[0]}) {
      height: 100%;

      .child {
        height: 100%;
      }

      .profile-container {
        grid-area: race-profile;
        display: flex;
      }
      
      .current-section-container {
        .a {
          display: none;
        }
        .b {
          display: flex;
        }
      }
    

      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(6, minmax(100px, auto));
      grid-template-areas:
       "preview preview preview preview stage stage time time"
       "map map map map map map time time"
       "map map map map map map section section"
       "map map map map map map section section"
       "map map map map map map debug debug"
       "race-profile race-profile race-profile race-profile race-profile race-profile debug debug"

    }
    }
   } 

`;

export default style;

import styled from "styled-components";
import THEME from "../theme/Theme";

const style = (Component) => styled(Component)`
  
  .container {
    // max-height: 100vh;
    width: 100%;
   
    overflow-y: scroll;    

    display: grid;
    scroll-snap-type: y mandatory;
    grid-gap: 2px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, minmax(50px, auto));
    grid-template-areas:
    "informations"
    "map"   
    "time"
    "section"
    "progression";

    .child {
      height: 100vh;
      scroll-snap-align: center;
      padding: 10px;
     // border: 1px solid white;     
      width: 100%;    
      position: relative;      
    }
    
    .map-container {
      grid-area: map;
     
    }
    
    .informations-container {
      grid-area: informations;
    }
    
    .time-table-container {
      grid-area: time;
    }
    
    .profile-container {
      grid-area: race-profile;
      display: none;
      
    }
    
    .progress-container {
      grid-area: progression;
    }
    
    .current-section-container {
      grid-area: section
    }

    .b {
      display: none;
    }
    .a {
      display: flex;
    }

    .analytics {
      color: #aaabad;
      width: 100%;
      height: 100%;     
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

      .item {
        background-color: #2a2d32;
        display: grid;
        justify-content: center;
        align-content: center;
        border-radius: 8px;
        position: relative;
      }

      .distance {
        font-size: 4em;
      }

      .sections {
        font-size: 1.4em;

        svg {
          opacity: 0.1;
          margin-bottom: 0.4em;
        }
      }

      .countdown {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1em;

        svg {
          margin-left: 0.4em;
          color: #f4a301;
          opacity: 0.6;
        }
      }

      .duration {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1em;

        svg {
          margin-right: 0.4em;
        }
      }

      .elevation {
        padding: 1em;
        display: flex;
        //justify-content: space-around;
        align-items: center;
        svg {
          margin-right: 1em;
        }

        span {
          background-color: #ffffffaa;
          width: 100%;
          height: 1px;
        }
        .values {
          display: flex;

          height: 100%;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 1.6em;
        }
      }
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
       "informations informations informations informations . .time time"
       "map map map map map map time time"
       "map map map map map map section section"
       "map map map map map map section section"
       "map map map map map map progression progression"
       "race-profile race-profile race-profile race-profile race-profile race-profile progression progression"

    }
    }
   } 

`;

export default style;

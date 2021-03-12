import styled from "styled-components";
//import Section from "../sections/section/Section";

const style = (Component) => styled(Component)`
  position: absolute; 
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};  
  display: flex;
 
  color: var(--color-text);  
  
  .section-container{
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;   
    justify-content: center;
    align-items: flex-end;
    position: relative;
  }

  .section {
    position: absolute;
    height: 200px;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    overflow: auto;
    flex: none;
    flex-flow: row nowrap;
    scroll-snap-type: x mandatory;

    // ${Section} {
    //   scroll-snap-align: center;
    //   width: 100%;
    // }
  }

  .profile {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .analytic {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    margin-bottom: auto;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .data {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-start;    
      justify-content: flex-start;
      flex: 1 ;
      position: relative;
      

      .index {  
        position: absolute;
        top:0;
        bottom: 0;
        font-size: 14rem;       
        opacity: 0.1;
        letter-spacing: -0.142em;
        right: 0;
        padding-right: 3rem;
        line-height: 1;
        font-weight: 900;
      }

      .stats {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;       
        font-size: 1rem;        

        .title {
          font-weight: lighter;
        }
        .item {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: row;         
          align-items: center;

          svg {
            margin-right: 0.4em;         
            opacity: 0.6;
          }
          
        }
      }
    }

    .row {
      display: flex;
      margin: 8px;
    }
  }
`;

export default style;

import React, {useState} from 'react'

import '../../styles/wait_overlay.scss';

const OverlayContext = React.createContext();

const Overlay = ({children}) => {
  const [overlay, setOverlay] = useState(false);
  const [textoOverlay, setTextoOverlay] = useState('Aguarde ...');

  const exibirOverlay = (msg) => {
    setTextoOverlay(msg);
    setOverlay(true);
  };

  const esconderOverlay = () => {
    setOverlay(false);
  };

  return (
    <>
      {overlay ? (
        <div className="overlay">
          <div className="spinner-border mr-5" role="status"/>
          <h3>{textoOverlay}</h3>
        </div>
      ) : null}
      <OverlayContext.Provider value={{exibirOverlay, esconderOverlay}}>
        <OverlayContext.Consumer>
          {context => children(context)}
        </OverlayContext.Consumer>
      </OverlayContext.Provider>
    </>
  );
};

export default Overlay;
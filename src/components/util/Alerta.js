import React, {useState, useContext} from 'react'

export const AlertaContext = React.createContext();

export const ContextoAlerta = ({children}) => {
  const [mostraAlerta, setMostraAlerta] = useState(false);
  const [textoAlerta, setTextoAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('success');

  return (
    <AlertaContext.Provider value={{setMostraAlerta, setTextoAlerta, setTipoAlerta, mostraAlerta, textoAlerta, tipoAlerta}}>
      <AlertaContext.Consumer>
        {context => children(context)}
      </AlertaContext.Consumer>
    </AlertaContext.Provider>
  );
};

export const Alerta = () => {
  const {mostraAlerta, textoAlerta, tipoAlerta, setMostraAlerta} = useContext(AlertaContext);

  return (
    <>
    {mostraAlerta ? (
      <div className={'alert alert-' + tipoAlerta + ' alert-dismissible'} role="alert">
        {textoAlerta}
        <button type="button" onClick={() => setMostraAlerta(false)} className="btn-close" aria-label="Close"></button>
      </div>
    ) : null}
    </>
  );
};
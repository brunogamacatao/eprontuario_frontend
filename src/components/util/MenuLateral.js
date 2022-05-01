const slug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export default function TituloMenuLateral({texto, children}) {
  return (
    <li className="mb-1">
      <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target={'#' + slug(texto)} aria-expanded="false">
        {texto}
      </button>
      <div className="collapse" id={slug(texto)}>
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {children}
        </ul>
      </div>
    </li>
  );
};
import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3804.9218599464666!2d101.71368030543022!3d17.511243156079534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDMwJzM4LjgiTiAxMDHCsDQyJzUyLjMiRQ!5e0!3m2!1sth!2sth!4v1705821366868!5m2!1sth!2sth"
        width="600"
        height="450"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap;
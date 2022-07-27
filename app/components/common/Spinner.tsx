import type { FC } from 'react';

const Spinner: FC = () => {
    return <div className="d-flex justify-content-center" style={{ marginTop: "20%" }}><div className="spinner-border" role="status"><span className="sr-only"></span></div></div>
};

export default Spinner;

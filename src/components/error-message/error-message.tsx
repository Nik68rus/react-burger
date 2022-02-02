import React, {FC} from 'react';

interface IErrorMEssage {
  message: string;
}

const ErrorMessage: FC<IErrorMEssage> = ({message}) => {
  return (
    <section className="container">
      <p className="text text_type_main-default mt-5">
        {message}
      </p>
    </section>
  );
}

export default ErrorMessage;

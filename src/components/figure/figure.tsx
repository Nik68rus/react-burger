import React, {FC} from 'react';

interface IFigure {
  label: string;
  value: number;
}

const Figure: FC<IFigure> = ({label, value}) => {
  return (
    <article className="mb-15">
      <h3 className="text text_type_main-medium mb-6">{label}</h3>
      <p className="text text_type_digits-large">{value && value.toLocaleString('ru-RU')}</p>
    </article>
  );
}

export default Figure;

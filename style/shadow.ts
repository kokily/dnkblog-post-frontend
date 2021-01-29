import { css } from 'styled-components';

const shadow = (weight: number) => {
  const shadows = [
    css`
      box-shadow: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);
    `,
    css`
      box-shadow: 0 3px 6px rgba(255, 255, 255, 0.16), 0 3px 6px rgba(255, 255, 255, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(255, 255, 255, 0.19),
        0 6px 6px rgba(255, 255, 255, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
        0 10px 10px rgba(255, 255, 255, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(255, 255, 255, 0.3),
        0 15px 12px rgba(255, 255, 255, 0.22);
    `,
  ];

  return shadows[weight];
};

export default shadow;

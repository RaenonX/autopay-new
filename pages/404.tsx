import React from 'react';

import {CustomErrorPage} from '../src/pages/error/main';


const Custom404 = () => {
  return <CustomErrorPage statusCode={404} title="找不到頁面"/>;
};


export default Custom404;

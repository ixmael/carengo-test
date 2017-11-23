import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'infinite-scroll';

import 'infinite-scroll/styles';

const nodeMount = document.getElementById('infinite-scroll');
const feedApi = nodeMount.getAttribute('data-api');

ReactDOM.render(
    <InfiniteScroll feedApi={feedApi}></InfiniteScroll>,
    nodeMount
);
